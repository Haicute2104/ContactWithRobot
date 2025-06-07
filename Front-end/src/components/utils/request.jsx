import axios from 'axios'; 

const API_DOMAIN = "http://localhost:3000/api/"; 

const apiClient = axios.create({
  baseURL: API_DOMAIN,
  headers: {
    'Accept': 'application/json',
    
  },
});

export const get = async (path) => {
  try {
    const response = await apiClient.get(path);
    return response.data; // Axios tự động parse JSON vào .data
  } catch (error) {
    console.error(`Error in GET ${path}:`, error.response?.data || error.message);
    throw error; // Ném lại lỗi để component gọi có thể xử lý
  }
};

export const post = async (path, options) => {
  try {
    const response = await apiClient.post(path, options);
    return response.data;
  } catch (error) {
    console.error(`Error in POST ${path}:`, error.response?.data || error.message);
    throw error;
  }
};

export const del = async (path) => {
  try {
    const res = await apiClient.delete(path);
    return res.data;
  } catch (error) {
    console.error(`Error in DELETE ${path}:`, error.response?.data || error.message);
    throw error;
  }
};

export const patch = async (path, options) => { // Thêm 'options' cho patch
  try {
    // Axios tự động đặt Content-Type application/json nếu 'options' là object JSON
    const response = await apiClient.patch(path, options); // Truyền data vào request PATCH
    return response.data;
  } catch (error) {
    console.error(`Error in PATCH ${path}:`, error.response?.data || error.message);
    throw error;
  }
};

