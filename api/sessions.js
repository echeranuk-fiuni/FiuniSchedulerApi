const { getUserByCredentials } = require('../db/queries/users');
const { generateToken, getBearerToken, invalidateToken } = require('../utils/tokens');

const login = {
    route: '/sessions/',
    callback: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await getUserByCredentials(username, password);
            if (user) {
                const token = generateToken(user);
                res.status(200).json({token});
            } else {
                res.status(401).json({message: 'Autenticacion invalida'});
            }
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const logout = {
    route: '/sessions/',
    callback: (req, res) => {
        const token = getBearerToken(req);
        if (token) {
            invalidateToken(token);
            res.status(200).json({});
        } else {
            res.status(500).json({message: 'No se pudo cerrar sesion'});
        }
    },
};

module.exports = {
    login,
    logout,
};