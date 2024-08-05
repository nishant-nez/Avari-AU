const express = require('express');
const validateAdmin = require('../middlewares/validateAdmin');
const { getMinimumOrder, updateMinOrder, getDeliveryFee, updateDeliveryFee } = require('../controllers/defaultController');
const router = express.Router();

router.get("/minorder", getMinimumOrder);
router.put("/minorder/update", validateAdmin, updateMinOrder);
router.get("/deliveryfee", getDeliveryFee);
router.put("/deliveryfee/update", validateAdmin, updateDeliveryFee);


module.exports = router;