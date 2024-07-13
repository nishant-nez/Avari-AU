const express = require("express");
const validateVendor = require("../middlewares/validateVendor");
const validateAdmin = require('../middlewares/validateAdmin');
const validateVendorOrAdmin = require("../middlewares/validateAdminOrVendor");
const { getProducts, getProduct, getProductsByCategory, addProduct, updateProduct, updateProductImage, deleteProduct } = require("../controllers/productController");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });


router.get("/all", getProducts);
router.get("/:id", getProduct);
router.get("/category/:id", getProductsByCategory);
router.post("/add", upload.single('image'), validateVendorOrAdmin, addProduct);
router.put("/update/:id", validateVendorOrAdmin, updateProduct);
router.put("/update/image/:id", upload.single('image'), validateVendorOrAdmin, updateProductImage);
router.delete("/delete/:id", validateVendorOrAdmin, deleteProduct);


module.exports = router;