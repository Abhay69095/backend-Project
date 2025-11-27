const express = require('express');
const router = express.Router();
const { authenticate, permit } = require('../middleware/auth');
const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 */
router.get('/profile', authenticate, authController.profile);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users (admin only)
 */
router.get('/admin/users', authenticate, permit('admin'), async (req, res, next) => {
  try {
    const User = require('../models/User');
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
