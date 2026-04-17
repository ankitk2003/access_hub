import API from "./axios";

export const createUser = async (data) => {
  try {
    const res = await API.post("/admin/create-user", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Create user failed" };
  }
};

export const getAllUsers = async (search = "") => {
  try {
    const res = await API.get(`/admin/users?search=${search}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Fetch users failed" };
  }
};

export const getSingleUser = async (id) => {
  try {
    const res = await API.get(`/admin/users/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Fetch user failed" };
  }
};

export const updateUser = async (id, data) => {
  try {
    const res = await API.put(`/admin/users/${id}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Update user failed" };
  }
};

export const updateUserStatus = async (id, status) => {
  try {
    const res = await API.post(`/admin/users/${id}/update-status`, {
      status,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Status update failed" };
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await API.delete(`/admin/users/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Delete failed" };
  }
};