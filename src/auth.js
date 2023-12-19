import axios from 'axios';

const authEndpoint = 'https://localhost:7293/login';

export const login = async (email, password) => {
 const response = await axios.post(authEndpoint, { email, password });
 return response.data;
};

export const logout = () => {
    localStorage.removeItem('access_token');
   };

