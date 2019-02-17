//updateCourse: Given a course id, holeNum, strPar, timePar, golfDist and runDist, this function
//updates the course with the hole data for holeNum
function updateCourse(courseObj) {
    console.log("in updateCourse with courseObj = " + JSON.stringify(courseObj));
    var validTimePar = new RegExp("[0-5]?[0-9][:][0-5][0-9]");
    var sheet, courseRow, courseValRange, courseVals;
    if (isNaN(courseObj.holeNum) || courseObj.holeNum < 0 || courseObj.holeNum > 18) {
      return "Error: invalid hole number: " + courseObj.holeNum; //invalid hole number
    }
    if (isNaN(courseObj.strPar) || courseObj.holeStr < 1 || courseObj.holeStr > 6) {
      return "Error: invalid stroke par: " + courseObj.strPar; //invalid strPar
    }
    if (!(validTimePar.test(courseObj.timePar))) {
      return "Error: invalid time par: " + courseObj.timePar; //invalid holePar
    }
    //If here, we have valid data to write to the database!
    sheet = SpreadsheetApp.getActiveSheet();
    courseRow = getCourseRow(courseObj.id);
    if (courseRow == -1) {
      return "error: course Id not found: " + courseObj.id; //course Id not found 
    }
    courseValRange = sheet.getRange(courseRow+1,11 + ((courseObj.holeNum-1) * 4),1,4); // Grab exactly the 1 x 4 range where we'll write this hole data
    courseVals = courseValRange.getValues(); //Grab all values in range
    courseVals[0][0] = courseObj.strPar;
    courseVals[0][1] = "0:" + courseObj.timePar; //ensure the string is interpreted
                                      // as a clock time from midnight
    courseVals[0][2] = courseObj.golfDist;
    courseVals[0][3] = courseObj.runDist;
    courseValRange.setValues(courseVals); //write to DB
    return "Success";
} 