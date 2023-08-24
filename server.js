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

