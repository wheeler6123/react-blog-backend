const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

// set up express
const app = express();

// set up cors
app.use(cors());

// set up express to handle json
app.use(express.json());

// set up mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err.message));

// set up schema
const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    author: String,
    content: String
});

// set up model
const Post = mongoose.model('Post', postSchema);

// set up controller

// get all posts
app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

// get one post
app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.send(post);
});

// create post
app.post('/posts', async (req, res) => {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.send(savedPost);
});

// delete post
app.delete('/posts/:id', async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.send(post);
});

// start server
app.listen(3000, () => console.log('Server started'));