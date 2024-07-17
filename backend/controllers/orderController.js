const pool = require('../config/db');
const queries = require('../config/queries');


const handleServerError = (res, error, message) => {
    console.error(message, error);
    res.status(500).json({ message: "Internal server error" });
};


//@desc Get All Orders 
//@route GET /api/order/all
//@access private
const getOrders = (req, res) => {
    try {
        pool.query(queries.getOrders, (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting orders!');
            res.status(200).json(results.rows);
        });
    } catch (error) {
        console.error('Error getting vendors:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Get Order by ID 
//@route GET /api/order/:id
//@access private
const getOrder = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        pool.query(queries.getOrderById, [id], (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting order!');
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            } else res.status(404).json({ message: "Order not found!" });
        });
    } catch (error) {
        console.error('Error getting order:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Update Order Status
//@route PUT /api/order/update/:id
//@access private
const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: "Order ID is required!" });
        }
        pool.query(queries.getOrderById, [id], async (error, results) => {
            if (error) return handleServerError(res, error, 'Error fetching order!');
            if (!results.rows.length) {
                return res.status(400).json({ message: "Order not found!" });
            } else {
                pool.query(queries.updateOrderStatus, [status, id], (error, results) => {
                    if (error) {
                        console.error('Error updating order status:', error);
                        return res.status(500).json({ message: "Internal server error" });
                    }
                    return res.status(201).json({ message: "Order status updated successfully!" });
                });

            }
        });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { getOrders, getOrder, updateOrderStatus };