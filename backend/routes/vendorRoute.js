const express = require("express");
const validateVendor = require("../middlewares/validateVendor");
const validateAdmin = require('../middlewares/validateAdmin');
const validateVendorOrAdmin = require("../middlewares/validateAdminOrVendor")
const { getVendors, getVendor, registerVendor, loginVendor, updateVendor, deleteVendor } = require("../controllers/vendorController");

const router = express.Router();

router.get("/all", validateVendorOrAdmin, getVendors);
router.get("/:id", validateVendorOrAdmin, getVendor);
router.post("/register", validateAdmin, registerVendor);
router.post("/login", loginVendor);
router.put("/update/:id", validateVendorOrAdmin, updateVendor);
router.delete("/delete/:id", validateAdmin, deleteVendor);


module.exports = router;