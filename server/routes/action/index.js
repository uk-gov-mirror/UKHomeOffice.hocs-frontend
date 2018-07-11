const router = require('express').Router();
const actionService = require('../../services/action');
const fileMiddleware = require('../../middleware/file');
const processMiddleware = require('../../middleware/process');
const validationMiddleware = require('../../middleware/validation');
const renderMiddleware = require('../../middleware/render');

router.post('/:action', fileMiddleware.any(), processMiddleware, validationMiddleware);

router.post('/:action', (req, res, next) => {
    if (Object.keys(req.form.errors).length > 0) {
        return next();
    }
    const { action } = req.params;
    actionService.performAction(action, { form: req.form, user: req.user }, (callbackUrl, err) => {
        if (err) {
            return res.redirect('/error');
        } else {
            if (res.noScript) {
                return res.redirect(callbackUrl);
            }
            return res.status(200).send({ redirect: callbackUrl, response: {} });
        }
    });
});

router.post('/:action', (req, res, next) => {
    if (!res.noScript) {
        return res.status(200).send({ errors: req.form.errors });
    }
    next();
});

router.post('/:action', renderMiddleware);

router.post('/:action', (req, res) => {
    return res.status(200).send(res.rendered);
});

module.exports = router;