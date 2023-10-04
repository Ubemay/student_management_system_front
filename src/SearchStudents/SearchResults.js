import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import searchStudentsByName from "../api/searchStudentByName";

function SearchResults() {
  const { name } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await searchStudentsByName(name);
        setStudents(data);
      } catch (error) {
        console.error("Ошибка при получении результатов поиска", error);
      }
    }
    fetchData();
  }, [name]);

  return (
    <div>
      <h2>Результаты поиска для имени: {name}</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <p>Имя: {student.firstname}</p>
            <p>Фамилия: {student.lastname}</p>
            <p>Возраст: {student.age} лет</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
