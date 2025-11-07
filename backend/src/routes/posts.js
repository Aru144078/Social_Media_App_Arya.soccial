const express = require('express');
const { body, query, param } = require('express-validator');
const postController = require('../controllers/postController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Validation rules
const createPostValidation = [
  body('content')
    .isLength({ min: 1, max: 2000 })
    .trim()
    .withMessage('Content is required and must be less than 2000 characters'),
];

const updatePostValidation = [
  body('content')
    .optional()
    .isLength({ min: 1, max: 2000 })
    .trim()
    .withMessage('Content must be less than 2000 characters'),
];

const commentValidation = [
  body('content')
    .isLength({ min: 1, max: 500 })
    .trim()
    .withMessage('Comment content is required and must be less than 500 characters'),
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
router.get('/', optionalAuth, paginationValidation, postController.getPosts);
router.get('/:id', optionalAuth, param('id').isString(), postController.getPost);
router.post('/', authenticateToken, upload.single('image'), createPostValidation, postController.createPost);
router.put('/:id', authenticateToken, param('id').isString(), updatePostValidation, postController.updatePost);
router.delete('/:id', authenticateToken, param('id').isString(), postController.deletePost);

// Like/Unlike
router.post('/:id/like', authenticateToken, param('id').isString(), postController.toggleLike);

// Comments
router.get('/:id/comments', optionalAuth, param('id').isString(), paginationValidation, postController.getComments);
router.post('/:id/comments', authenticateToken, param('id').isString(), commentValidation, postController.createComment);
router.delete('/comments/:commentId', authenticateToken, param('commentId').isString(), postController.deleteComment);

module.exports = router;
