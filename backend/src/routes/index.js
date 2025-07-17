const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');

// File upload route
router.post('/upload', upload.array('media', 10), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    const mediaUrls = req.files.map((file) => file.path);
    res.status(200).json({ mediaUrls });
  } catch (error) {
    next(error);
  }
});

// Health check
router.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

module.exports = router;