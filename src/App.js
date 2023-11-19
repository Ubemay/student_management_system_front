import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import StudentList from "./components/StudentList/StudentList";
import StudentForm from "./components/StudentForm/StudentForm";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchResults from "./SearchStudents/SearchResults";
import GroupsList from "./components/GroupsList/GroupsList";
import StudentsInGroup from "./components/GroupsList/StudentsInGroup";
import GroupForm from "./components/GroupForm/groupForm";
import DepartmentsList from "./components/DepartmentsList/DepartmentsList";
import DepartmentsForm from "./components/DepartmetnsForm/DepartmentsForm";
import InstructorsList from "./components/InstructorsList/InstructorList";
import InstructorsForm from "./components/InstructorForm/InstructorForm";
import CoursesList from "./components/CoursesList/CoursesList";
import CoursesForm from "./components/CoursesForm/CoursesForm";
import StudentsCoursesList from "./components/StudentsCoursesList/studentsCoursesList";
import StudentsCoursesForm from "./components/StudentsCoursesForm/studentsCoursesForm";
import AttedancesList from "./components/AttedancesList/attedancesList";

function App() {
  return (
    <>
      <Router>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/students">
              Student Management System
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/groups">
                Groups
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <div>
          <Routes>
            <Route path="/students" element={<StudentList />} />
            <Route
              path="/students/new"
              element={<StudentForm student={{}} />}
            />
            <Route path="/students/edit/:id" element={<EditStudentForm />} />
            <Route path="/students/name/:name" element={<SearchResults />} />
            <Route path="/groups" element={<GroupsList />} />
            <Route path="/groups/:groupId" element={<StudentsInGroup />} />
            <Route path="/groups/edit/:id" element={<GroupForm />} />
            <Route path="/groups/new" element={<GroupForm group={{}} />} />
            <Route path="/departments" element={<DepartmentsList />} />
            <Route
              path="/departments/:departmentId"
              element={<DepartmentsForm />}
            />
            <Route path="/departments/edit/:id" element={<DepartmentsForm />} />
            <Route
              path="/departments/new"
              element={<DepartmentsForm gepartment={{}} />}
            />
            <Route path="/instructors" element={<InstructorsList />} />
            <Route
              path="/instructors/:instructorId"
              element={<StudentsInGroup />}
            />
            <Route path="/instructors/edit/:id" element={<InstructorsForm />} />
            <Route
              path="/instructors/new"
              element={<InstructorsForm instructor={{}} />}
            />
            <Route path="/courses" element={<CoursesList />} />
            <Route path="/courses/edit/:id" element={<CoursesForm />} />
            <Route path="/courses/new" element={<CoursesForm course={{}} />} />
            <Route path="/students-courses" element={<StudentsCoursesList />} />
            <Route
              path="/students-courses/edit/:id"
              element={<StudentsCoursesForm />}
            />
            <Route
              path="/students-courses/new"
              element={<StudentsCoursesForm course={{}} />}
            />
            <Route path="/attedances" element={<AttedancesList />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

function EditStudentForm() {
  const { id } = useParams();
  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    console.log("Student ID:", id);
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:4950/student/${id}`);
        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных студента", error);
      }
    };

    fetchStudent();
  }, [id]);

  return <StudentForm student={studentData} />;
}

export default App;
