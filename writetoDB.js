const fs = require('fs');
const mongoose = require('mongoose');
const Course = require('./models/course.model'); // Adjust the path as needed

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        importCourses();
    })
    .catch(err => console.error('Error connecting to MongoDB', err));

function importCourses() {
    
    // 
    const filename = 'cleaned_data.json';

    fs.readFile(filename, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const jsonData = JSON.parse(data);

        // iterate over each of the faculties in the master doc 
        for (const department in jsonData) {
            if (jsonData.hasOwnProperty(department)) {
                
                const course = new Course({
                    department: department,      // e.g., 'cmput', 'abrod'
                    details: jsonData[department] // Store the nested structure
                });

                try {
                    const savedCourse = await course.save();
                    console.log(`Course data for ${department} saved successfully:`, savedCourse);
                } catch (saveErr) {
                    console.error(`Error saving course data for ${department}:`, saveErr);
                }
            }
        }

        mongoose.connection.close(); // Ensure the connection is closed
    });
}
