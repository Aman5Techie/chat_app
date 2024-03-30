const bs = require("bcryptjs");
const salt = bs.genSalt(10);

module.exports = salt;
