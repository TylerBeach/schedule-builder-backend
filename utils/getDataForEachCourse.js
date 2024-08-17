require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') }); 

async function getCourseData(term, courseArray) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let cartData = [];
    for (let course of courseArray) {
        let [department, courseId] = course.split(" ");
        let url = `${apiUrl}/course/${term}/${department}/${courseId}`;
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                cartData.push(data);
            })
            .catch((error) => console.error("Error fetching course data:", error));
    }
    return cartData;
}

module.exports = getCourseData;


// let term = 'fall';
// let courses = ['cmput 101', 'cmput 174'];
// getCourseData(term, courses);
