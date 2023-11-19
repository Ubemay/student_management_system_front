import axios from "axios";

const API_BASE_URL = "http://localhost:4951";

export const updateGroup = async (groupId, groupData) => {
  try {
    console.log("groupId:", groupId);
    console.log("groupData:", groupData);

    const response = await axios.put(
      `${API_BASE_URL}/groups/${groupId}`,
      groupData
    );

    console.log("response:", response);

    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении группы", error);
    throw error;
  }
};

