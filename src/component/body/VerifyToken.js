import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const VerifyToken = () => {
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        verifyToken(token);
      }
    }, []);
  
    const verifyToken = (token) => {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          setIsValid(true);
        } else {
          setError('Token is expired');
        }
      } catch (error) {
        setError('Invalid token');
      }
    };
  
    return { isValid, error };
  };
  
  export default VerifyToken;