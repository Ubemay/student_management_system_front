import React, { useEffect, useState } from "react";
import { getStudents } from "../../api/getStudents";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { deleteStudent } from "../../api/deleteStudent";
import { useNavigate } from "react-router-dom";
import SearchResults from "../../SearchStudents/SearchResults"; // Импорт компонента SearchResults

function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения поискового запроса
  const [searching, setSearching] = useState(false); // Состояние для определения, идет ли поиск
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Ошибка при получении списка студентов", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      navigate(0);
      await deleteStudent(id);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error("Ошибка при удалении студента", error);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      setSearching(true);
      navigate(`/students/name/${searchTerm}`);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom>
        Список студентов
      </Typography>
      <div>
        <input
          type="text"
          placeholder="Поиск по имени"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Поиск</button>
      </div>
      <Link to="/students/new" className="btn btn-success ml-auto">
        Add Student
      </Link>
      {searching ? (
        <SearchResults searchTerm={searchTerm} /> // Передача поискового запроса в SearchResults
      ) : (
        <List>
          {students.map((student, index) => (
            <ListItem key={student.id}>
              <ListItemText
                primary={`${index + 1}) ${student.firstname} ${student.lastname}`}
                secondary={`${student.age} лет`}
              />
              <Link
                to={`/students/edit/${student.id}`}
                className="btn btn-primary mr-2"
              >
                Edit
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(student.id)}
              >
                Delete
              </button>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default StudentList;
