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
  var courseObj;
  if (e.parameter.name && e.parameter.city && e.parameter.state && e.parameter.country) {
    //Process GET request to add new course
    courseObj = {id: "", name: e.parameter.name, city: e.parameter.city, state: e.parameter.state,
                 country: e.parameter.country};
    if (!courseExists(courseObj)) {
      courseObj.id = generateCourseId(courseObj); //generate unique ID
      addCourse(courseObj); //add course to DB
      if (e.parameter.callback) { //need to return using callback
         return ContentService.createTextOutput(e.parameter.callback + '(' + JSON.stringify(courseObj) + ')')
            .setMimeType(ContentService.MimeType.JAVASCRIPT);
      } else { //dont' return using callback
        return ContentService.createTextOutput(JSON.stringify(courseObj))
            .setMimeType(ContentService.MimeType.JAVASCRIPT);

      }
    }
  }  
  //If here, it's not a GET request to add a new course. Test for other types of requests.                                 
}


//doGet -- forward GET requests to doGetPost (see above)
function doGet(e) {
  return doGetPost(e);
}

//doPost -- forward POST requests to doGetPost (see above)
function doPost(e) {
  return doGetPost(e);
}
