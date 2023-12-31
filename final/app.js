
// need to student and course class with midterm and final.
class Score {
  constructor(courseId, midterm, final) {
    this.courseId = courseId;
    this.midterm = midterm;
    this.final = final;
  }

  getCourseId() {
    return this.courseId;
  }

  getMidterm() {
    return this.midterm;
  }

  getFinalScore() {
    return this.final;
  }
}
// id name grading scale and keeps the students that enrolled to that course
class Course {
  constructor(courseId, courseName, gradingScale) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.gradingScale = gradingScale;
    this.students = []; // Array to store students enrolled in the course
  }
  enrollStudent(student) {
    this.students.push(student);
  }

  getCourseId() {
    return this.courseId;
  }
  getCourseName() {
    return this.courseName;
  }

  getStudents() {
    return this.students;
  }
  getGradingScale() {
    return this.gradingScale;
  }
}
  //student, id name and surname and keeps courses that student object has enrolled
//and keeps notes list the list of note objects of student
class Student {
  constructor(id, name, surname) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.courses = []; // List to store students enrolled courses
    this.scores = []; // list for scores
  }



  //Calculate grade of the specific course that student has by getting courseId
  calculateGrade(courseId) {
    const selectedGrade = this.scores.find(
      (grade) => grade.getCourseId() === parseInt(courseId)
    );
    const selectedCourse = this.courses.find(
      (course) => course.getCourseId() === parseInt(courseId)
    );
    const midtermScore = selectedGrade.midterm;
    const finalScore = selectedGrade.final || 0;

    const midtermWeight = 0.4;
    const finalWeight = 0.6;

    let totalScore = midtermScore * midtermWeight + finalScore * finalWeight;

    // on what scale (7-10)
    if (selectedCourse.getGradingScale() === 7) {
      totalScore = (totalScore / 100) * 70;
    } else {
      totalScore = (totalScore / 100) * 100;
    }

    let LetterGrade;
    // Determine the grade based on the total score
    if (totalScore >= 90) {
      LetterGrade = "AA";
    } else if (totalScore >= 75) {
      LetterGrade = "BA";
    } else if (totalScore >= 65) {
      LetterGrade = "BB";
    } else if (totalScore >= 60) {
      LetterGrade = "CB";
    } else if (totalScore >= 55) {
      LetterGrade = "CC";
    } else if (totalScore >= 50) {
      LetterGrade = "DC";
    } else if (totalScore >= 40) {
      LetterGrade = "DD";
    } else {
      LetterGrade = "FF";
    }

    return LetterGrade;
  }
  //enrolling course to this.student object
  enrollCourse(course, midtermScore, finalScore) {
    this.courses.push(course);
    const courseId = course.getCourseId();
    this.scores.push(new Score(courseId, midtermScore, finalScore));
  }
  //getters 
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getSurname() {
    return this.surname;
  }
  getCourses() {
    return this.courses;
  }

  getMidterm(courseId) {
    const selectedGrade = this.scores.find(
      (grade) => parseInt(grade.getCourseId()) === parseInt(courseId)
    );
    console.log(selectedGrade);
    return selectedGrade.midterm;
  }

  getFinal(courseId) {
    const selectedGrade = this.scores.find(
      (grade) => parseInt(grade.getCourseId()) === parseInt(courseId)
    );

    return selectedGrade.getFinalScore();
  }
  

}
const courses = [
  new Course(1, "Mathematics", "10 point Scale"),
  new Course(2, "Music", "7 point Scale"),
  new Course(3, "Web Development", "10 point Scale"),
  new Course(4, "Database Design", "7 point Scale"),
  new Course(5, "Computer Networks", "7 point Scale"),
  new Course(6, "Algorithms", "10 point Scale"),
  new Course(7, "Software Engineering", "10 point Scale"),
  new Course(8, "Artificial Intelligence", "7 point Scale"),
  new Course(9, "Data Science", "10 point Scale"),
  new Course(10, "Human-Computer Interaction", "7 point Scale"),
  new Course(11, "Operating Systems", "7 point Scale"),
  new Course(12, "Cybersecurity", "10 point Scale"),  
];

const students = [
  new Student(1, "Berre", "Efe"),
  new Student(2, "Zeynep", "Saymaz"),
  new Student(3, "Alex", "Fury"),
  new Student(4, "Wesley", "Snejder"),
  new Student(5, "Aslan", "Demir"),
  new Student(6, "Bob", "Johnson"),
  new Student(7, "Eva", "White"),
  new Student(8, "Charlie", "Brown"),
  new Student(9, "Olivia", "Davis"),
  new Student(10, "Daniel", "Miller"),
  new Student(11, "Sophia", "Anderson"),
  new Student(12, "Matthew", "Martinez"),
  new Student(13, "Emma", "Garcia"),
];
students[1].enrollCourse(courses[1], 92, 87);
courses[1].enrollStudent(students[1]);
students[2].enrollCourse(courses[0], 65, 78);
courses[0].enrollStudent(students[2])
students[3].enrollCourse(courses[2], 75, 94);
courses[2].enrollStudent(students[3]);
students[4].enrollCourse(courses[1], 80, 85);
courses[1].enrollStudent(students[4]);
students[5].enrollCourse(courses[3], 88, 91);
courses[3].enrollStudent(students[5]);
students[6].enrollCourse(courses[2], 72, 79);
courses[2].enrollStudent(students[6]);
students[7].enrollCourse(courses[4], 95, 87);
courses[4].enrollStudent(students[7]);
students[8].enrollCourse(courses[4], 83, 90);
courses[3].enrollStudent(students[8]);
students[8].enrollCourse(courses[3], 76, 88);
courses[4].enrollStudent(students[8]);
students[9].enrollCourse(courses[7], 65, 88);
courses[7].enrollStudent(students[9]);
students[9].enrollCourse(courses[8], 76, 88);
courses[8].enrollStudent(students[9]);
students[9].enrollCourse(courses[9], 58, 88);
courses[9].enrollStudent(students[9]);





//  course select dropdown when a course added
const courseSelect = document.getElementById("courseSelect");
courses.forEach((course) => {
  const option = document.createElement("option");
  option.value = course.getCourseId();
  option.textContent = course.getCourseName();
  courseSelect.appendChild(option);
});

// adding course operation started.
document.getElementById("addCourse").addEventListener("click", function (event) {
    event.preventDefault();

    const courseName = document.getElementById("courseName").value;
    const gradingScale = document.getElementById("gradingScale").value;

    const newCourse = new Course(courses.length + 1, courseName, gradingScale);
    courses.push(newCourse);
    console.log(courses);

    // Add the newly added course to the dropdown
    const option = document.createElement("option");
    option.value = newCourse.getCourseId();
    option.textContent = newCourse.getCourseName();

    courseSelect.appendChild(option);

    // Clear forms
    document.getElementById("courseName").value = "";
    document.getElementById("gradingScale").value = "10";

     // Yeni eklenen kursu içerecek şekilde dropdown'u güncelle
     courseSelectDelete.innerHTML = "";
     courses.forEach((course) => {
         const option = document.createElement("option");
         option.value = course.getCourseId();
         option.textContent = course.getCourseName();
         courseSelectDelete.appendChild(option);
     });
  });
//list courses :checking whether it has been added
document
  .getElementById("listCourses")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const CoursesTable = document.getElementById("CoursesTable");
    CoursesTable.innerHTML = `<tr>
    <th>CourseID</th>
    <th>CourseName</th>

  </tr>`;
    courses.forEach((course) => {
      const row = `
      <tr>
        <td>${course.getCourseId()}</td>
        <td>${course.getCourseName()}</td>
      </tr>
    `;
      CoursesTable.innerHTML += row;
    });
  });

  //enroll student operation: use id for operation you sure about correct id.
  document.getElementById("enrollStudentBtn").addEventListener("click", function (event) {
    event.preventDefault();
    //take values.
    const studentID = parseInt(document.getElementById("studentID").value);
    const midtermScore = parseInt(document.getElementById("midtermScore").value);
    const finalScore = parseInt(document.getElementById("finalScore").value);
    
    //check it is acceptable or not .
    function validateInput(studentID, midtermScore, finalScore) {
      const isValidStudentID = Number.isInteger(studentID) && studentID >= 0 ;
      const isValidMidtermScore = Number.isInteger(midtermScore) && midtermScore >= 0 && midtermScore <= 100;
      const isValidFinalScore = Number.isInteger(finalScore) && finalScore >= 0 && finalScore <= 100;
  
      return isValidStudentID && isValidMidtermScore && isValidFinalScore;
    }
  
    const isValid = validateInput(studentID, midtermScore, finalScore);
    const selectedStudentID = document.getElementById("studentID").value;
  
    if (!isValid) {
      alert("something is wrong it is invalid input. Please check your input values.");
      return;
    }
    //choose the which course you want to enrolled.
    const courseSelection = document.getElementById("courseSelect").value;
    const courseSelected = courses.find((course) => course.getCourseId() === parseInt(courseSelection));
  
    const selectedStudent = students.find((student) => student.getId() === parseInt(selectedStudentID));
  
    if (courseSelected.getStudents().some(student => student.getId() === selectedStudent.getId())) {
      alert("it seems The student is already enrolled in the selected course.");
      return;
    }
  
    selectedStudent.enrollCourse(courseSelected, midtermScore, finalScore);
    courseSelected.enrollStudent(selectedStudent);
    alert("Student was enrolled successfully.");
  
    // Clear forms
    document.getElementById("studentID").value = "";
    document.getElementById("midtermScore").value = "";
    document.getElementById("finalScore").value = "";
  });
    

//List Students for checking delete or add operation .
document
  .getElementById("viewStudentsBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const studentsTable = document.getElementById("viewStudentsTable");
    studentsTable.innerHTML = `<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Surname</th>

    </tr>`;

    students.forEach((student) => {
      const row = `
      <tr>
        <td>${student.getId()}</td>
        <td>${student.getName()}</td>
        <td>${student.getSurname()}</td>

      </tr>
    `;
      studentsTable.innerHTML += row;
    });
  });


  //add student operation started.
  document
  .getElementById("addStudentBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const studentID = parseInt(
      document.getElementById("studentIDAddStudent").value
    );
    const studentFirstName = document.getElementById("firstName").value;
    const studentLastName = document.getElementById("lastName").value;


    //need to check this id is exist or not same id with different person is not acceptable.
    function doesntExist() {
      let boolean = true;
      students.forEach((student) => {
        if (parseInt(student.getId()) === studentID) {
          console.log(parseInt(student.getId()) === studentID);
          boolean = false;
        }
      });
      return boolean;
    }
    ////need to check this id is exist or not same id with different person is not acceptable.
    function validateInput() {
      const doesNotExist = doesntExist();
      console.log(doesNotExist);
      const isValidStudentID =
        Number.isInteger(studentID) &&
        studentID >= 0 &&
        studentID <= 999 &&
        doesNotExist;
      
      //checking length not too long
      const isVAlidStudentFirstName = studentFirstName.length < 15;
      const isVAlidStudentLastName = studentLastName.length < 15;

      let allValid =
        isVAlidStudentFirstName && isVAlidStudentLastName && isValidStudentID;

      return allValid;
    }
    const isValidStd = validateInput();

    if (isValidStd) {
      students.push(
        new Student(parseInt(studentID), studentFirstName, studentLastName)
        
      );
      console.log(students);
      alert("student was added")   //send a message to user.
      
    } else {
       alert("same id is exist")
    }
    //clear forms
    document.getElementById("studentIDAddStudent").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
  });


//Calculating GPA  for  search  student part 
function calculateGPA(student) {
  const courses = student.getCourses();
  const LetterGrades = [];
  courses.forEach((course) => {
    const courseId = course.getCourseId();
    const LetterGrade = student.calculateGrade(courseId);
    LetterGrades.push(LetterGrade);
  });
  const Points = {
    AA: 4.0,
    BA: 3.5,
    BB: 3.0,
    CB: 2.5,
    CC: 2.0,
    DC: 1.5,
    DD: 1.0,
    FD: 0.5,
    FF: 0.0,
  };
  let total = 0;
  let cnt = 0;
  for (const grade of LetterGrades) {
    cnt += 1;
    total += Points[grade];
  }
  const gpa = total / cnt;
  if (gpa) {
    return gpa;
  } else {
    return 0;
  }
}
//Search Students with name then see the id,name,surname,courses and gpa.
document
  .getElementById("searchStudents")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const searchValue = document.getElementById("searchStudentName2").value;
    const studentsTable = document.getElementById("SearchStudentsTable");
    studentsTable.innerHTML = `<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Surname</th>
    <th>Courses</th>
    <th>GPA</th>  

    </tr>`;

    students.forEach((student) => {
      if (student.getName().toLowerCase().includes(searchValue.toLowerCase())) {
        // The search text is found in the name
        const courses = student.getCourses().map(course => course.getCourseName()).join(', ');
        const row = `
      <tr>
        <td>${student.getId()}</td>
        <td>${student.getName()}</td>
        <td>${student.getSurname()}</td>
        <td>${courses}</td>

        <td>${calculateGPA(student)}</td>
          
    `;
        studentsTable.innerHTML += row;
      }
    });
  });

  // View student scores started.
  document.getElementById("viewStudentScoresBtn").addEventListener("click", function (event) {
    event.preventDefault();
    const selectedCourseId = document.getElementById("viewStudentScoresInput").value;
    const studentScoresTable = document.getElementById("studentScoresTable");
    studentScoresTable.innerHTML = `<tr>
      <th>ID</th>
      <th>Name</th>
      <th>Surname</th>
      <th>Midterm</th>
      <th>Final</th>
      <th>Grade</th>
    </tr>`;

    const selectedCourse = courses.find(course => course.getCourseId() === parseInt(selectedCourseId));

    if (selectedCourse) {
      const studentsList = selectedCourse.getStudents();

      studentsList.forEach(student => {
        const row = `
          <tr>
            <td>${student.getId()}</td>
            <td>${student.getName()}</td>
            <td>${student.getSurname()}</td>
            <td>${student.getMidterm(selectedCourse.getCourseId())}</td>
            <td>${student.getFinal(selectedCourse.getCourseId())}</td>
            <td>${student.calculateGrade(selectedCourse.getCourseId())}</td>
          </tr>
        `;
        studentScoresTable.innerHTML += row;
      });
    } else {
      console.error(`Course not found with ID '${selectedCourseId}'`);
    }
  });



  

  

  

  //view students scores function finished

//delete part started
// Populate course select dropdown for delete student
const courseSelectDelete = document.getElementById("courseSelectDelete");
courses.forEach((course) => {
  const option = document.createElement("option");
  option.value = course.getCourseId();
  option.textContent = course.getCourseName();
  courseSelectDelete.appendChild(option);
});

// Update student dropdown based on selected course
courseSelectDelete.addEventListener("change", function () {
  const selectedCourseId = courseSelectDelete.value;
  const studentSelectDelete = document.getElementById("studentSelectDelete");
  studentSelectDelete.innerHTML = ""; // Clear previous options
  const selectedCourse = courses.find(course => course.getCourseId() === parseInt(selectedCourseId));
  if (selectedCourse) {
    selectedCourse.getStudents().forEach((student) => {
      const option = document.createElement("option");
      option.value = student.getId();
      option.textContent = `${student.getName()} ${student.getSurname()}`; // Template literals kullanıldı
      studentSelectDelete.appendChild(option);
    });
}
});

// Delete student from course
document.getElementById("deleteStudentBtn").addEventListener("click", function (event) {
  event.preventDefault();
  const selectedCourseId = courseSelectDelete.value;
  const selectedStudentId = document.getElementById("studentSelectDelete").value;

  const selectedCourse = courses.find(course => course.getCourseId() === parseInt(selectedCourseId));
  const selectedStudent = selectedCourse.getStudents().find(student => student.getId() === parseInt(selectedStudentId));

  if (selectedStudent) {
    // Remove student from course
    selectedCourse.getStudents().splice(selectedCourse.getStudents().indexOf(selectedStudent), 1);

    // Remove course from student
    selectedStudent.getCourses().splice(selectedStudent.getCourses().indexOf(selectedCourse), 1);

    alert("Student successfully deleted from the course.");
  } else {
    alert("Student not found in the selected course.");
  }
});
//check all courses and their failed students passed students and details .
// JavaScript ile ders seçeneklerini doldur
const courseSelectViewAll = document.getElementById("courseSelectViewAll");
const courseSelectViewFailed = document.getElementById("courseSelectViewFailed");
const courseSelectViewPassed = document.getElementById("courseSelectViewPassed");
const courseSelectLectureDetails = document.getElementById("courseSelectLectureDetails");

courses.forEach((course) => {
  // create options use for each
  const optionViewAll = document.createElement("option");
  optionViewAll.value = course.getCourseId();
  optionViewAll.textContent = course.getCourseName();

  const optionViewFailed = document.createElement("option");
  optionViewFailed.value = course.getCourseId();
  optionViewFailed.textContent = course.getCourseName();

  const optionViewPassed = document.createElement("option");
  optionViewPassed.value = course.getCourseId();
  optionViewPassed.textContent = course.getCourseName();

  const optionLectureDetails = document.createElement("option");
  optionLectureDetails.value = course.getCourseId();
  optionLectureDetails.textContent = course.getCourseName();

  // Tüm seçenekleri doldur
  courseSelectViewAll.appendChild(optionViewAll);

  // Başarısız öğrencileri görüntülemek için seçenekleri doldur
  courseSelectViewFailed.appendChild(optionViewFailed);

  // Başarılı öğrencileri görüntülemek için seçenekleri doldur
  courseSelectViewPassed.appendChild(optionViewPassed);

  // Ders detaylarını görüntülemek için seçenekleri doldur
  courseSelectLectureDetails.appendChild(optionLectureDetails);
});

document.getElementById("viewAllStudentsBtn").addEventListener("click", function () {
  const selectedCourseId = parseInt(courseSelectViewAll.value);
  const selectedCourse = courses.find(course => course.getCourseId() === selectedCourseId);
  const studentsList = selectedCourse.getStudents();
  const resultsTable = createResultsTable(selectedCourse, studentsList);
  displayResultsTable(resultsTable, "allStudentsResultsTable");
});

document.getElementById("viewFailedStudentsBtn").addEventListener("click", function () {
  const selectedCourseId = parseInt(courseSelectViewFailed.value);
  const selectedCourse = courses.find(course => course.getCourseId() === selectedCourseId);
  const failedStudents = selectedCourse.getStudents().filter(student => student.calculateGrade(selectedCourseId) === 'FF');
  const resultsTable = createResultsTable(selectedCourse, failedStudents);
  displayResultsTable(resultsTable, "failedStudentsTable");
});

document.getElementById("viewPassedStudentsBtn").addEventListener("click", function () {
  const selectedCourseId = parseInt(courseSelectViewPassed.value);
  const selectedCourse = courses.find(course => course.getCourseId() === selectedCourseId);
  const passedStudents = selectedCourse.getStudents().filter(student => student.calculateGrade(selectedCourseId) !== 'FF');
  const resultsTable = createResultsTable(selectedCourse, passedStudents);
  displayResultsTable(resultsTable, "passedStudentsTable");
});

document.getElementById("viewLectureDetailsBtn").addEventListener("click", function () {
  const selectedCourseId = parseInt(courseSelectLectureDetails.value);
  const selectedCourse = courses.find(course => course.getCourseId() === selectedCourseId);
  const passedStudents = selectedCourse.getStudents().filter(student => student.calculateGrade(selectedCourseId) !== 'FF');
  const failedStudents = selectedCourse.getStudents().filter(student => student.calculateGrade(selectedCourseId) === 'FF');
  const meanScore = calculateMeanScore(selectedCourse.getStudents(), selectedCourseId);
  const lectureDetailsTable = createLectureDetailsTable(passedStudents.length, failedStudents.length, meanScore);
  displayResultsTable(lectureDetailsTable, "lectureDetailsTable");
});
function calculateMeanScore(students, courseId) {
  const totalScores = students.reduce((total, student) => total + student.calculateGrade(courseId), 0);
  return totalScores / students.length;
}

function createResultsTable(course, students) {
  const table = document.createElement("table");
  const headerRow = table.insertRow(0);
  const headers = ["Student ID", "Name", "Surname", "Midterm", "Final", "Grade"];

  // Başlık hücrelerini ekleyin
  headers.forEach((headerText, index) => {
    const headerCell = headerRow.insertCell(index);
    headerCell.textContent = headerText;
  });

  // add students 
  students.forEach((student) => {
    const row = table.insertRow();
    const cells = [
      student.getId(),
      student.getName(),
      student.getSurname(),
      student.getMidterm(course.getCourseId()),
      student.getFinal(course.getCourseId()),
      student.calculateGrade(course.getCourseId()),
    ];

    // add cell
    cells.forEach((cellText, index) => {
      const cell = row.insertCell(index);
      cell.textContent = cellText;
    });
  });

  return table;
}

function displayResultsTable(table, tableId) {
  // Tabloyu ekrana eklemek veya başka bir işlem yapmak için gerekli kodu ekleyin
  const tableContainer = document.getElementById(tableId);
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

function createLectureDetailsTable(passedStudentsCount, failedStudentsCount, meanScore) {
  const table = document.createElement("table");
  const headerRow = table.insertRow(0);
  const headers = ["Statistic", "Value"];

  // cell added 
  headers.forEach((headerText, index) => {
    const headerCell = headerRow.insertCell(index);
    headerCell.textContent = headerText;
  });

  // İstatistik değerlerini ekleyin
  const addRow = (label, value) => {
    const row = table.insertRow();
    const labelCell = row.insertCell(0);
    const valueCell = row.insertCell(1);
    labelCell.textContent = label;
    valueCell.textContent = value;
  };

  addRow("Number of Passed Students", passedStudentsCount);
  addRow("Number of Failed Students", failedStudentsCount);

  return table;
}


























 