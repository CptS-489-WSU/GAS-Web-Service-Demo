/* doGetPost -- This function handles both GET and POST requests for the CptS 489 Speedgolf Course Webservices API Example.
   It assumes that both GET and POST requests pass all data in query params. In practice, POST request can also pass data
   in a body, but for now we will not consider that possibility. The API process three types of requests:
   
   1. (GET) Given a course name, city, state, and country, attempt to add the course to the database. Return a a JSON object
   of the following form {name: <course name>, id: <unique course id>. courseAdded: boolean}
   
   2. (GET) Given a course id, retrieve all of the data associated with the course as a JSON object with the following fields
      (only fields for which non-empty data exists are included: Name, City, State, Country, NumHoles, TotalStrPar, TotalTimePar,
      TotalGolfDist, TotalRunDist, 1: {StrPar, TimePar,RunDist,GolfDist}...
      
   3. (POST) Given a course id and the data for a particular hole (1 through numHoles), update the course with the hole data.
*/

function doGetPost(e) {
  var courseObj, returnObj;
  console.log("in doGetPost with parameters = " + JSON.stringify(e.parameter));
  if (e.parameter.name && e.parameter.city && e.parameter.state && e.parameter.country && e.parameter.numHoles) {
    //Process GET request to add new course
    courseObj = {id: "", name: e.parameter.name, city: e.parameter.city, state: e.parameter.state,
                 country: e.parameter.country, numHoles: e.parameter.numHoles};
    returnObj = {id: "", name: e.parameter.name, courseAdded: true};
    if (!courseExists(courseObj)) {
      courseObj.id = returnObj.id = generateCourseId(courseObj); //generate unique ID
      addCourse(courseObj); //add course to DB
    } else {
      returnObj.courseAdded = false;
    }
    if (e.parameter.callback) { //need to return using callback
       return ContentService.createTextOutput(e.parameter.callback + '(' + JSON.stringify(returnObj) + ')')
            .setMimeType(ContentService.MimeType.JAVASCRIPT);
    } else { //dont' return using callback
        return ContentService.createTextOutput(JSON.stringify(courseObj))
            .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }  
  }  
  if (e.parameter.id) { //Request to retrieve data associated with course
    returnObj = getCourseData(e.parameter.id);
    if (e.parameter.callback) { //need to return using callback
      return ContentService.createTextOutput(e.parameter.callback + 
              '(' + JSON.stringify(returnObj) + ')')
           .setMimeType(ContentService.MimeType.JAVASCRIPT);
     } else { //dont' return using callback
       return ContentService.createTextOutput(JSON.stringify(courseObj))
           .setMimeType(ContentService.MimeType.JAVASCRIPT);
     }  
  }

  }                               
}


//doGet -- forward GET requests to doGetPost (see above)
function doGet(e) {
  return doGetPost(e);
}

//doPost -- forward POST requests to doGetPost (see above)
function doPost(e) {
  return doGetPost(e);
}
