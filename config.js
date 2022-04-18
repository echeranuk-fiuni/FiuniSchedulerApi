module.exports = {
    debugTokens: process.env.DEBUG_TOKENS === 'true',
    noAuthMode: process.env.NO_AUTH_MODE === 'true',
    secretAuthKey: process.env.SECRET_AUTH_KEY,
};