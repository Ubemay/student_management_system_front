import axios from "axios";

const API_BASE_URL = 'http://localhost:4955';

export async function deleteIntructor(id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/instructors/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

