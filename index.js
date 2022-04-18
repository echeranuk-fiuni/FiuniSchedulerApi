require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { getHome } = require('./api/home');
const { listUsers, getUser, createUser, updateUser, deleteUser } = require('./api/users');
const { listEntries, getEntry, createEntry, updateEntry, deleteEntry } = require('./api/entries');
const { login, logout } = require('./api/sessions');
const { verifySessionMiddleware, currentTokens } = require('./utils/tokens');
const config = require('./config');
const { checkForAdminMiddleware } = require('./utils/permissions');
const { userValidatorMiddleware, entryValidatorMiddleware } = require('./utils/validators');
const app = express();
const port = process.env.PORT;

// Parser config
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// API routes matching
app.get(getHome.route, getHome.callback);
app.get(listUsers.route, verifySessionMiddleware, checkForAdminMiddleware, listUsers.callback);
app.get(getUser.route, verifySessionMiddleware, checkForAdminMiddleware, getUser.callback);
app.post(createUser.route, verifySessionMiddleware, checkForAdminMiddleware, userValidatorMiddleware, createUser.callback);
app.put(updateUser.route, verifySessionMiddleware, checkForAdminMiddleware, userValidatorMiddleware, updateUser.callback);
app.delete(deleteUser.route, verifySessionMiddleware, checkForAdminMiddleware, deleteUser.callback);
app.get(listEntries.route, verifySessionMiddleware, listEntries.callback);
app.get(getEntry.route, verifySessionMiddleware, getEntry.callback);
app.post(createEntry.route, verifySessionMiddleware, entryValidatorMiddleware, createEntry.callback);
app.put(updateEntry.route, verifySessionMiddleware, entryValidatorMiddleware, updateEntry.callback);
app.delete(deleteEntry.route, verifySessionMiddleware, deleteEntry.callback);
app.post(login.route, login.callback);
app.delete(logout.route, verifySessionMiddleware, logout.callback);

// API for tokens test
app.get('/tokens/', (req, res) => {
  if (config.debugTokens) {
    res.status(200).json(currentTokens);
  } else {
    res.status(401).json({});
  }
});

// Listen on port
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});