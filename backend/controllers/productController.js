const pool = require("../config/db");
const queries = require("../config/queries");
const multer = require("multer");

const upload = multer({ dest: 'public/images/products' });

const handleServerError = (res, error, message) => {
    console.error(message, error);
    res.status(500).json({ message: "Internal server error" });
};


//@desc Get All Products 
//@route GET /api/product/all
//@access private
const getProducts = (req, res) => {
    try {
        pool.query(queries.getProducts, (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting products!');
            res.status(200).json(results.rows);
        });
    } catch (error) {
        console.error('Error getting products:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Get Product by ID 
//@route GET /api/product/:id
//@access private
const getProduct = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        pool.query(queries.getProductById, [id], (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting product!');
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            } else res.status(404).json({ message: "Product not found!" });
        });
    } catch (error) {
        console.error('Error getting product:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Get Product by Category ID 
//@route GET /api/product/category/:id
//@access private
const getProductsByCategory = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        pool.query(queries.getProductsByCategory, [id], (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting products!');
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            } else res.status(404).json({ message: "Product not found!" });
        });
    } catch (error) {
        console.error('Error getting product:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Get Product by Category ID 
//@route GET /api/product/vendor/:id
//@access private
const getProductsByVendor = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        pool.query(queries.getProductsByVendor, [id], (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting products!');
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            } else res.status(404).json({ message: "Product not found!" });
        });
    } catch (error) {
        console.error('Error getting product:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Add Product 
//@route POST /api/product/add
//@access private
const addProduct = async (req, res) => {
    // return res.status(200).json({ body: req.body, file: req.file })
    const { name, category_id, price, description, unit, vendor_id } = req.body;
    if (!name || !category_id || !price || !description || !unit || !vendor_id) {
        return res.status(400).json({ message: "Please fill mandatory all fields!" });
    }
    if (!req.file) {
        return res.status(400).json({ message: "Please fill mandatory all fields!" });
    }
    const imagePath = 'images/products/' + req.file.filename;

    try {
        pool.query(queries.addProduct, [name, category_id, price, unit, imagePath, description, vendor_id], (error, results) => {
            if (error) return handleServerError(res, error, 'Error adding product!');
            res.status(201).json({ message: "Product added successfully!" });
        });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Update Product Details
//@route PUT /api/product/update/:id
//@access private
const updateProduct = async (req, res) => {
    const { name, category_id, price, description, unit, vendor_id } = req.body;
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: "Product ID is required!" });
        }
        pool.query(queries.getProductById, [id], async (error, results) => {
            if (error) return handleServerError(res, error, 'Error updating product!');
            if (!results.rows.length) {
                return res.status(400).json({ message: "Product not found!" });
            } else {
                pool.query(queries.updateProduct, [name, category_id, price, unit, description, vendor_id, id], (error, results) => {
                    if (error) {
                        console.error('Error querying product by ID:', error);
                        return res.status(500).json({ message: "Internal server error" });
                    }
                    return res.status(201).json({ message: "Product updated successfully!" });
                });

            }
        });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//@desc Update Product Image
//@route PUT /api/product/update/image/:id
//@access private
const updateProductImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Please provide an image!" });
    }
    const imagePath = 'images/products/' + req.file.filename;
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: "Product ID is required!" });
        }
        pool.query(queries.getProductById, [id], async (error, results) => {
            if (error) return handleServerError(res, error, 'Error updating product image!');
            if (!results.rows.length) {
                return res.status(400).json({ message: "Product not found!" });
            } else {
                pool.query(queries.updateProductImage, [imagePath, id], (error, results) => {
                    if (error) return handleServerError(res, error, 'Error updating product image!');
                    return res.status(201).json({ message: "Product image updated successfully!" });
                });

            }
        });
    } catch (error) {
        console.error('Error updating product image:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//@desc Delete Product
//@route DELETE /api/product/delete/:id
//@access private
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Product ID is required!" });
    }

    try {
        const result = await pool.query(queries.deleteProduct, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { getProducts, getProduct, getProductsByCategory, getProductsByVendor, addProduct, updateProduct, updateProductImage, deleteProduct };