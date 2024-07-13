const express = require('express');
const validateAdmin = require('../middlewares/validateAdmin');
const { getCategories, getCategory, addCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

router.get("/all", getCategories);
router.get("/:id", getCategory);
router.post("/add", addCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);


module.exports = router;