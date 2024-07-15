const express = require('express');
const validateAdmin = require('../middlewares/validateAdmin');
const { getMinimumOrder, updateMinOrder } = require('../controllers/defaultController');
const router = express.Router();

router.get("/minorder", getMinimumOrder);
router.put("/minorder/update", validateAdmin, updateMinOrder);


module.exports = router;