import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import { getStudentsCourses } from "../../api/studentCourses/getStudentsCourses";
import { deleteStudentsCourses } from "../../api/studentCourses/deleteStudentsCourses";
import { Link, useNavigate } from "react-router-dom";

function StudentsCoursesList() {
  const [studentsCourses, setStudentsCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStudentsCourses();
        setStudentsCourses(data);
      } catch (error) {
        console.error(
          "Ошибка при получении списка курсов для студентов",
          error
        );
      }
    }
    fetchData();
  }, []);

  const handleDeleteStudentsCourses = async (studentCourseId) => {
    try {
      await deleteStudentsCourses(studentCourseId);
      // Обновите список курсов для студентов после удаления
      const updatedStudentsCourses = studentsCourses.filter(
        (studentCourse) => studentCourse.id !== studentCourseId
      );
      setStudentsCourses(updatedStudentsCourses);
    } catch (error) {
      console.error("Ошибка при удалении информации о курсе", error);
    }
  };

  return (
    <Container>
      <h4>Список курсов для студентов</h4>
      <Button
        as={Link}
        to="/students-courses/new"
        variant="success"
        className="mb-3"
      >
        Добавить
      </Button>
      <ListGroup>
        {studentsCourses.map((studentCourse) => (
          <ListGroup.Item key={studentCourse.id}>
            <Row>
              <Col xs={8}>
                <strong>
                  {`${studentCourse.student?.firstname || "Unknown"} ${
                    studentCourse.student?.lastname || "Unknown"
                  }`}
                </strong>
                <br />
                Курс: {studentCourse.course?.courseName || "Unknown"}
                <br />
                Инструктор:{" "}
                {`${studentCourse.instructor?.firstName || "Unknown"} ${
                  studentCourse.instructor?.lastName || "Unknown"
                }`}
              </Col>
              <Col xs={4} className="d-flex justify-content-end">
                <Button
                  as={Link}
                  to={`/students-courses/edit/${studentCourse.id}`}
                  variant="primary"
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteStudentsCourses(studentCourse.id)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default StudentsCoursesList;
