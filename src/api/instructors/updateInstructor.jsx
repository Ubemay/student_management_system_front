import axios from "axios";

const API_BASE_URL = "http://localhost:4955";

export const updateInstructor = async (instructorId, instructorData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/instructors/${instructorId}`,
      instructorData
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении инструктора", error);
    throw error;
  }
};
