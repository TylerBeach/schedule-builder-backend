const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    department: String, // stores 'cmput' for example
    details: mongoose.Schema.Types.Mixed // stores the details of each faculty
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
