const logger = require('../libs/logger');
const forms = require('../forms/index');

const validationErrors = {
    required: 'is required'
};

const validators = {
    required: (value) => {
        if (value !== null && value !== '') {
            return null;
        } else {
            return validationErrors.required;
        }
    }
};

const validation = (req, res, next) => {
        logger.info('VALIDATION MIDDLEWARE');
        const {data, schema} = req.form;
        const fields = schema.fields.filter(field => field.type !== 'display');
        req.form.errors = fields.reduce((result, field) => {
            const {validation, props: {name}} = field;
            const value = data[name];
            if (validation) {
                validation.map(validator => {
                    try {
                        const validationError = validators[validator].call(this, value);
                        if (validationError) {
                            result[field.props.name] = `${field.props.label} ${validationError}`;
                        }
                    } catch(e) {
                        logger.warn(`Unsupported validator passed (${validator}) in form`);
                    }

                });
            }
            return result;
        }, {});
        logger.debug(`Validation errors: ${JSON.stringify(req.form.errors)}`);
        next();
};

module.exports = validation;