const express = require("express");
const { getVendors, getVendor, registerVendor, loginVendor, updateVendor, deleteVendor } = require("../controllers/vendorController");

const router = express.Router();

router.get("/all", getVendors);
router.get("/:id", getVendor);
router.post("/register", registerVendor);
router.post("/login", loginVendor);
router.put("/update/:id", updateVendor);
router.delete("/delete/:id", deleteVendor);


module.exports = router;