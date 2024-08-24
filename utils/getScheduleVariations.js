const getCourseData = require('./getDataForEachCourse.js');

async function scheduleCombinator(term, courses) {
    const daysOfTheWeek = {
        'M': 'Monday',
        'T': 'Tuesday',
        'W': 'Wednesday',
        'R': 'Thursday',
        'F': 'Friday'
    }      
    
    
    try {
        let courseData = await getCourseData(term, courses);  
        let scheduleVariations = [];
        


        const lectures = courseData[0]['Lectures']
        const labs = courseData[0]['Labs']
        const seminars = courseData[0]['Seminars']


        if (lectures && labs && seminars) {
            console.log("WE HAVE ALL THREE")
        } else if (lectures && labs) {
            console.log("WE HAVE LECTURES AND LABS")
            for (const [sectionNum, lectureData] of Object.entries(lectures))
            {

                let lecture_days = lectureData['class_days']
                let lecture_time = lectureData['class_times']
                let lecture_start_time = lecture_time.split('-')[0]
                let lecture_end_time = lecture_time.split('-')[1]

                let convertedLectureDays = []
                for (char of lecture_days) {
                    let day = daysOfTheWeek[char]
                    convertedLectureDays.push(day)
                }


                for (const [labNum, labData] of Object.entries(labs))
                {
                    let lab_days = labData['class_days']
                    let lab_times = labData['class_times']
                    
                    let convertedLabDays = []
                    for (char of lab_days) {
                        let day = daysOfTheWeek[char]
                        convertedLabDays.push(day)
                    }
                    

                    let combination = {
                        'Lecture': lectureData,
                        'Lab': labData
                    }


                    // we need to check if there is a day conflict -> if it is then check the time conflict

                    let dayConflict = convertedLectureDays.some(day => convertedLabDays.includes(day))
                    if (dayConflict) {
                        console.log("DAY CONFLICT")
                        
                    } else {
                        console.log("NO DAY CONFLICT")
                    }


                }
            }
        }
        else if (lectures && seminars) {
            console.log("WE HAVE LECTURES AND SEMINARS")
        }
        else if (labs && seminars) {
            console.log("WE HAVE LABS AND SEMINARS")
        }
        else if (lectures) {
            console.log("WE HAVE LECTURES")
        }
        else if (labs) {
            console.log("WE HAVE LABS")
        }
        else if (seminars) {
            console.log("WE HAVE SEMINARS")
        }


        return scheduleVariations;
    } catch (error) {
        console.error("Error in scheduleCombinator:", error);
    }
}

let term = 'fall';
let courses = ['cmput 101'];

scheduleCombinator(term, courses).then(scheduleVariations => {
    console.log("Schedule Variations:", scheduleVariations);
});


