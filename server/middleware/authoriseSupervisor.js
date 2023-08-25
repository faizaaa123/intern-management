const authoriseSupervisor = (req, res, next) => {
    const data = req.user
    if(data.user.role !== "Supervisor") {
        return res.status(403).json({ error: 'Action forbidden' });
    }

    next()
}

module.exports = authoriseSupervisor