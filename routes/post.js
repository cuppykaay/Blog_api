const express = require("express")
const Post = require("../models/post");

const router = require("express").Router();

router.post("/post", (req, res) => {
    const post = new Post({
     title: req.body.title,
     text: req.body.text
     });
     post.save(function(err) {
      if(err) {console.log(err)}
        res.send(post)
     })
    });

    
    router.get('/post/:id', (req, res) => {
        Post.findById(req.params.id)
            .populate('comments')
            .exec(function(err, results) {
          if(err) {console.log(err)}
            res.send({ post: 
         results, comments: results.comments})
          })
        })


    router.get('/', (req, res) => {
        Post.find({})
           .exec(function(err, results) {
            if(err) {console.log(err)}

            res.send({title: 'All Posts', posts: results})
         })
     });

router.patch("/patch/:id", async(req, res) =>{
  Post.findByIdAndUpdate(req.params.id, req.body)
  .exec(function(err, results) {
    if(err) {console.log(err)}
    res.send({ title: "Updated Post", post: results})
  })
});

router.delete("/delete/:id", async(req, res) => {
  Post.findByIdAndDelete(req.params.id)
  .exec(function(err, results) {
    if(err) {console.log(err)};
    res.json({ message: "Post Deleted"})
  })
})


module.exports = router