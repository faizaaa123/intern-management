const authoriseIntern = (req, res, next) => {
    const data = req.user
    if(data.user.role !== "Intern") {
        return res.status(403).json({ error: 'Action forbidden' });
    }

    next()
}

module.exports = authoriseIntern