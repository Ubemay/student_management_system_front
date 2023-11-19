import axios from "axios";

const API_BASE_URL = "http://localhost:4952";

export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/courses/${courseId}`,
      courseData
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении курса", error);
    throw error;
  }
};
