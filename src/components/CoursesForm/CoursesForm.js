import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createCourses } from "../../api/courses/createCourses";
import { updateCourse } from "../../api/courses/updateCourse";

function CoursesForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (id) {
      async function fetchCourseData() {
        try {
          const response = await fetch(`http://localhost:4952/courses/${id}`);
          const data = await response.json();
          setFormData(data);
        } catch (error) {
          console.error("Ошибка при загрузке данных курса", error);
        }
      }
      fetchCourseData();
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
        // Если есть id, то это редактирование курса
        await updateCourse(id, formData); // Используйте функцию обновления курса
      } else {
        // Если нет id, то это создание нового курса
        await createCourses(formData); // Используйте функцию создания курса
      }
      navigate("/courses"); // Перейти на страницу списка курсов после сохранения
    } catch (error) {
      console.error("Ошибка при сохранении курса", error);
    }
  };

  return (
    <div>
      <h2>{id ? "Редактировать курс" : "Создать курс"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseName" className="form-label">
            Название курса:
          </label>
          <input
            type="text"
            className="form-control"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Описание:
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Дата начала:
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            Дата окончания:
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            value={formData.endDate}
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

export default CoursesForm;
