import axios from 'axios';

const authEndpoint = 'https://localhost:7293/api/Auth/Login';

export const login = async (userName, password) => {
 const response = await axios.post(authEndpoint, { userName, password });
 return response.data;
};

export const logout = () => {
 localStorage.removeItem('access_token');
 window.location.reload();
};


   
