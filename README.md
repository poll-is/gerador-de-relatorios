# Gerador de relatórios
Gerador de relatórios do Google Classroom.

## Como usar:

1. Faça uma copia da planilha com o script agregado:

https://docs.google.com/spreadsheets/d/1W7aiFi-2o6jtOwM2oLmcI9DHjqRdftnhCWJyQgj6tW8/copy

2. Clique em "Gerar relatório"

![Clique em Gerar relatório](https://github.com/poll-is/gerador-de-relatorios/blob/master/gerador-de-relatorios-classroom.png?raw=true)


**ATENÇÃO:** Esse script de aplicativos não foi verificado pelo Google. Ao solicitar a geração do relatório, ele irá apresentar **avisos de aplicativo não verificado**. Estamos em processo de verificação do aplicativos.


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

3. Professores

Coluna | Parâmetro
------------ | -------------
Foto | teacher.profile.photoUrl
Nome | teacher.profile.name.fullName
E-mail | teacher.profile.emailAddress
Turmas | courses_name
Alunos | num_students
Número de anúncios | num_announcements
Tarefas enviadas | num_assignments
Perguntas respondidas | ?



## Use, compartilhe e colabore:

* **Achou legal esse trabaho?**
Compartilhe com seus grupos e redes sociais.

* **Quer sugerir melhorias?**
Mande a sua sugestão para o e-mail info@poll.is

* **Encontrou um erro?**
[Registre um bug (problema)](https://github.com/poll-is/gerador-de-relatorios/issues)



## Futuras melhorias e novos recursos

- [ ] Adicionar foto na planilha
- [ ] Integrar com o Google Data Studio
- [ ] Definir indicadores e configuração de valores
