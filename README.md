# University of Alberta Course API

I will release a public API url when I complete the schedule builder I am working on currently

The API is accessable through a discord bot. Currently it is not public but here is some more information about it. 

**UofA Course Helper Bot Commands:**

**Terms** available: `Summer`, `Fall`, `Winter`

## **Commands**

• `!course`: Fetches information on a specific course. Type `!course <TERM> <DEPARTMENT> <COURSEID>` to get the course information.

• `!departments`: Lists all departments offering courses in the given term. `!departments <TERM>` to get the departments

• `!help`: Shows this message

• `!offered`: Gets all courses offered in that term in that department. Type `!offered <TERM> <DEPARTMENT>` to get the courses offered

## **How it was made**

I scraped the University of Alberta's public calendar on every faculty and every course offered in that faculty. 
I then cleaned the data ( removed empty data in terms of courses having no lectures ), sorted the data into respective terms ( Summer, Fall, Winter ) and lastly wrote it all to my mongoDB Atlas collection. 
After creating the express server I added some endpoints ( see above commands or see server.js ) that you can call via the API hosted on Heroku. 
At this point I created a simple discord bot that calls each of the end points making post requests in several functions allowing for an easy way to get information via discord channels with friends. 


## **Discord Bot Example**

![courseBot](https://github.com/user-attachments/assets/8694f2d3-1b1f-4a93-8b80-666a3054554a)
