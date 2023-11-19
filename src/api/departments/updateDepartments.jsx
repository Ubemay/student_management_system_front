import axios from "axios";

const API_BASE_URL = "http://localhost:4954";

export const updateDepartment = async (departmentId, departmentData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/departments/${departmentId}`,
      departmentData
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении департамента", error);
    throw error;
  }
};
