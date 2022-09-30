const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1];
        if (!token) return res.status(403).send("Access denied.");
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};


const isAdmin = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1];
        if (!token) return res.status(403).send("Access denied.");
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        if (req.user.role == 'admin') next()
        else res.status(401).send("Only admin allowed to process this");
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

const isOwner = (ticket, req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1];
        if (!token) return res.status(403).send("Access denied.");
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        if (req.user.id==ticket.createdby || req.user.id==ticket.assignee || req.user.role=='admin') next()
        else res.status(401).send("Only ticket owner, assignee or admin allowed to process this");
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

module.exports = { isAuthenticated, isAdmin, isOwner }