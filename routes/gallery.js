const express = require('express');
const router = express.Router({ strict: true });

// Controller modules
const gallery_controller = require('../controllers/gallery_controller');

// Routes
router.get('/', gallery_controller.gallery_index);
router.get('/:id', gallery_controller.gallery_show);

module.exports = router;
