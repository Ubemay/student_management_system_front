import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import { getInstructors } from "../../api/instructors/getInstructors"; // Импортируйте функцию getInstructors
import { deleteIntructor } from "../../api/instructors/deleteIntructor";
import { Link } from "react-router-dom";

function InstructorsList() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getInstructors();
        setInstructors(data);
      } catch (error) {
        console.error("Ошибка при получении списка инструкторов", error);
      }
    }
    fetchData();
  }, []);

  const handleDeleteInstructor = async (instructorId) => {
    try {
      await deleteIntructor(instructorId);
      // Обновите список инструкторов после удаления, используя предыдущее состояние
      setInstructors((prevState) =>
        prevState.filter((instructor) => instructor.id !== instructorId)
      );
    } catch (error) {
      console.error("Ошибка при удалении инструктора", error);
    }
  };

  return (
    <Container>
      <h4>Список инструкторов</h4>
      <Button as={Link} to="/instructors/new" variant="success" className="mb-3">
        Добавить
      </Button>
      <ListGroup>
        {instructors.map((instructor) => (
          <ListGroup.Item key={instructor.id}>
            <Row>
              <Col xs={8}>
                <strong>{`${instructor.firstName} ${instructor.lastName}`}</strong>
                <br />
                Email: {instructor.email}
                <br />
                Phone Number: {instructor.phoneNumber}
                <br />
                Department: {instructor.department.departmentName}
                <br />
                Location: {instructor.department.location}
              </Col>
              <Col xs={4} className="d-flex justify-content-end">
                <Button
                  as={Link}
                  to={`/instructors/edit/${instructor.id}`}
                  variant="primary"
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteInstructor(instructor.id)}
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

export default InstructorsList;