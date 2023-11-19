import axios from "axios";

const API_BASE_URL = 'http://localhost:4956';

export async function deleteStudentsCourses(id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/student-courses/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

