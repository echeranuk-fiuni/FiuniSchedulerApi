const humps = require('humps');
const { getAllEntries, getEntry: getDBEntry, createEntry: createDBEntry, updateEntry: updateDBEntry, deleteEntry: deleteDBEntry } = require("../db/queries/entries");
const { getCurrentUserId } = require("../utils/tokens");

const listEntries = {
    route: '/entries/',
    callback: async (req, res) => {
        try {
            const entries = await getAllEntries(getCurrentUserId(req));
            res.status(200).json(humps.camelizeKeys(entries));
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const getEntry = {
    route: '/entries/:id/',
    callback: async (req, res) => {
        try {
            const entry = await getDBEntry(getCurrentUserId(req), req.params.id);
            res.status(200).json(humps.camelizeKeys(entry));
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const createEntry = {
    route: '/entries/',
    callback: async (req, res) => {
        const { title, description, datetime, type, status } = req.body;
        const inputEntry = { title, description, datetime, type, status };
        try {
            const entry = await createDBEntry(getCurrentUserId(req), inputEntry);
            res.status(200).json(humps.camelizeKeys(entry));
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const updateEntry = {
    route: '/entries/:id/',
    callback: async (req, res) => {
        const { title, description, datetime, type, status } = req.body;
        const inputEntry = { title, description, datetime, type, status };
        try {
            const entry = await updateDBEntry(getCurrentUserId(req), req.params.id, inputEntry);
            res.status(200).json(humps.camelizeKeys(entry));
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

const deleteEntry = {
    route: '/entries/:id/',
    callback: async (req, res) => {
        try {
            await deleteDBEntry(getCurrentUserId(req), req.params.id);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};

module.exports = {
    listEntries,
    getEntry,
    createEntry,
    updateEntry,
    deleteEntry,
};