import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createDepartment } from "../../api/departments/createDepartments";
import { updateDepartment } from "../../api/departments/updateDepartments";


function DepartmentsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    departmentName: "",
    location: "",
  });

  useEffect(() => {
    if (id) {
      async function fetchDepartmentData() {
        try {
          const response = await fetch(`http://localhost:4954/departments/${id}`);
          const data = await response.json();
          setFormData(data);
        } catch (error) {
          console.error("Ошибка при загрузке данных департамента", error);
        }
      }
      fetchDepartmentData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateDepartment(id, formData); // Используйте функцию обновления департамента
      } else {
        await createDepartment(formData); // Используйте функцию создания департамента
      }
      navigate("/departments"); // Перейти на страницу списка департаментов после сохранения
    } catch (error) {
      console.error("Ошибка при сохранении департамента", error);
    }
  };

  return (
    <div>
      <h2>{id ? "Редактировать департамент" : "Создать департамент"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="departmentName" className="form-label">
            Название департамента:
          </label>
          <input
            type="text"
            className="form-control"
            id="departmentName"
            name="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Местоположение:
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default DepartmentsForm;
