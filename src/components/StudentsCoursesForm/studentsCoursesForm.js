import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createStudentsCourses } from "../../api/studentCourses/createStudentsCourses";
import { updateStudentsCourses } from "../../api/studentCourses/updateStudentsCourses";

function StudentsCoursesForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    instructorId: "",
  });

  useEffect(() => {
    if (id) {
      async function fetchStudentCourseData() {
        try {
          const response = await fetch(`http://localhost:4956/student-courses/${id}`);
          if (response.ok) {
            const data = await response.json();
            if (data && data.student && data.course && data.instructor) {
              const studentId = data.student.id.toString();
              const courseId = data.course.id.toString();
              const instructorId = data.instructor.id.toString();
              setFormData({ studentId, courseId, instructorId });
            } else {
              console.error("Данные о курсе для студента не полны или некорректны");
            }
          } else {
            console.error("Ошибка при загрузке данных о курсе для студента");
          }
        } catch (error) {
          console.error("Ошибка при загрузке данных о курсе для студента", error);
        }
      }
      fetchStudentCourseData();
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
        await updateStudentsCourses(id, formData);
      } else {
        await createStudentsCourses(formData);
      }
      navigate("/students-courses");
    } catch (error) {
      console.error("Ошибка при сохранении курса для студента", error);
    }
  };

  return (
    <div>
      <h2>
        {id ? "Редактировать курс для студента" : "Создать курс для студента"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="studentId" className="form-label">
            ID студента:
          </label>
          <input
            type="text"
            className="form-control"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="courseId" className="form-label">
            ID курса:
          </label>
          <input
            type="text"
            className="form-control"
            id="courseId"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="instructorId" className="form-label">
            ID инструктора:
          </label>
          <input
            type="text"
            className="form-control"
            id="instructorId"
            name="instructorId"
            value={formData.instructorId}
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

export default StudentsCoursesForm;
