require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Product = require('./models/product.model');
const User = require('./models/user.model');
const Course = require('./models/course.model');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('University of Alberta Schedule API Documentation\nYou can send requests to /fall /winter /summer /spring to get all courses offered for each term\nYou can also send requests to /fall/department /winter/department /summer/department /spring/department to get all courses offered for each department in each term\nYou can also send requests to /fall/department/courseNumber /winter/department/courseNumber /summer/department/courseNumber /spring/department/courseNumber to get all courses offered for each course in each department in each term');
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


        //  specific department within the term's departments
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
