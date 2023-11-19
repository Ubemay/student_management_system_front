import axios from "axios";

const API_BASE_URL = 'http://localhost:4952';

export async function deleteCourse(id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/courses/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

