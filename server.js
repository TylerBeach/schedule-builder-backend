require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Import the Product, User, and Course models
const Product = require('./models/product.model');
const User = require('./models/user.model');
const Course = require('./models/course.model'); // Import the Course model

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/course/:department', async (req, res) => {
    try {
        // Find the course by department
        const course = await Course.findOne({ department: req.params.department });
        if (!course) {
            return res.status(404).send({ message: 'Course not found' });
        }
        res.status(200).send(course); // No need to use JSON.stringify, Express handles it
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.get('/course/:department/:course', async (req, res) => {
    try {
        // Find the course by department
        const course = await Course.findOne({ department: req.params.department });
        if (!course) {
            return res.status(404).send({ message: 'Department not found' });
        }

        // Check if the course exists within the department
        const courseDetails = course.details[req.params.course];
        if (!courseDetails) {
            return res.status(404).send({ message: 'Course not found' });
        }

        res.status(200).send(courseDetails); // Express handles JSON conversion
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server started");
});

const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => { 
        console.log("Error connecting to database");
        console.log(err);
    });
