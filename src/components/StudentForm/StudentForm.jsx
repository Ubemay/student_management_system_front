import React, { useState, useEffect } from 'react';
import { createStudent } from '../../api/createStudent';
import { updateStudent } from '../../api/updateStudent';
import { getGroups } from '../../api/getGroups'; // Добавляем функцию получения списка групп
import './StudentForm.css';
import { useNavigate } from 'react-router-dom';

function StudentForm({ student, onSave }) {
  const [formData, setFormData] = useState(student);
  const [groups, setGroups] = useState([]); // Состояние для хранения списка групп
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(student);
  }, [student]);

  useEffect(() => {
    // Загрузка списка групп при монтировании компонента
    async function fetchGroups() {
      try {
        const groupsData = await getGroups();
        setGroups(groupsData);
      } catch (error) {
        console.error('Ошибка при получении списка групп', error);
      }
    }

    fetchGroups();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateStudent(formData.id, formData);
      } else {
        await createStudent(formData);
      }
      navigate('/students');
      onSave();
    } catch (error) {
      console.error('Ошибка при сохранении студента', error);
    }
  };

  


  return (
    <div>
      <h2>{student.id ? 'Редактировать студента' : 'Создать студента'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">Имя:</label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Фамилия:</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Возраст:</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="groupId" className="form-label">
            Группа:
          </label>
          <select
            className="form-select"
            id="groupId"
            name="groupId"
            value={formData.groupId || ''}
            onChange={handleChange}
          >
            <option value="">Выберите группу</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.groupName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Сохранить</button>
      </form>
    </div>
  );
}

export default StudentForm;
