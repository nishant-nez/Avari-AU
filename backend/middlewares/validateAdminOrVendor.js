const jwt = require('jsonwebtoken');


const validateVendorOrAdmin = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Access token is missing!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(403).json({ message: "User not authorized!" });

        const valid = decoded.user.role === 'admin' || decoded.user.role === 'vendor';
        if (!valid) return res.status(403).json({ message: "User not authorized!" });

        req.user = decoded.user;
        next();
    } catch (error) {
        console.error('Error validating token:', error);
        res.status(401).json({ message: "Invalid or expired token!" });
    }
};

module.exports = validateVendorOrAdmin;
