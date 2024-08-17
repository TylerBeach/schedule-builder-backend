export default function scheduleCombinator( term, courses ) {
    // MONGO_URI=mongodb+srv://tylerallenbeach:secret123@schedule-builder.q4azy.mongodb.net/schedule-builder?retryWrites=true&w=majority&appName=schedule-builder
    let courses = ['cmput 101']
    const mongodb = require('mongodb');
    const MongoClient = mongodb.MongoClient;

    const uri = process.env.MONGO_URI;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        const collection = client.db("schedule-builder").collection("courses");
        // get the course data from the database
        // for each course, get the course data from the database


        const courseData = courses.map(course => {
            collection.findOne({ term: course.term }, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            });
        });

        console.log(courseData);

       
       
       
       
       
       
       
       
        client.close();
    });


}