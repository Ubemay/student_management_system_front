import axios from "axios";

const API_BASE_URL = 'http://localhost:4950';

const searchStudentsByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/student/name/${name}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при поиске студентов по имени', error);
    throw error;
  }
};

export default searchStudentsByName;