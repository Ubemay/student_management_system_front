import axios from "axios";

const API_BASE_URL = "http://localhost:4950";

export const updateStudent = async (studentId, studentData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/student/${studentId}`,
      studentData
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении студента", error);
    throw error;
  }
};
