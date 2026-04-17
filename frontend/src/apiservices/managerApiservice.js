import API from "./axios";

export const getManagerUsers = async (search = "") => {
  try {
    const res = await API.get(`/manager/users`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Fetch manager users failed" };
  }
};

export const updateManagerUser = async (id, data) => {
  try {
    const res = await API.put(`/manager/users/${id}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Update failed" };
  }
};