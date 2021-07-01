const express = require('express');
const router = express.Router();

// Controller modules
const uploads_controller = require('../controllers/uploads_controller')

// Routes
router.get('/', uploads_controller.upload_get)
router.post('/', uploads_controller.upload_post)

module.exports = router;
