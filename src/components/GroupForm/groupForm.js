import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createGroup } from "../../api/groups/createGroup";
import { updateGroup } from "../../api/groups/updateGroup";

function GroupForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    groupName: "",
    faculty: "",
    students: [],
  });

  useEffect(() => {
    if (id) {
      async function fetchGroupData() {
        try {
          const response = await fetch(`http://localhost:4951/groups/${id}`);
          const data = await response.json();
  
          // Обновите только необходимые поля
          setFormData(prevData => ({
            ...prevData,
            groupName: data.groupName || "",
            faculty: data.faculty || "",
            students: data.students || [],
          }));
        } catch (error) {
          console.error("Ошибка при загрузке данных группы", error);
        }
      }
      fetchGroupData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStudent = () => {
    // Add a new student to the students array
    setFormData({
      ...formData,
      students: [
        ...formData.students,
        { firstname: "", lastname: "", email: "", age: 0 }, // Initialize a new student
      ],
    });
  };

  const handleRemoveStudent = (index) => {
    // Remove a student from the students array
    const updatedStudents = [...formData.students];
    updatedStudents.splice(index, 1);
    setFormData({ ...formData, students: updatedStudents });
  };

  const handleStudentChange = (index, field, value) => {
    // Update the student data in the students array
    const updatedStudents = [...formData.students];
    updatedStudents[index][field] = value;
    setFormData({ ...formData, students: updatedStudents });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Убедитесь, что ID группы передается явно в запросе на обновление
        await updateGroup(id, { ...formData, id: parseInt(id) });
      } else {
        await createGroup(formData);
      }
      navigate("/groups");
    } catch (error) {
      console.error("Ошибка при сохранении группы", error);
    }
  };

  return (
    <div>
      <h2>{id ? "Редактировать группу" : "Создать группу"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="groupName" className="form-label">
            Название группы:
          </label>
          <input
            type="text"
            className="form-control"
            id="groupName"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="faculty" className="form-label">
            Факультет:
          </label>
          <input
            type="text"
            className="form-control"
            id="faculty"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <h3>Студенты:</h3>
          {formData.students.map((student, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Имя"
                value={student.firstname}
                onChange={(e) =>
                  handleStudentChange(index, "firstname", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Фамилия"
                value={student.lastname}
                onChange={(e) =>
                  handleStudentChange(index, "lastname", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Email"
                value={student.email}
                onChange={(e) =>
                  handleStudentChange(index, "email", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Возраст"
                value={student.age}
                onChange={(e) =>
                  handleStudentChange(index, "age", parseInt(e.target.value))
                }
              />
              <button
                type="button"
                onClick={() => handleRemoveStudent(index)}
              >
                Удалить
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddStudent}>
            Добавить студента
          </button>
        </div>
        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default GroupForm;
