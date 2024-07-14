const jwt = require('jsonwebtoken');


//@desc Get Auth Status
//@route GET /api/auth/status
//@access public
const authStatus = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: 'You are not authorized!' });
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (!decoded) {
                return res.status(403).json({ message: "User not authorized!" });
            }
            res.status(200).json({ user: decoded.user });
        } catch (error) {
            console.error('Error validating token:', error);
            res.status(401).json({ message: "Invalid or expired token!" });
        }
    }
};

//@desc Logout
//@route POST /api/auth/logout
//@access public
const logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return res.status(200).json({ message: 'Logged out successfully!' });
}


module.exports = { authStatus, logout };