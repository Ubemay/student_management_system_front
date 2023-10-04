import axios from "axios";

const API_BASE_URL = 'http://localhost:4950';

export async function deleteStudent(id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/student/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}