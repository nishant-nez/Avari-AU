const express = require("express");
const validateVendor = require("../middlewares/validateVendor");
const validateAdmin = require('../middlewares/validateAdmin');
const validateVendorOrAdmin = require("../middlewares/validateAdminOrVendor");
const { getOrders, getOrder, updateOrderStatus } = require("../controllers/orderController")


const router = express.Router();

router.get("/all", validateVendorOrAdmin, getOrders);
router.get("/:id", validateVendorOrAdmin, getOrder);
router.put("/update/:id", validateVendorOrAdmin, updateOrderStatus);


module.exports = router;