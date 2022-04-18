const getHome = {
    route: '/',
    callback: (req, res) => {
        res.status(200).json({ info: 'Node.js, Express, and Postgres API' });
    },
};

module.exports = {
    getHome,
};