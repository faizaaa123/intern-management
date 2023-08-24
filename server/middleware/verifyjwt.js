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

const verifyAccessToken = (req, res, next) => {
    const accessToken = req.header("Authorization");
    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized: Access token is missing' });
    }

    try {
        const secret_key = process.env.SECRET_KEY;
        const decoded = jwt.verify(accessToken, secret_key)
        req.user = decoded
        console.log(req.user)
        next()
    } catch (error) {
        return res.status(403).json({ error: 'Forbidden: Invalid access token' });
    }


}

module.exports = verifyAccessToken