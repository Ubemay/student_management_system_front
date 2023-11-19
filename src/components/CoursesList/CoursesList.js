import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import { getCourses } from "../../api/courses/getCourses"; // Импортируйте функцию getCourses
import { deleteCourse } from "../../api/courses/deleteCourse";
import { Link } from "react-router-dom";

function CoursesList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Ошибка при получении списка курсов", error);
      }
    }
    fetchData();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId);
      // Обновите список курсов после удаления, используя предыдущее состояние
      setCourses((prevState) =>
        prevState.filter((course) => course.id !== courseId)
      );
    } catch (error) {
      console.error("Ошибка при удалении курса", error);
    }
  };

  return (
    <Container>
      <h4>Список курсов</h4>
      <Button as={Link} to="/courses/new" variant="success" className="mb-3">
        Добавить
      </Button>
      <ListGroup>
        {courses.map((course) => (
          <ListGroup.Item key={course.id}>
            <Row>
              <Col xs={8}>
                <strong>{course.courseName}</strong>
                <br />
                Description: {course.description}
                <br />
                Start Date: {course.startDate}
                <br />
                End Date: {course.endDate}
              </Col>
              <Col xs={4} className="d-flex justify-content-end">
                <Button
                  as={Link}
                  to={`/courses/edit/${course.id}`}
                  variant="primary"
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteCourse(course.id)}
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

export default CoursesList;
