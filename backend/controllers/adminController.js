const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const queries = require("../config/queries");


const handleServerError = (res, error, message) => {
    console.error(message, error);
    res.status(500).json({ message: "Internal server error" });
};


//@desc Get All Admins 
//@route GET /api/admin/all
//@access private
const getAdmins = (req, res) => {
    try {
        pool.query(queries.getAdmins, (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting admins!');
            res.status(200).json(results.rows);
        });
    } catch (error) {
        console.error('Error getting admins!', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Get Admin by ID 
//@route GET /api/admin/:id
//@access private
const getAdmin = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        pool.query(queries.getAdminById, [id], (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting admin!');
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            } else res.status(404).json({ message: "Admin not found!" });
        });
    } catch (error) {
        console.error('Error getting admin:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Register 
//@route POST /api/admin/register
//@access private
const registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        res.status(400).json({ message: "Please fill in all mandatory fields!" });
    }

    try {
        pool.query(queries.checkAdminEmailExists, [email], async (error, results) => {
            if (error) return handleServerError(res, error, 'Error registering admin!');
            if (results.rows.length) {
                return res.status(400).json({ message: "Admin with provided email already exists!" });
            } else {
                //Hashing the password
                const hashedPassword = await bcrypt.hash(password, 10);
                pool.query(queries.addAdmin, [username, email, hashedPassword], (error, results) => {
                    if (error) return handleServerError(res, error, 'Error registering admin!');
                    return res.status(201).json({ message: "Admin registered successfully!" });
                });
            }
        });
    } catch (error) {
        console.error('Error registering admin:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//@desc Login 
//@route POST /api/admin/login
//@access public
const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Please provide username and password!" });
    }

    try {
        const { rows } = await pool.query(queries.checkAdminUsernameExists, [username]);
        if (!rows.length) return res.status(400).json({ message: "Invalid username or password!" });

        const admin = rows[0];
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password!" });
        }

        // Create JWT payload
        const payload = {
            user: {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                role: 'admin'
            }
        };

        // Sign the token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '15d' },
            (err, token) => {
                if (err) throw err;
                // Send token in cookie
                res.cookie('token', token, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000 });
                res.status(200).json({ message: "Login successful!" });
            }
        );
    } catch (error) {
        console.error('Error logging in admin:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//@desc Update 
//@route PUT /api/admin/update/:id
//@access private
const updateAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: "Admin ID is required!" });
        }
        pool.query(queries.getAdminById, [id], async (error, results) => {
            if (error) return handleServerError(res, error, 'Error updating admin!');
            if (!results.rows.length) {
                return res.status(400).json({ message: "Admin not found!" });
            } else {
                if (password) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    pool.query(queries.updateAdmin, [username, email, hashedPassword, id], (error, results) => {
                        if (error) return handleServerError(res, error, 'Error updating admin!');
                        return res.status(201).json({ message: "Admin updated successfully!" });
                    });
                } else {
                    pool.query(queries.updateAdmin, [username, email, password, id], (error, results) => {
                        if (error) return handleServerError(res, error, 'Error updating admin!');
                        return res.status(201).json({ message: "Admin updated successfully!" });
                    });
                }
            }
        });
    } catch (error) {
        console.error('Error updating admin:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { getAdmins, getAdmin, registerAdmin, loginAdmin, updateAdmin };