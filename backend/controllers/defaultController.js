const pool = require("../config/db");
const queries = require("../config/queries");


const handleServerError = (res, error, message) => {
    console.error(message, error);
    res.status(500).json({ message: "Internal server error" });
};


//@desc Get Minimum Order
//@route GET /api/default/minorder
//@access public
const getMinimumOrder = (req, res) => {
    try {
        pool.query(queries.getMinimumOrder, (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting minimum order!');
            res.status(200).json(results.rows[0]);
        });
    } catch (error) {
        console.error('Error getting minimum order:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Update Minimum Order
//@route PUT /api/default/minorder/update/
//@access private
const updateMinOrder = async (req, res) => {
    const { value } = req.body;
    try {
        pool.query(queries.getMinimumOrder, async (error, results) => {
            if (error) return handleServerError(res, error, 'Error updating minimum order!');
            if (!results.rows.length) {
                return res.status(400).json({ message: "Minimum order not found in database!" });
            } else {
                pool.query(queries.updateMinimumOrder, [value], (error, results) => {
                    if (error) return handleServerError(res, error, 'Error updating minimum order!');
                    return res.status(201).json({ message: "Minimum order updated successfully!" });
                });
            }
        });
    } catch (error) {
        console.error('Error updating minimum order:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//@desc Get Delivery Fee
//@route GET /api/default/deliveryfee
//@access public
const getDeliveryFee = (req, res) => {
    try {
        pool.query(queries.getDeliveryFee, (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting delivery fee!');
            res.status(200).json(results.rows[0]);
        });
    } catch (error) {
        console.error('Error getting delivery fee:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Update Delivery Fee
//@route PUT /api/default/deliveryfee/update/
//@access private
const updateDeliveryFee = async (req, res) => {
    const { value } = req.body;
    try {
        pool.query(queries.getDeliveryFee, async (error, results) => {
            if (error) return handleServerError(res, error, 'Error updating delivery fee!');
            if (!results.rows.length) {
                return res.status(400).json({ message: "Delivery Fee not found in database!" });
            } else {
                pool.query(queries.updateDeliveryFee, [value], (error, results) => {
                    if (error) return handleServerError(res, error, 'Error updating delivery fee!');
                    return res.status(201).json({ message: "Delivery fee updated successfully!" });
                });
            }
        });
    } catch (error) {
        console.error('Error updating delivery feer:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { getMinimumOrder, updateMinOrder, getDeliveryFee, updateDeliveryFee }