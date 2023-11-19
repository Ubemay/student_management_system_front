import axios from "axios";

const API_BASE_URL = 'http://localhost:4953';

export async function deleteAttedance(id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/attedances/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

