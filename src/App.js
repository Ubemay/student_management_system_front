import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import StudentList from "./components/StudentList/StudentList";
import StudentForm from "./components/StudentForm/StudentForm";
import { Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchResults from "./SearchStudents/SearchResults";

function App() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/students">
            Student Management System
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Router>
        <div>
          <Routes>
            <Route path="/students" element={<StudentList />} />
            <Route
              path="/students/new"
              element={<StudentForm student={{}} />}
            />
            <Route path="/students/edit/:id" element={<EditStudentForm />} />
            <Route path="/students/name/:name" element={<SearchResults />} />
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
