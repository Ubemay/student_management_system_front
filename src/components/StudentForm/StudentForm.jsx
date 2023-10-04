import React, { useState, useEffect } from 'react';
import { createStudent } from '../../api/createStudent';
import { updateStudent } from '../../api/updateStudent';
import './StudentForm.css';
import { useNavigate } from 'react-router-dom';


function StudentForm({ student, onSave }) {
  const [formData, setFormData] = useState(student);

  const navigate = useNavigate();

  useEffect(() => {
    setFormData(student); 
  }, [student]);

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
      navigate("/students")
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
        <button type="submit" className="btn btn-primary">Сохранить</button>
      </form>
    </div>
  );
}

export default StudentForm;
