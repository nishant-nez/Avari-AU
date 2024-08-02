const pool = require("../config/db");
const queries = require("../config/queries");


const handleServerError = (res, error, message) => {
    console.error(message, error);
    res.status(500).json({ message: "Internal server error" });
};

//@desc Get All Stocks 
//@route GET /api/stock/all
//@access public
const getStocks = (req, res) => {
    try {
        pool.query(queries.getStocks, (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting stocks!');
            res.status(200).json(results.rows);
        });
    } catch (error) {
        console.error('Error getting products:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Get Stock by ID 
//@route GET /api/stock/:id
//@access private
const getStockById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        pool.query(queries.getStockById, [id], (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting stock!');
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            } else res.status(404).json({ message: "Stock not found!" });
        });
    } catch (error) {
        console.error('Error getting product:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Get Stock by Product ID 
//@route GET /api/stock/product/:id
//@access public
const getStockByProductId = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        pool.query(queries.getStockByProductId, [id], (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting stock!');
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            } else res.status(404).json({ message: "Stock not found!" });
        });
    } catch (error) {
        console.error('Error getting product:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Add Stock 
//@route POST /api/stock/add
//@access private
const addStock = async (req, res) => {
    const { product_id, quantity } = req.body;
    if (!product_id && !quantity) {
        res.status(400).json({ message: "Please provide all required fields!" });
    }

    try {
        pool.query(queries.addStock, [product_id, quantity], (error, results) => {
            if (error) return handleServerError(res, error, 'Error adding stock!');
            return res.status(201).json({ message: "Stock added successfully!" });
        });
    } catch (error) {
        console.error('Error adding stock!', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@Desc Update Stock by Product ID
//@route PUT /api/stock/update/:id
//@access private
const updateStockByProductId = async (req, res) => {
    const { quantity } = req.body;
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: "Product ID is required!" });
        }
        pool.query(queries.getStockByProductId, [id], async (error, results) => {
            if (error) return handleServerError(res, error, 'Error updating stock!');
            if (!results.rows.length) {
                return res.status(400).json({ message: "Product not found!" });
            } else {
                pool.query(queries.updateStock, [quantity, id], (error, results) => {
                    if (error) {
                        console.error('Error updating stock by product ID:', error);
                        return res.status(500).json({ message: "Internal server error" });
                    }
                    return res.status(201).json({ message: "Stock updated successfully!" });
                });

            }
        });
    } catch (error) {
        console.error('Error updating stock:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { getStocks, getStockById, getStockByProductId, addStock, updateStockByProductId };