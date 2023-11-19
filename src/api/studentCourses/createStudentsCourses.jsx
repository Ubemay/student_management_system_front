import axios from 'axios';

const API_BASE_URL = 'http://localhost:4956';

export const createStudentsCourses = async (studentsCoursesData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/student-courses`, studentsCoursesData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании курса', error);
    throw error;
  }
}; 