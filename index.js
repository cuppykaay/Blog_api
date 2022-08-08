const express = require("express");

const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv").config()

const userRouter = require("./routes/user")
const postRouter = require("./routes/post")
const commentRouter = require("./routes/comment")


mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
) 
    .then(()=>console.log("DB Connection Successfull"))
    .catch((err) => {
    console.log(err);
    process.exit();
});

app.use(express.json());
app.use("/api/auth", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/comments", commentRouter)

app.listen(3000, () => {
    console.log("listening on port 3000");
})