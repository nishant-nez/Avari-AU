const pool = require("../config/db");
const queries = require("../config/queries");


const handleServerError = (res, error, message) => {
    console.error(message, error);
    res.status(500).json({ message: "Internal server error" });
};


//@desc Get All Categories 
//@route GET /api/category/all
//@access public
const getCategories = (req, res) => {
    try {
        pool.query(queries.getCategories, (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting categories!');
            res.status(200).json(results.rows);
        });
    } catch (error) {
        console.error('Error getting categories:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Get Category by ID 
//@route GET /api/category/:id
//@access public
const getCategory = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        pool.query(queries.getCategoryById, [id], (error, results) => {
            if (error) return handleServerError(res, error, 'Error getting category!');
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            } else res.status(404).json({ message: "Category not found!" });
        });
    } catch (error) {
        console.error('Error getting category:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Add Category
//@route POST /api/category/add
//@access private
const addCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ message: "Please provide category name!" });
    }

    try {
        pool.query(queries.addCategory, [name], (error, results) => {
            if (error) return handleServerError(res, error, 'Error adding category!');
            return res.status(201).json({ message: "category added successfully!" });
        });
    } catch (error) {
        console.error('Error adding category!', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//@desc Update Category
//@route PUT /api/category/update/:1
//@access private
const updateCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: "Category ID is required!" });
        }
        pool.query(queries.getCategoryById, [id], async (error, results) => {
            if (error) return handleServerError(res, error, 'Error updating category!');
            if (!results.rows.length) {
                return res.status(400).json({ message: "Category not found!" });
            } else {
                pool.query(queries.updateCategory, [name, id], (error, results) => {
                    if (error) return handleServerError(res, error, 'Error updating category!');
                    return res.status(201).json({ message: "Category updated successfully!" });
                });
            }
        });
    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//@desc Delete Category
//@route DELETE /api/category/delete/:1
//@access private
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Category ID is required!" });
    }

    try {
        const result = await pool.query(queries.deleteCategory, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Category not found!" });
        }

        res.status(200).json({ message: "Category deleted successfully!" });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { getCategories, getCategory, addCategory, updateCategory, deleteCategory };