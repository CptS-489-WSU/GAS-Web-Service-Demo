/* doGet -- This function handles GET requests for the CptS 489 Speedgolf Course Webservices API Example.
   
   1. (GET) Given a course name, city, state, and country, attempt to add the course to the database. Return a a JSON object
   of the following form {name: <course name>, id: <unique course id>. courseAdded: boolean}
   
   2. (GET) Given a course id, retrieve all of the data associated with the course as a JSON object with the following fields
      (only fields for which non-empty data exists are included: Name, City, State, Country, NumHoles, TotalStrPar, TotalTimePar,
      TotalGolfDist, TotalRunDist, 1: {StrPar, TimePar,RunDist,GolfDist}...   
*/

function doGet(e) {
  var courseObj, returnObj;
  console.log("in doGetPost with parameters = " + JSON.stringify(e.parameter));
  if (e.parameter.name && e.parameter.city && 
      e.parameter.state && e.parameter.country 
      && e.parameter.numHoles) { //Process GET request to add new course
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
        return ContentService.createTextOutput(JSON.stringify(returnObj))
            .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }  
  }  
  if (e.parameter.id) { //GET request to retrieve data associated with course
    returnObj = getCourseData(e.parameter.id);
    if (e.parameter.callback) { //need to return using callback
      return ContentService.createTextOutput(e.parameter.callback + 
              '(' + JSON.stringify(returnObj) + ')')
           .setMimeType(ContentService.MimeType.JAVASCRIPT);
     } else { //dont' return using callback
       return ContentService.createTextOutput(JSON.stringify(returnObj))
           .setMimeType(ContentService.MimeType.JAVASCRIPT);
     }  
  }
  //if here, unrecognized query params
  return ContentService.createTextOutput("Error: Unrecognized query parameters: " + JSON.stringify(e.parameter))
           .setMimeType(ContentService.MimeType.JAVASCRIPT);
}                               



/* doPost -- Handle the post request to update course hole data. We grab the updated
   hole data from the POST body, call upon updateCourse, and then return the value
   returned from updateCourse, which is a status message indicating whether data
   could be updated.
*/
function doPost(e) {
  console.log("e.postData.type = " + e.postData.type);
  console.log("e.postData.contents = " + JSON.stringify(e.postData.contents));
  var courseObj = JSON.parse(e.postData.contents);
  var returnVal = updateCourse(courseObj);
  console.log("updateCourse returned " + returnVal + ", returning result to client...");
  return ContentService.createTextOutput(returnVal)
           .setMimeType(ContentService.MimeType.JAVASCRIPT); 
}
