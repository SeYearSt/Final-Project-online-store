const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        //console.log("bearerHeader", bearerHeader);
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

function verifyTokenFunc(req){
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader == 'undefined')
    {
        return [false];
    }
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    ret = []
    jwt.verify(bearerToken, 'secretkey', (err, authData) => {
    if (err) {
            ret.push(false);
            ret.push(err);

        }
    else{
        ret.push(true);
        ret.push(authData);
    }
    });
    return ret;
};

function verifyUser(req, res, next) {
    var auth_res = verifyTokenFunc(req);
    if (auth_res[0]){
        req.verifiedUser = true;
        req.authData = auth_res[1];
    }
    else {
        req.verifiedUser = false;
        req.err = auth_res[1];
    }
    next();
}

module.exports = {
    verifyToken,
    verifyUser
}