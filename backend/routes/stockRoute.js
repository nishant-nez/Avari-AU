const express = require('express');
const validateAdmin = require('../middlewares/validateAdmin');
const validateAdminOrVendor = require('../middlewares/validateAdminOrVendor');
const { getStocks, getStockById, getStockByProductId, addStock, updateStockByProductId } = require('../controllers/stocksController');

const router = express.Router();

router.get("/all", getStocks);
router.get("/:id", getStockById);
router.get("/product/:id", getStockByProductId);
router.post("/add", addStock);
router.put("/update/:id", updateStockByProductId);


module.exports = router;