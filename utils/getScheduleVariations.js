const getCourseData = require('./getDataForEachCourse.js');

async function scheduleCombinator(term, courses) {
    try {
        let courseData = await getCourseData(term, courses);  
        let scheduleVariations = [];
        
        courseData.forEach(course => {
        
        
        })
        
        return scheduleVariations;
    } catch (error) {
        console.error("Error in scheduleCombinator:", error);
    }
}

let term = 'fall';
let courses = ['cmput 174'];

scheduleCombinator(term, courses).then(scheduleVariations => {
    console.log("Schedule Variations:", scheduleVariations);
});
