const express = require('express');
const validateAdmin = require('../middlewares/validateAdmin');
const { getMinimumOrder, updateMinOrder } = require('../controllers/minimumOrderController');
const router = express.Router();

router.get("/", getMinimumOrder);
router.put("/update", validateAdmin, updateMinOrder);


module.exports = router;