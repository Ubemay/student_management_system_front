import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { getAttedances } from "../../api/attedances/getAttedances";

function AttedancesList() {
  const [attedances, setAttedances] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAttedances();
        setAttedances(data);
      } catch (error) {
        console.error("Ошибка при получении списка посещений", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <h4>Список посещений</h4>
      <ListGroup>
        {attedances.map((attedance) => (
          <ListGroup.Item key={attedance.id}>
            <strong>
              {`${attedance.student.firstname || "Unknown"} ${
                attedance.student.lastname || "Unknown"
              }`}
            </strong>
            <br />
            Курс: {attedance.course.courseName || "Unknown"}
            <br />
            Дата: {attedance.date || "Unknown"}
            <br />
            Присутствие: {attedance.present ? "Да" : "Нет"}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default AttedancesList;
