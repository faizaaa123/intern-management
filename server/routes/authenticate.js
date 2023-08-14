const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config()

//creating middleware that varifies a user based on their token
const authenticate = async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(" ")[1];
    if(token == null) return res.sendStatus(401)
    // res.status(200).send(token)

    const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;


    const decodedToken = jwt.verify(token, public_key, {algorithms: ['RS256']})

    const {email} = decodedToken;
    req.user = email;
    next()
}

module.exports = authenticate