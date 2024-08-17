require('dotenv').config();

const express = require('express');
const cors = require('cors'); 
const app = express();
const mongoose = require('mongoose');

const Product = require('./models/product.model');
const User = require('./models/user.model');
const Course = require('./models/course.model');

app.use(cors()); 

app.use(express.json());

const documentation = `
University of Alberta Schedule API Documentation

Welcome to the University of Alberta Schedule API. This API provides access to course schedules for various terms, departments, and specific courses. Below is an overview of the available endpoints and how to use them:

1. Retrieve All Courses for a Specific Term
   - **Endpoint:** /fall, /winter, /summer, /spring
   - **Description:** Use these endpoints to retrieve all courses offered during the specified term.
   - **Example Request:** GET /fall
   - **Response:** A JSON object containing all courses offered in the specified term.

2. Retrieve All Courses for a Specific Department in a Specific Term
   - **Endpoint:** /fall/:department, /winter/:department, /summer/:department, /spring/:department
   - **Description:** Use these endpoints to retrieve all courses offered by a specific department during the specified term.
   - **Path Parameters:**
     - :department: The department code (e.g., cmput, math, engg).
   - **Example Request:** GET /fall/cmput
   - **Response:** A JSON object containing all courses offered by the specified department in the specified term.

3. Retrieve a Specific Course from a Specific Department in a Specific Term
   - **Endpoint:** /fall/:department/:courseNumber, /winter/:department/:courseNumber, /summer/:department/:courseNumber, /spring/:department/:courseNumber
   - **Description:** Use these endpoints to retrieve detailed information about a specific course offered by a department during the specified term.
   - **Path Parameters:**
     - :department: The department code (e.g., cmput, math, engg).
     - :courseNumber: The course number (e.g., 101, 324, 499).
   - **Example Request:** GET /fall/cmput/101
   - **Response:** A JSON object containing detailed information about the specified course, including section codes, capacities, class times, and descriptions.

Usage Tips:
- Ensure that you replace :department and :courseNumber with the appropriate values when making requests.
- The response format is JSON, providing easy integration with other applications and systems.

This documentation provides an overview of how to interact with the API. Each endpoint is designed to give you access to the course schedules at different levels of specificity, from an entire term down to a specific course in a specific department.
`;

app.get('/', (req, res) => {
    res.send(documentation);
});

app.get('/course/:term/', async (req, res) => {
    try {
        const termInfo = await Course.findOne({ term: req.params.term });
        if (!termInfo) {
            return res.status(404).send({ message: 'termInfo not found' });
        }

        res.status(200).send(termInfo);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.get('/course/:term/:department', async (req, res) => {
    try {
        // get the specific term
        const queriedTerm = await Course.findOne({ term: req.params.term });
        if (!queriedTerm) {
            return res.status(404).send({ message: 'Term not found' });
        }

        // specific department within the term's departments
        const departmentInfo = queriedTerm.department.get(req.params.department);
        if (!departmentInfo) {
            return res.status(404).send({ message: 'Department not found' });
        }

        // department information as a response
        res.status(200).send(departmentInfo);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

app.get('/course/:term/:department/:courseNumber', async (req, res) => {
    try {
        // get term query 
        const queriedTerm = await Course.findOne({ term: req.params.term });
        if (!queriedTerm) {
            return res.status(404).send({ message: 'Term not found' });
        }

        // specific department within the term's departments
        const departmentInfo = queriedTerm.department.get(req.params.department);
        if (!departmentInfo) {
            return res.status(404).send({ message: 'Department not found' });
        }

        // specific course within the department
        const courseInfo = departmentInfo[req.params.courseNumber];
        if (!courseInfo) {
            return res.status(404).send({ message: 'Course not found' });
        }

        // course information as a response
        res.status(200).send(courseInfo);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

app.post('/schedule', async (req, res) => {
    const receivedArray = req.body;
    console.log("Array is:" , receivedArray);

    // call schedule maker function here ( TODO )
    res.json({ message: 'Array received successfully', receivedArray });
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
