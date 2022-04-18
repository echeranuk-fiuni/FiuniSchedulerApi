const { isString } = require("lodash");
const moment = require("moment");

const userValidatorMiddleware = (req, res, next) => {
    const { firstName, lastName, username, password, role } = req.body;
    if (!firstName || !isString(firstName) || firstName.length > 30) {
        res.status(400).json({message: 'Nombre invalido'});
    } else if (!lastName || !isString(lastName) || lastName.length > 30) {
        res.status(400).json({message: 'Apellido invalido'});
    } else if (!username || !isString(username) || username.length > 30) {
        res.status(400).json({message: 'Nombre de usuario invalido'});
    } else if (password && (!isString(password) || password.length > 30)) {
        res.status(400).json({message: 'Password invalido'});
    } else if (!role || !isString(role) || !['ADMIN', 'CUSTOMER'].includes(role)) {
        res.status(400).json({message: 'Rol invalido'});
    } else {
        next();
    }
};

const entryValidatorMiddleware = (req, res, next) => {
    const { title, description, datetime, type, status } = req.body;
    if (!title || !isString(title) || title.length > 50) {
        res.status(400).json({message: 'Titulo invalido'});
    } else if (!description || !isString(description)) {
        res.status(400).json({message: 'Descripcion invalida'});
    } else if (!datetime || !isString(datetime) || !moment(datetime, 'YYYY-MM-DD HH:mm:ss.sss', true).isValid()) {
        res.status(400).json({message: 'Fecha y hora invalida'});
    } else if (!type || !isString(type) || !['TASK', 'REMINDER', 'ACTIVITY'].includes(type)) {
        res.status(400).json({message: 'Tipo de entrada invalido'});
    } else if (!status || !isString(status) || !['IN_PROGRESS', 'DONE'].includes(status)) {
        res.status(400).json({message: 'Estatus invalido'});
    } else {
        next();
    }
};

module.exports = {
    userValidatorMiddleware,
    entryValidatorMiddleware,
};