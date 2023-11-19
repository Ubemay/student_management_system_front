import axios from "axios";

const API_BASE_URL = "http://localhost:4953";

export const updateAttedance= async (attedanceId, attedanceData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/courses/${attedanceId}`,
      attedanceData
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении посещения", error);
    throw error;
  }
};
