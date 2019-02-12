//generateCourseId-- Given the course object consisint of name, city, state and country of a course known not to already exist in the database, return
//a unique course id.
function generateCourseId(course) {
  return course.name + course.city + course.state + course.country;
}