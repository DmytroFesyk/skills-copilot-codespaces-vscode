// Create web server
// Create a new comment
// Get all comments
// Get a comment
// Update a comment
// Delete a comment

const express = require('express');
const { comments } = require('../data/comments');
const { v4: uuidv4 } = require('uuid');

// Create web server
const commentsRouter = express.Router();

// Get all comments
commentsRouter.get('/', (req, res) => {
  res.json(comments);
});

// Get a comment
commentsRouter.get('/:commentId', (req, res) => {
  const commentId = req.params.commentId;
  const comment = comments.find((comment) => comment._id === commentId);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  res.json(comment);
});

// Create a new comment
commentsRouter.post('/', (req, res) => {
  const newComment = {
    _id: uuidv4(),
    ...req.body,
  };
  comments.push(newComment);
  res.json(newComment);
});

// Update a comment
commentsRouter.put('/:commentId', (req, res) => {
  const commentId = req.params.commentId;
  const comment = comments.find((comment) => comment._id === commentId);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  const updatedComment = { ...comment, ...req.body };
  comments = comments.map((comment) =>
    comment._id === commentId ? updatedComment : comment
  );
  res.json(updatedComment);
});

// Delete a comment
commentsRouter.delete('/:commentId', (req, res) => {
  const commentId = req.params.commentId;
  const comment = comments.find((comment) => comment._id === commentId);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  comments = comments.filter((comment) => comment._id !== commentId);
  res.json({ message: 'Comment deleted' });
});

module.exports = commentsRouter;