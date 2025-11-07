const express = require('express');
const { param, query } = require('express-validator');
const userController = require('../controllers/userController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const userParamValidation = [
  param('id').isString().withMessage('User ID must be a string'),
];

const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
];

// Routes
router.get('/', optionalAuth, paginationValidation, userController.getUsers);
router.get('/:id', optionalAuth, userParamValidation, userController.getUser);
router.get('/:id/posts', optionalAuth, userParamValidation, paginationValidation, userController.getUserPosts);
router.post('/:id/follow', authenticateToken, userParamValidation, userController.toggleFollow);

module.exports = router;
