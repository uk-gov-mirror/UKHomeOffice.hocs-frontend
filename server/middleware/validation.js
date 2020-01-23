const { FormSubmissionError, ValidationError } = require('../models/error');
const { DOCUMENT_WHITELIST, DOCUMENT_BULK_LIMIT } = require('../config').forContext('server');

const validationErrors = {
    required: label => `${label} is required`,
    alphanumeric: label => `${label} must be alphanumeric`,
    currency: label => `${label} must be currency amount`,
    numeric: label => `${label} must be numeric`,
    hasWhitelistedExtension: (value, extension) => {
        return `${value} is a ${extension.toUpperCase()} file which is not allowed`;
    },
    fileLimit: () => `The number of files you have tried to upload exceeded the limit of ${DOCUMENT_BULK_LIMIT}`,
    isValidDate: label => `${label} must be a date`,
    isBeforeToday: label => `${label} must be a date in the past`,
    isAfterToday: label => `${label} must be a date in the future`,
    validCaseReference: () => 'Case reference is not valid'
};

const validators = {
    isValidDate: ({ label, value, message }) => {
        if (value) {
            const date = new Date(value).getDate();
            if (isNaN(date) || date != value.split('-')[2]) {
                return message || validationErrors.isValidDate(label);
            }
        }
        return null;
    },
    isBeforeToday({ label, value, message }) {
        if (new Date(value).valueOf() >= new Date(Date.now()).valueOf()) {
            return message || validationErrors.isBeforeToday(label);
        }
        return null;
    },
    isAfterToday({ label, value, message }) {
        if (new Date(value).valueOf() <= new Date(Date.now()).valueOf()) {
            return message || validationErrors.isAfterToday(label);
        }
        return null;
    },
    required: ({ label, value, message }) => {
        if (!value || value === '') {
            return message || validationErrors.required(label);
        }
        return null;
    },

    alphanumeric: ({ label, value, message }) => {
        const format = /^[a-z0-9]+$/i;
        if (value && !format.test(value)) {
            return message || validationErrors.alphanumeric(label);
        }
        return null;
    },
    currency: ({ label, value, message }) => {
        const format = /^\d+(\.\d{2})?$/;
        if (value && !format.test(value)) {
            return message || validationErrors.currency(label);
        }
        return null;
    },
    numeric: ({ label, value, message }) => {
        const format = /^[0-9]+$/i;
        if (value && !format.test(value)) {
            return message || validationErrors.numeric(label);
        }
        return null;
    },

    hasWhitelistedExtension: ({ value, message }) => {
        if (value && value.length > 0) {
            const allowableExtensions = DOCUMENT_WHITELIST.map(extension => extension.toUpperCase());
            for (let file of value) {
                let fileExtension = file.originalname.split('.').slice(-1)[0];
                let fileName = file.originalname.split('.').slice(0)[0];

                if (!allowableExtensions.includes(fileExtension.toUpperCase())) {
                    return message || validationErrors.hasWhitelistedExtension(fileName, fileExtension);
                }
            }
        }
        return null;
    },
    fileLimit: ({ value, message }) => {
        if (value && value.length > DOCUMENT_BULK_LIMIT) {
            return message || validationErrors.fileLimit();
        }
        return null;
    },
    isValidCaseReference: ({ value, message }) => {
        const format = /\b[a-zA-Z]{2,4}\/[0-9]{7}\/[0-9]{2}\b/i;
        if (value && !format.test(value)) {
            return message || validationErrors.validCaseReference();
        }
        return null;
    }
};

function validationMiddleware(req, res, next) {
    if (req.form) {
        try {
            const { data, schema } = req.form;
            const validationErrors = schema.fields
                .filter(field => field.type !== 'display')
                .reduce((result, field) => {
                    validateField(field, data, result);
                    return result;
                }, {});
            if (Object.keys(validationErrors).length > 0) {
                return next(new ValidationError('Form validation failed', validationErrors));
            }
        } catch (e) {
            return next(new FormSubmissionError('Unable to validate form data'));
        }
    }
    next();

    function validateField(field, data, result) {
        const { component, validation, props: { name, label, sections, items } } = field;

        if (component === 'expandable-checkbox') {
            Array.isArray(items) && items.map(item => validateField(item, data, result));
        }

        if (component === 'accordion') {
            Array.isArray(sections) && sections.map(({ items }) => Array.isArray(items) && items.map(item => validateField(item, data, result)));
        } else {
            const value = data[name];
            if (validation) {
                validation.map(validator => {
                    if (typeof validator === 'string') {
                        if (validators.hasOwnProperty(validator)) {
                            const validationError = validators[validator].call(this, { label, value });
                            if (validationError) {
                                result[field.props.name] = validationError;
                            }
                        }
                        else {
                            throw new Error(`Validator ${validator} does not exist`);
                        }
                    }
                    else {
                        const { type, message } = validator;
                        if (validators.hasOwnProperty(type)) {
                            const validationError = validators[type].call(this, { label, value, message });
                            if (validationError) {
                                result[field.props.name] = validationError;
                            }
                        }
                        else {
                            throw new Error(`Validator ${type} does not exist`);
                        }
                    }
                });
            }
        }
    }
}

module.exports = {
    validationMiddleware,
    validators
};