const jwt = require("jsonwebtoken");

// Verify autorisation
module.exports.authVerification = (req, res, next) => {
    const token = req.headers.accesstoken;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, process.env.AccessToken, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Unauthorized: Token expired' });
            }
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        
        // Check if the user ID from the token matches the requested user ID in params or body
        if (!req.params.id && req.params.id !== user.userId) {
            return res.status(403).json({ error: 'Forbidden: Access denied' });
        }

        // user is authenticated and authorized, proceed with the request
        req.user = user;
        next();
    });
};