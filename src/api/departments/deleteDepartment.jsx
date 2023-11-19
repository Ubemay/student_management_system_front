import axios from "axios";

const API_BASE_URL = 'http://localhost:4954';

export async function deleteDepartment(id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/departments/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}