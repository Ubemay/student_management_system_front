import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getGroups from "../../api/getGroups";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { deleteGroups } from "../../api/groups/deleteGroups";

function GroupsList() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate(); // Use useNavigate to navigate to the "/groups/new" route

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGroups();
        setGroups(data);
      } catch (error) {
        console.error("Ошибка при получении списка групп", error);
      }
    }
    fetchData();
  }, []);

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteGroups(groupId);
      const updatedGroups = groups.filter((group) => group.id !== groupId);
      setGroups(updatedGroups);
    } catch (error) {
      console.error("Ошибка при удалении группы", error);
    }
  };

  return (
    <Container>
      <h4>Список групп</h4>
      <Button
        as={Link}
        to="/groups/new" // Link to the "/groups/new" route
        variant="success" // Set the button variant to green
        className="mb-3" // Add some margin below the button
      >
        Add
      </Button>
      <ListGroup>
        {groups.map((group, index) => (
          <ListGroup.Item key={group.id}>
            <Link to={`/groups/${group.id}`} style={{ textDecoration: "none" }}>
              <Row>
                <Col>
                  <strong>{`${index + 1}) ${group.groupName}`}</strong>
                  <br />
                  Факультет: {group.faculty}
                </Col>
                <Col className="text-right">
                  <Button
                    as={Link}
                    to={`/groups/edit/${group.id}`}
                    variant="primary"
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default GroupsList;
