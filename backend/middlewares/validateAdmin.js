const jwt = require('jsonwebtoken');

const validateAdmin = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Access token is missing!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || decoded.user.role !== 'admin') {
            return res.status(403).json({ message: "User not authorized as admin!" });
        }

        req.user = decoded.user;
        next();
    } catch (error) {
        console.error('Error validating token:', error);
        res.status(401).json({ message: "Invalid or expired token!" });
    }
};

module.exports = validateAdmin;
