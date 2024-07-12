const express = require('express');
const validateAdmin = require('../middlewares/validateAdmin');
const { getAdmins, getAdmin, registerAdmin, loginAdmin, updateAdmin } = require("../controllers/adminController");

const router = express.Router();

router.get("/all", validateAdmin, getAdmins);
router.get("/:id", validateAdmin, getAdmin);
router.post("/register", validateAdmin, registerAdmin);
router.post("/login", loginAdmin);
router.put("/update/:id", validateAdmin, updateAdmin);


module.exports = router;