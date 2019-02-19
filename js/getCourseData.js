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
    lock = LockService.getDocumentLock(); /* get a lock to the doc to avoid 
                                             concurrency issues */
    lock.waitLock(30000);  //Lock auto-expires after 30 seconds
    sheet = SpreadsheetApp.getActiveSheet();
    courseVals = sheet.getSheetValues(courseRow+1,2,1,22);
    headerVals = sheet.getSheetValues(1,2,1,22);
    lock.releaseLock(); //We're done accessing sheet so explicitly release lock
    courseData = {}; //Initialize empty object to add to
    //Save basic course data to object
    courseData.name = courseVals[0][0];
    courseData.city = courseVals[0][1];
    courseData.state = courseVals[0][2];
    courseData.country = courseVals[0][3];
    courseData.numHoles = courseVals[0][4];
    courseData.strPar = courseVals[0][5]
    courseData.timePar = courseVals[0][6];
    courseData.golfDist = courseVals[0][7];
    courseData.runDist = courseVals[0][8];
    //Now save available hole data to object
    //Here, we assume just three holes for demo purposes
    for (i = 9; i < 22; i++) {
        if (headerVals[0][i].indexOf("strPar") != -1 &&
            courseVals[0][i] != "") { 
             //Non-empty stroke par for this hole
             //Include this hole in the return object
             holeNum = Number(headerVals[0][i].substr(0,2));
             courseData[holeNum] = {}; //initialize empty object to add to.
             courseData[holeNum].strPar = coursVals[0][i];
             courseData[holeNum].timePar = SGTimeToString(courseVals[0][i+1]);
             courseData[holeNum].golfDist = courseVals[0][i+2];
             courseData[holeNum].runDist = courseVals[0][i+3]; 
        }
    }
    return courseData;
}
