import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStudents } from "../../api/getStudents";

function StudentsInGroup() {
  const { groupId } = useParams();
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:4950/student/group/${groupId}`);
        const data = await response.json();
        console.log(data); // Log the response data
  
        if (data && Array.isArray(data)) {
          setStudents(data); // Предполагая, что data - это массив студентов
        } else {
          console.error("Invalid or empty data received");
        }
      } catch (error) {
        console.error("Error fetching student list", error);
      }
    }
    fetchData();
  }, [groupId]);

  return (
    <div>
      <h2>Список студентов в группе</h2>
      <ul>
        {students.map((student) => (
          <li key={student.student_id}>
            {student.firstname} {student.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
}  

export default StudentsInGroup;