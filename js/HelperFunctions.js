//getCourseRow -- Given a course Id, this function returns the (0-based) row at which the course's data resides, or -1
//if the playerId could not be found in the database.
function getPlayerRow(playerId) {
  var sheet, courseIds;
  sheet = SpreadsheetApp.getActiveSheet();
  courseIds = sheet.getSheetValues(2,1,sheet.getLastRow()-2,1); //entire column of courseIds
  for (var i = 0; i < courseIds.length; ++i) { //search for the playerId
    if (courseIds[i][0] === courseId) { //match
      return i + 1; //compensates for the header row
    }
  }
  return -1; 
}

//dateToString -- Given a JavaScript Date object, converts it to a colon-separated time string.
function dateToString(date) {
  return ((60 * date.getHours()) + date.getMinutes()) + ":" + date.getSeconds();
}

//zeroPad: Returns a string in which its integer parameter is padded with a leading
//zero if it is < 10.
function zeroPad(num) {
  if (num < 10) {
    return "0" + num.toString();
  } else {
    return num.toString();
  }
}

//SGTimeToString: Converts a time value (Date object) to a SG Time (only minutes and seconds).
//Note (5/8/18): We assume that a player can't be more than 120 minutes under par. This means we 
//interpret any time with hour == 22 or hour == 23 as under par. All other times are interpreted 
//as over par. In practice, this seems a bit like overkill (no player will ever even be 60 
//under par), but when testing the system, we sometimes generate very quick rounds that are 
//more than 60 under par, so allowing 120 under par accommodates these scenarios.
function SGTimeToString(theTime) {
  var theHours, theMinutes, theSeconds;
  if (theTime == null || theTime == "" || !(theTime instanceof Date))
    return "";
  theHours = theTime.getHours();
  if (theHours >= 22) { //we have an under par SG to par score between -0:01 and -59:59...
    theSeconds = theTime.getSeconds();
    if (theSeconds > 0) {
      theMinutes = (theHours == 23 ? 60 - theTime.getMinutes() - 1 : 120 - theTime.getMinutes() - 1);
      theSeconds = 60 - theSeconds;
    }  else {
      theMinutes = (theHours == 23 ? 60 - theTime.getMinutes() : 120 - theTime.getMinutes());
    }
    return "-" + theMinutes + ":" + zeroPad(theSeconds);
  } else { //assume above par
    theMinutes = theTime.getMinutes() + (theHours * 60);
    theSeconds = theTime.getSeconds();
    return theMinutes + ":" + zeroPad(theSeconds);
  } 
}
