const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    term: String, // e.g., 'summer', 'winter'
    department: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    }
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
