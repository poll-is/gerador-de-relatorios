// Copyright (C) 2020 Terra Digital

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


function addToSpreadsheet(sheetName, ln, data) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

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
