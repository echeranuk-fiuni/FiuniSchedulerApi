const pool = require("../pool");

const FIELDS = 'id, first_name, last_name, username, role';

const getAllUsers = async () => {
    const results = await pool.query(`SELECT ${FIELDS} FROM users ORDER BY id ASC`);
    return results.rows;
};

const getUser = async id => {
    const results = await pool.query({
        text: `SELECT ${FIELDS} FROM users WHERE id=$1 ORDER BY id ASC`,
        values: [id],
    });
    if (results.rowCount === 0) {
        throw new Error('Usuario inexistente');
    }
    return results.rows[0];
};

const getUserByCredentials = async (username, password) => {
    const results = await pool.query({
        text: `SELECT ${FIELDS} FROM users WHERE username=$1 AND password=$2`,
        values: [username, password],
    });
    if (results.rowCount === 0) {
        return undefined;
    }
    return results.rows[0];
};

const createUser = async user => {
    const results = await pool.query({
        text: 'INSERT INTO users(first_name, last_name, username, password, role) VALUES($1, $2, $3, $4, $5) RETURNING *',
        values: [user.firstName, user.lastName, user.username, user.password, user.role],
    });
    if (results.rowCount === 0) {
        throw new Error('No se pudo guardar usuario');
    }
    return results.rows[0];
};

const updateUser = async (id, user) => {
    const results = await pool.query({
        text: 'UPDATE users SET first_name = $1, last_name = $2, username = $3, role = $4 WHERE id = $5 RETURNING *',
        values: [user.firstName, user.lastName, user.username, user.role, id],
    });
    if (results.rowCount === 0) {
        throw new Error('No se pudo guardar usuario');
    }
    return results.rows[0];
};

const deleteUser = async id => {
    const results = await pool.query({
        text: 'DELETE FROM users WHERE id=$1',
        values: [id],
    });
    if (results.rowCount === 0) {
        throw new Error('No se pudo eliminar usuario');
    }
    return true;
};

module.exports = {
    getAllUsers,
    getUser,
    getUserByCredentials,
    createUser,
    updateUser,
    deleteUser,
};