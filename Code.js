function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Gerador de relatório")
    .addItem("Gerar relatório", "listCourses")
    .addToUi();
}

function listCourses() {
  var response_courses = Classroom.Courses.list();
  var courses = response_courses.courses;
  var student_list = [];
  var teacher_list = [];
  var course_rows = [];
  var student_rows = [];
  var teacher_rows = [];
  var courses_len = 0;
  var students_len = 0;
  var teachers_len = 0;

  var announcementsByStudent = 0;

  if (courses && courses.length > 0) {
    for (i = 0; i < courses.length; i++) {
      var course = courses[i];

      var teachers = getTeachers(course.id);
      var students = getStudents(course.id);
      var assignments = getAssignments(course.id);
      var announcements = getAnnouncements(course.id);

      var average_grade = 0;

      if (students && students.length > 0) {
        for (student of students) {
          var grade = getGrades(course.id, student.userId);
          average_grade += grade;

          if (!student_list.some((e) => e.userId === student.userId)) {
            student.avgGrade = grade;
            announcementsByStudent += getAnnouncementsByUser(
              course.id,
              student.userId
            );
            student_list.push(student);
          }
        }
        average_grade = average_grade / students.length;
      } else {
        average_grade = 0;
      }

      var teacher_names = [];

      if (teachers && teachers.length > 0) {
        for (teacher of teachers) {
          teacher_names.push(teacher.profile.name.fullName);
          if (!teacher_list.some((e) => e.userId === teacher.userId)) {
            teacher_list.push(teacher);
          }
        }
      }

      var record = [];
      record.push(course.name);
      record.push(course.room != undefined ? course.room : "Sem sala");
      record.push(teacher_names.toString());
      record.push(students.length);
      record.push(average_grade);
      record.push(assignments.regular.length);
      record.push(assignments.multipleChoice.length);
      record.push(announcements.length);
      course_rows.push(record);
      courses_len = record.length;
    }

    addToSpreadsheet("Salas de aula", courses_len, course_rows);

    for (student of student_list) {
      var studentRecord = [];

      var courses = getCourseByUser(student.userId, false);
      var num_assignments = 0;
      var num_answers = 0;
      var courses_name = [];
      if (courses && courses.length > 0) {
        for (course of courses) {
          if (course.id != undefined) {
            var assign = getAssignments(course.id);
            courses_name.push(course.name);
            num_answers += getNumAnswers(course.id, student.userId);
            num_assignments +=
              assign.multipleChoice.length + assign.regular.length;
          }
        }
      }

      studentRecord.push(student.profile.photoUrl);
      studentRecord.push(student.profile.name.fullName);
      studentRecord.push(student.profile.emailAddress);
      studentRecord.push(courses_name.toString());
      studentRecord.push(student.avgGrade);
      studentRecord.push(num_assignments);
      studentRecord.push(announcementsByStudent);
      studentRecord.push(num_answers);
      students_len = studentRecord.length;
      student_rows.push(studentRecord);
    }

    addToSpreadsheet("Alunos", students_len, student_rows);
    console.log("P");
    for (teacher of teacher_list) {
      var teacherRecord = [];

      var courses = getCourseByUser(teacher.userId, true);
      var num_announcements = 0;
      var num_assignments = 0;
      var num_students = 0;
      var courses_name = [];
      if (courses && courses.length > 0) {
        for (course of courses) {
          if (course.id != undefined) {
            courses_name.push(course.name);
            num_students += getStudents(course.id).length;
            num_assignments += getAssignmentsByUser(course.id, teacher.userId);
            num_announcements += getAnnouncementsByUser(
              course.id,
              teacher.userId
            );
          }
        }
      }

      teacherRecord.push(teacher.profile.photoUrl);
      teacherRecord.push(teacher.profile.name.fullName);
      teacherRecord.push(teacher.profile.emailAddress);
      teacherRecord.push(courses_name);
      teacherRecord.push(num_students);
      teacherRecord.push(num_announcements);
      teacherRecord.push(num_assignments);
      teacherRecord.push("?");

      teachers_len = teacherRecord.length;
      teacher_rows.push(teacherRecord);
    }

    addToSpreadsheet("Professores", teachers_len, teacher_rows);
  } else {
    Logger.log("No courses found.");
  }
}
