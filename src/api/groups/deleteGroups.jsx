import axios from "axios";

const API_BASE_URL = 'http://localhost:4951';

export async function deleteGroups(id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/groups/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}