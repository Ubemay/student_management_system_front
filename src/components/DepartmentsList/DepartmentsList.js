import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import getDepartments from "../../api/departments/getDepartments";
import { deleteDepartment } from "../../api/departments/deleteDepartment";

function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Ошибка при получении списка департаментов", error);
      }
    }
    fetchData();
  }, []);

  const handleDeleteDepartment = async (departmentId) => {
    try {
      await deleteDepartment(departmentId);
      const updatedDepartments = departments.filter((dep) => dep.id !== departmentId);
      setDepartments(updatedDepartments);
    } catch (error) {
      console.error("Ошибка при удалении департамента", error);
    }
  };

  return (
    <Container>
      <h4>Список департаментов</h4>
      <Button
        as={Link}
        to="/departments/new"
        variant="success"
        className="mb-3"
      >
        Add
      </Button>
      <ListGroup>
        {departments.map((department, index) => (
          <ListGroup.Item key={department.id}>
            <Row>
              <Col>
                <strong>{`${index + 1}. ${department.departmentName}`}</strong>
                <br />
                Местоположение: {department.location}
              </Col>
              <Col className="text-right">
                <Button
                  as={Link}
                  to={`/departments/edit/${department.id}`}
                  variant="primary"
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteDepartment(department.id)}
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

export default DepartmentsList;
