const jwt = require("jsonwebtoken");

// Verify autorisation
module.exports.authVerification = (req, res, next) => {
    try {
        const token = req.headers.accesstoken;
        if (!token) {
            return res.status(400).json({ msg: "Token not found, login first" });
        }

        const decoded = jwt.verify(token, process.env.AccessToken);
        req.userId = decoded._id
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ msg: "Token is not valid, authorization denied" });
    }
};