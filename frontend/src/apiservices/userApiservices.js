import API from "./axios";

export const getMyProfile = async () => {
  try {
    const res = await API.get("/user/profile");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Fetch profile failed" };
  }
};

// ✅ Update Profile
export const updateMyProfile = async (data) => {
  try {
    const res = await API.put("/user/profile", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Update profile failed" };
  }
};