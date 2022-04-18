const jwt = require('jsonwebtoken');
const config = require('../config');

const _tokens = [];

const _addUserToken = (user, token) => {
    _tokens.push({user, token});
};

const _removeUserToken = user => {
    for (let i = 0; i < _tokens.length; i++) { 
        if (_tokens[i].user.id === user.id) { 
            _tokens.splice(i, 1); 
        }
    }
};

const _getUserByToken = token => {
    return _tokens.find((t) => t.token === token)?.user;
};

const generateToken = user => {
    const token = jwt.sign({check: true}, config.secretAuthKey, {algorithm: 'HS256'});
    _removeUserToken(user);
    _addUserToken(user, token);
    return token;
};

const getBearerToken = req => {
    const authorization = req?.headers?.['authorization'];
    if (authorization) {
        const bearer = authorization.split(' ');
        const bearerToken = bearer.length > 1 ? bearer[1] : undefined;
        return bearerToken;
    }
    return undefined;
};

const invalidateToken = token => {
    for (let i = 0; i < _tokens.length; i++) { 
        if (_tokens[i].token === token) { 
            _tokens.splice(i, 1); 
        }
    }
};

const verifySessionMiddleware = (req, res, next) => {
    if (config.noAuthMode) {
        req.user = {id: 1, role: 'ADMIN'};
        next();
    } else {
        const token = getBearerToken(req);
        const user = _getUserByToken(token);
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(401).json({message: 'Autenticacion invalida'});
        }
    }
};

const getCurrentUserId = req => {
    return req.user?.id;
};

const getCurrentUserRole = req => {
    return req.user?.role;
};

const getCurrentUser = req => {
    return req.user;
};

module.exports = {
    generateToken,
    getBearerToken,
    invalidateToken,
    verifySessionMiddleware,
    getCurrentUserId,
    getCurrentUserRole,
    getCurrentUser,
    currentTokens: _tokens,
};