const pool = require("../pool");

const FIELDS = 'id, user_id, title, description, datetime, type, status';

const getAllEntries = async userId => {
    const results = await pool.query({
        text: `SELECT ${FIELDS} FROM entries WHERE user_id=$1 ORDER BY id ASC`,
        values: [userId],
    });
    return results.rows;
};

const getEntry = async (userId, id) => {
    const results = await pool.query({
        text: `SELECT ${FIELDS} FROM entries WHERE id=$1 AND user_id=$2 ORDER BY id ASC`,
        values: [id, userId],
    });
    if (results.rowCount === 0) {
        throw new Error('Entrada inexistente');
    }
    return results.rows[0];
};

const createEntry = async (userId, entry) => {
    const results = await pool.query({
        text: `INSERT INTO entries(user_id, title, description, datetime, type, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        values: [userId, entry.title, entry.description, entry.datetime, entry.type, entry.status],
    });
    if (results.rowCount === 0) {
        throw new Error('No se pudo guardar entrada');
    }
    return results.rows[0];
};

const updateEntry = async (userId, id, entry) => {
    const results = await pool.query({
        text: 'UPDATE entries SET title=$1, description=$2, datetime=$3, type=$4, status=$5 WHERE id=$6 AND user_id=$7 RETURNING *',
        values: [entry.title, entry.description, entry.datetime, entry.type, entry.status, id, userId],
    });
    if (results.rowCount === 0) {
        throw new Error('No se pudo guardar entrada');
    }
    return results.rows[0];
};

const deleteEntry = async (userId, id) => {
    const results = await pool.query({
        text: 'DELETE FROM entries WHERE id=$1 AND user_id=$2',
        values: [id, userId],
    });
    if (results.rowCount === 0) {
        throw new Error('No se pudo eliminar entrada');
    }
    return true;
};

module.exports = {
    getAllEntries,
    getEntry,
    createEntry,
    updateEntry,
    deleteEntry,
};