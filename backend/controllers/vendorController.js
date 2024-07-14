const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const queries = require("../config/queries");


const handleServerError = (res, error, message) => {
    console.error(message, error);
    res.status(500).json({ message: "Internal server error" });
};


//@desc Get All Vendors 
//@route GET /api/vendor/all
//@access private
const getVendors = (req, res) => {
    try {
        pool.query(queries.getVendors, (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting vendors!');
            res.status(200).json(results.rows);
        });
    } catch (error) {
        console.error('Error getting vendors:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Get Vendor by ID 
//@route GET /api/vendor/:id
//@access private
const getVendor = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        pool.query(queries.getVendorById, [id], (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting vendor!');
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            } else res.status(404).json({ message: "Vendor not found!" });
        });
    } catch (error) {
        console.error('Error getting vendor:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Register Vendor
//@route POST /api/vendor/register
//@access private
const registerVendor = async (req, res) => {
    const { name, email, password, location, state, country, latitude, longitude, phone } = req.body;
    if (!name || !password || !email || !location || !state || !country || !phone) {
        res.status(400).json({ message: "Please fill in all mandatory fields!" });
    }

    try {
        pool.query(queries.checkVendorEmailExists, [email], async (error, results) => {
            if (error) return handleServerError(res, error, 'Error registering vendor!');
            if (results.rows.length) {
                return res.status(400).json({ message: "Vendor with provided email already exists!" });
            } else {
                //Hashing the password
                const hashedPassword = await bcrypt.hash(password, 10);
                pool.query(queries.addVendor, [name, email, hashedPassword, location, state, country, latitude, longitude, phone], (error, results) => {
                    if (error) return handleServerError(res, error, 'Error registering vendor!');
                    return res.status(201).json({ message: "Vendor registered successfully!" });
                });
            }
        });
    } catch (error) {
        console.error('Error registering vendor:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//@desc Login Vendor
//@route POST /api/vendor/login
//@access public
const loginVendor = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password!" });
    }

    try {
        const { rows } = await pool.query(queries.checkVendorEmailExists, [email]);
        if (!rows.length) return res.status(400).json({ message: "Invalid email or password!" });

        const vendor = rows[0];
        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        // Create JWT payload
        const payload = {
            user: {
                id: vendor.id,
                email: vendor.email,
                role: 'vendor'
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
                res.status(200).json({ message: "Login successful!", user: payload.user });
            }
        );
    } catch (error) {
        console.error('Error logging in vendor:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//@desc Update Vendor
//@route PUT /api/vendor/update/:1
//@access private
const updateVendor = async (req, res) => {
    const { name, email, password, location, state, country, latitude, longitude, phone } = req.body;
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: "Vendor ID is required!" });
        }
        pool.query(queries.getVendorById, [id], async (error, results) => {
            if (error) return handleServerError(res, error, 'Error updating vendor!');
            if (!results.rows.length) {
                return res.status(400).json({ message: "Vendor not found!" });
            } else {
                if (password) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    pool.query(queries.updateVendor, [name, email, hashedPassword, location, state, country, latitude, longitude, phone, id], (error, results) => {
                        if (error) return handleServerError(res, error, 'Error updating vendor!');
                        return res.status(201).json({ message: "Vendor updated successfully!" });
                    });
                } else {
                    pool.query(queries.updateVendor, [name, email, password, location, state, country, latitude, longitude, phone, id], (error, results) => {
                        if (error) return handleServerError(res, error, 'Error updating vendor!');
                        return res.status(201).json({ message: "Vendor updated successfully!" });
                    });
                }
            }
        });
    } catch (error) {
        console.error('Error updating vendor:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//@desc Delete Vendor
//@route DELETE /api/vendor/delete/:1
//@access private
const deleteVendor = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Vendor ID is required!" });
    }

    try {
        const result = await pool.query(queries.deleteVendor, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Vendor not found!" });
        }

        res.status(200).json({ message: "Vendor deleted successfully!" });
    } catch (error) {
        console.error('Error deleting vendor:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// //@desc Current User Info
// //@route GET /api/users/current
// //@access private
// const currentUser = asyncHandler(async (req, res) => {
//     res.json(req.user);
// });



module.exports = { getVendors, getVendor, registerVendor, loginVendor, updateVendor, deleteVendor };