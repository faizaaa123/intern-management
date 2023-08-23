const jwt = require("jsonwebtoken");


function varifyJwtAccessToken(token) {
    try {
        const secret_key = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secret_key)
        return decoded
    } catch (error) {
        console.log(error)
        return null;
    }
}

module.exports = varifyJwtAccessToken