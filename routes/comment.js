const express = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');

const router = new express.Router();


router.post('/postcomment/:id', async (req, res) => {
     const id = req.params.id;
     const comment = new Comment({
     text: req.body.text,
     post: id
  })
 await comment.save();
 const postRelated = await Post.findById(id);
 postRelated.comments.push(comment);
 await postRelated.save(function(err) {
 if(err) {console.log(err)}
 res.json(postRelated)
 })

})

module.exports = router