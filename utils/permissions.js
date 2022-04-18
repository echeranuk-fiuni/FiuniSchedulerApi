const { getCurrentUserRole } = require("./tokens");

const checkForAdminMiddleware = (req, res, next) => {
    const role = getCurrentUserRole(req);
    if (role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({message: 'Usuario no autorizado'});
    }
};

module.exports = {
    checkForAdminMiddleware,
};