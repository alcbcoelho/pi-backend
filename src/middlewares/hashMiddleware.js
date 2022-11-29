const bcrypt = require("bcrypt");
const config = require("../config/env.json");

module.exports = async (req, res, next) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    
    next();
}