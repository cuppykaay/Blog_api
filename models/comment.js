const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
 text: {
      type: String,
      trim: true,
      required: true
   },
date: {
      type: Date,
      default: Date.now
   },
// each comment can only relates to one blog, so it's not in array
post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
   }
 })

module.exports = mongoose.model('Comment', CommentSchema);  