/*function getLastInteractionTime() {
  var parameters = ["classroom:timestamp_last_interaction"];
  var pageToken;
  var page;
  var rows = [];
  var today = new Date();
  var four_days_ago = new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000);
  var timezone = Session.getScriptTimeZone();
  var date = Utilities.formatDate(four_days_ago, timezone, "yyyy-MM-dd");

  do {
    page = AdminReports.UserUsageReport.get("all", date, {
      parameters: parameters.join(","),
      maxResults: 500,
      pageToken: pageToken,
    });
    if (page.warnings) {
      for (var i = 0; i < page.warnings.length; i++) {
        var warning = page.warnings[i];
        Logger.log(warning.message);
      }
    }
    var reports = page.usageReports;
    if (reports) {
      for (var i = 0; i < reports.length; i++) {
        var report = reports[i];
        //var parameterValues = getParameterValues(report.parameters);
        var row = [
          report.date,
          report.entity.userEmail,
          report.parameters[0].datetimeValue,
          //parameterValues["classroom:timestamp_last_interaction"],
        ];
        rows.push(row);
      }
    }
    pageToken = page.nextPageToken;
  } while (pageToken);

  if (rows.length > 0) {
    var spreadsheet = SpreadsheetApp.create(
      "Relatórios dos usuários - Classroom"
    );
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var headers = ["Data", "Usuário", "Última interação"];
    sheet.appendRow(headers);

    // Append the results.
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

    //Logger.log("Relatório criado: %s", spreadsheet.getUrl());
  } else {
    Logger.log("Nenhum resultado.");
  }
}*/

function addToSpreadsheet(sheetName, ln, data) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  /*var spreadsheet = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/14tYlD7mI5lVobF4xmv1vknRdas-XoUqAxHR6HlBCk44/edit"
  );*/
  var sheet = spreadsheet.getSheetByName(sheetName);
  sheet.clearContents();
  if (sheetName == "Salas de aula") {
    sheet
      .getRange(1, 1, 1, ln)
      .setValues([
        [
          "Nome da turma",
          "Sala",
          "Nome do professor",
          "Número de alunos",
          "Média Grade/100",
          "Número de atividades",
          "Número de perguntas",
          "Número de Anúncios",
        ],
      ]);
  } else if (sheetName == "Alunos") {
    sheet
      .getRange(1, 1, 1, ln)
      .setValues([
        [
          "Foto",
          "Nome",
          "E-mail",
          "Turmas",
          "Média das notas",
          "Atribuições",
          "Comunicados",
          "Perguntas respondidas",
        ],
      ]);
  } else if (sheetName == "Professores") {
    sheet
      .getRange(1, 1, 1, ln)
      .setValues([
        [
          "Foto",
          "Nome",
          "E-mail",
          "Turmas",
          "Alunos",
          "Número de anúncios",
          "Tarefas enviadas",
          "Perguntas respondidas",
        ],
      ]);
  }

  // Append the results.
  sheet.getRange(2, 1, data.length, ln).setValues(data);

  //Logger.log("Relatório criado: %s", spreadsheet.getUrl());
}

function getCourseByUser(id, isTeacher) {
  if (!isTeacher)
    var response_course = Classroom.Courses.list({ studentId: id });
  else var response_course = Classroom.Courses.list({ teacherId: id });
  var courses = response_course.courses;
  var res = [];
  if (courses && courses.length > 0) {
    for (course of courses) {
      res.push(course);
    }
  }
  return res;
}

function getTeachers(course_id) {
  var response_teacher = Classroom.Courses.Teachers.list(course_id);
  var teachers = response_teacher.teachers;
  var res = [];
  if (teachers && teachers.length > 0) {
    for (teacher of teachers) {
      res.push(teacher);
    }
  }
  return res;
}

function getAssignmentsByUser(course_id, user_id) {
  var response_assignment = Classroom.Courses.CourseWork.list(course_id);
  var assignments = response_assignment.assignments;
  var res = 0;
  if (assignments && assignments.length > 0) {
    for (assignment of assignments) {
      if (assignment.creatorUserId == user_id) {
        res++;
      }
    }
  }
  return res;
}

function getAssignments(course_id) {
  var response_assignment = Classroom.Courses.CourseWork.list(course_id);
  var assignments = response_assignment.assignments;
  var res = { regular: [], multipleChoice: [] };
  if (assignments && assignments.length > 0) {
    for (assignment of assignments) {
      if ("multipleChoiceQuestion" in assignment) {
        res.multipleChoice.push(assignment);
      } else {
        res.regular.push(assignment);
      }
    }
  }
  return res;
}

function getAnnouncementsByUser(course_id, user_id) {
  var response_announcement = Classroom.Courses.Announcements.list(course_id);
  var announcements = response_announcement.announcements;
  var res = 0;
  if (announcements && announcements.length > 0) {
    for (announcement of announcements) {
      if (announcement.creatorUserId == user_id) {
        res++;
      }
    }
  }
  return res;
}

function getAnnouncements(course_id) {
  var response_announcement = Classroom.Courses.Announcements.list(course_id);
  var announcements = response_announcement.announcements;
  var res = [];
  if (announcements && announcements.length > 0) {
    for (announcement of announcements) {
      res.push(announcement);
    }
  }
  return res;
}

function getNumAnswers(course_id, student_id) {
  var response_submission = Classroom.Courses.CourseWork.StudentSubmissions.list(
    course_id,
    "-",
    {
      userId: student_id,
    }
  );
  var submissions = response_submission.studentSubmissions;
  var res = 0;
  if (submissions && submissions.length > 0) {
    for (submission of submissions) {
      res++;
    }
    return res;
  }
  return 0;
}

function getGrades(course_id, student_id) {
  var response_submission = Classroom.Courses.CourseWork.StudentSubmissions.list(
    course_id,
    "-",
    {
      userId: student_id,
    }
  );
  var submissions = response_submission.studentSubmissions;
  var res = 0;
  if (submissions && submissions.length > 0) {
    for (submission of submissions) {
      if (submission.assignedGrade != undefined) {
        res += submission.assignedGrade;
      } else {
        res += 0;
      }
    }
    return res / submissions.length;
  }
  return 0;
}

function getStudents(course_id) {
  var response_student = Classroom.Courses.Students.list(course_id);
  var students = response_student.students;
  var res = [];
  if (students && students.length > 0) {
    for (student of students) {
      res.push(student);
    }
  }
  return res;
}
/*
function getParameterValues(parameters) {
  return parameters.reduce(function (result, parameter) {
    var name = parameter.name;
    var value;
    if (parameter.intValue !== undefined) {
      value = parameter.intValue;
    } else if (parameter.stringValue !== undefined) {
      value = parameter.stringValue;
    } else if (parameter.datetimeValue !== undefined) {
      value = new Date(parameter.datetimeValue);
    } else if (parameter.boolValue !== undefined) {
      value = parameter.boolValue;
    }
    result[name] = value;
    return result;
  }, {});
}
*/
