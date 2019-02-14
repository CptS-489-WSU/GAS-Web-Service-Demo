//getCourseData: Given a course id, this function 
//returns all data associated with the course in 
//the course DB as a JSON
//object.
function getCourseData(courseId) {
    var holeNum, i, sheet, courseRow, courseVals, headerVals, courseData;
    courseRow = getCourseRow(courseId);
    if (courseRow == -1) {
        return "error: Course with ID " + courseId +
               "does not exist.";
    }
    sheet = SpreadsheetApp.getActiveSheet();
    courseVals = sheet.getSheetValues(courseRow+1,2,1,22);
    headerVals = sheet.getSheetValues(1,2,1,22);
    courseData = {};
    courseData.name = courseVals[0][0];
    courseData.city = courseVals[0][1];
    courseData.state = courseVals[0][2];
    courseData.country = courseVals[0][3];
    courseData.numHoles = courseVals[0][4];
    for (i = 9; i < 22; i++) {
        if (headerVals[0][i].includes("strPar") &&
            courseVals[0][i] != "") {
             //Include this hole in the return object
             holeNum = Number(headerVals[0][i].substr(0,2));
             courseData[holeNum].strPar = coursVals[0][i];
             courseData[holeNum].timePar = SGTimeToString(courseVals[0][i+1]);
             courseData[holeNum].golfDist = courseVals[0][i+2];
             courseData[holeNum].runDist = courseVals[0][i+3]; 
        }
    }
    return courseData;
}
