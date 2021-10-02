import { Student } from "../types/Student";

const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
];

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
function addStudent(student: Student) {
  const newStudent = {
    id: students.length ? students[students.length - 1].id! + 1 : 1,
    ...student,
  };
  students.push(Object.freeze(newStudent));
  return Promise.resolve(newStudent);
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => Promise.resolve(Object.freeze([...students]));

const updateStudentById = (studentToUpdate: Student) => { 
  const studentIndex = students.findIndex((student) => student.id === studentToUpdate.id);
  students[studentIndex] = studentToUpdate;

  return Promise.resolve(studentToUpdate);;
};

const deleteById = (studentId?: string) => { 
  const studentIndex = students.findIndex((student) => student.id === studentId);
  students.splice(studentIndex, 1);

  return Promise.resolve(true);
};


export { addStudent, getStudents, updateStudentById, deleteById };
