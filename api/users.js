const { getAllUsers, getUser: getDBUser, createUser: createDBUser, updateUser: updateDBUser, deleteUser: deleteDBUser } = require("../db/queries/users");

const listUsers = {
    route: '/users/',
    callback: async (req, res) => {
        try {
            const users = await getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const getUser = {
    route: '/users/:id/',
    callback: async (req, res) => {
        try {
            const user = await getDBUser(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const createUser = {
    route: '/users/',
    callback: async (req, res) => {
        const { firstName, lastName, username, password, role } = req.body;
        const inputUser = { firstName, lastName, username, password, role };
        try {
            const user = await createDBUser(inputUser);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const updateUser = {
    route: '/users/:id/',
    callback: async (req, res) => {
        const { firstName, lastName, username, role } = req.body;
        const inputUser = { firstName, lastName, username, role };
        try {
            const user = await updateDBUser(req.params.id, inputUser);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const deleteUser = {
    route: '/users/:id/',
    callback: async (req, res) => {
        try {
            await deleteDBUser(req.params.id);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

module.exports = {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};