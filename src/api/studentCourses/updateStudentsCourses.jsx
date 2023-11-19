import axios from "axios";

const API_BASE_URL = "http://localhost:4956";

export const updateStudentsCourses = async (studentsCoursesId, studentsCoursesData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/student-courses/${studentsCoursesId}`,
      studentsCoursesData
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении курса", error);
    throw error;
  }
};
