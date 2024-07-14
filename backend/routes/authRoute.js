const express = require('express');
const { authStatus, logout } = require('../controllers/authStatusController');

const router = express.Router();

router.get("/status", authStatus);
router.post("/logout", logout);


module.exports = router;