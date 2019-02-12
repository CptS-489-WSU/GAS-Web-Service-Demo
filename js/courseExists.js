//courseExists -- Given a JavaScript object cotaining a course name, city, 
//state, and country, this function searches the database to determine 
//if the course already exists in the database, returning true if so, false if not.
function courseExists(course) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var numCourses = sheet.getLastRow() - 1;
  if (numCourses == 0) { 
    return false;
  }
  //if here, we know there is at least course in database
  var courses = sheet.getSheetValues(2,2,numCourses,4);
  for (var i = 0; i < courses.length; i++) {
    if (courses[i][0] == course.name && courses[i][1] == course.city &&
        courses[i][2] == course.state && courses[i][3] == course.country) {
          //Exact match!
          return true;
        }
      }
  }
  return false; 
}
