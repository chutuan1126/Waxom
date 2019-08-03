const user = require('../models/user.model');
const assert = require('assert');

module.exports.requireAuth = (req, res, next) => {
    if (!req.signedCookies.userId) {
        res.redirect('/auth/signUp');
        return;
    }

    user.findOne({ _id: req.signedCookies.userId }, (err, user) => {
        assert.equal(null, err);
        if (!user) {
            res.redirect('/auth/signUp');
            return;
        }
        else {
            res.locals.user = user;
            next();
        }
    });
}