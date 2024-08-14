const fs = require('fs');
const mongoose = require('mongoose');
const Course = require('./models/course.model');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        importCourses();
    })
    .catch(err => console.error('Error connecting to MongoDB', err));

async function importCourses() {
    const filename = 'reformatted.json';

    try {
        const data = await fs.promises.readFile(filename, 'utf8');
        const jsonData = JSON.parse(data);

        console.log("Parsed JSON data:", jsonData);

        // iterate over each term in the JSON data
        for (const [term, departments] of Object.entries(jsonData)) {

            console.log(`Processing term: ${term}`);

            if (Object.keys(departments).length === 0) {
                console.log(`Skipping empty term: ${term}`);
                continue; 
            }

            //  new Course document for each term
            const course = new Course({
                term: term, // 'spring', 'summer', 'fall', 'winter'
                department: departments 
            });

            try {
                const savedCourse = await course.save();
                console.log(`Course data for ${term} saved successfully.`);
            } catch (saveErr) {
                console.error(`Error saving course data for ${term}:`, saveErr);
            }
        }
    } catch (err) {
        console.error('Error reading file:', err);
    } finally {
        mongoose.connection.close(); 
    }
}
