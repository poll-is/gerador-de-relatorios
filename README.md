# Gerador de relatórios
Gerador de relatórios do Google Classroom.

## Como usar:

1. Faça uma copia da planilha com o script agregado:

https://docs.google.com/spreadsheets/d/1W7aiFi-2o6jtOwM2oLmcI9DHjqRdftnhCWJyQgj6tW8/copy

2. Clique em "Gerar relatório"

![Clique em Gerar relatório](https://github.com/poll-is/gerador-de-relatorios/blob/master/gerador-de-relatorios-classroom.png?raw=true)

## Organização dos dados por planilha:

1. Salas de aula

Coluna | Parâmetro
------------ | -------------
Nome da turma | course.name
Sala | course.room
Nome do professor | teacher_names
Número de alunos | students.length
Média Grade/100 | average_grade
Número de atividades | assignments.regular.length
Número de perguntas | assignments.multipleChoice.length
Número de Anúncios | announcements.length

2. Alunos

Coluna | Parâmetro
------------ | -------------
Foto | student.profile.photoUrl
Nome | student.profile.name.fullName
E-mail | student.profile.emailAddress
Turmas | courses
Média das notas | student.avgGrade
Atribuições | num_assignments
Comunicados | announcementsByStudent
Perguntas respondidas | num_answers

3.
