const shortid = require('shortid');
const db = require('../db');

module.exports = (req, res, next) => {
    if(!req.signedCookies.sessionId) {
        var sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            // expires: new Date(Date.now() + 900000),
            maxAge: 600000,
            signed: true
        });
        
        db.get('session').push({ id: sessionId }).write();
    }
    
    let session = db.get('session').value().length;
    db.get('session').splice(0, session-1).write();

    next();
}