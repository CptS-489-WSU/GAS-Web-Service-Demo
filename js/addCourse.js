//addCourse: Given a course id, name, city, state, country, and numHoles, this function adds the course to the database
function addCourse(course) {
  var sheet, newRowNum,totalStrParFormula, totalTimeParFormula, 
      totalGolfDistFormula, totalRunDistFormula, formats, timeFormat, numFormat;
  sheet = SpreadsheetApp.getActiveSheet();
  newRowNum = sheet.getLastRow() + 1; //get new row where course will be added
  //Set up formulas
  totalStrParFormula = "=SUM(K?, O?, S?)"; 
  totalTimeParFormula = "=SUM(L?, P?, T?)";
  totalGolfDistFormula = "=SUM(M?,Q?,U?)";
  totalRunDistFormula = "=SUM(M?,R?,V?)";
  totalStrParFormula = totalStrParFormula.replace(/\?/g,newRowNum);
  totalTimeParFormula = totalTimeParFormula.replace(/\?/g,newRowNum);
  totalGolfDistFormula = totalGolfDistFormula.replace(/\?/g,newRowNum);
  totalRunDistFormula = totalRunDistFormula.replace(/\?/g,newRowNum);
  //Set up cell formattig
  timeFormat = "[m]:ss";
  numFormat = "##";
  formats = [[numFormat,timeFormat,numFormat,numFormat,numFormat,timeFormat,numFormat,numFormat,
             numFormat,timeFormat,numFormat,numFormat,numFormat,timeFormat,numFormat,numFormat]];
  //Add course to database
  sheet.appendRow([course.id,course.name, course.city,
                   course.state,course.country,course.numHoles,totalStrParFormula,totalTimeParFormula,
                  totalGolfDistFormula, totalRunDistFormula]);
  //set cell formatting
  sheet.getRange(newRowNum,7,1,16).setNumberFormats(formats); //set proper cell formatting.
}
