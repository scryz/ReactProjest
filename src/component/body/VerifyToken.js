import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { LoginPage } from '../pages/LoginPage';

const VerifyToken = () => {
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');
    const [showModalLogReg, setShowModalLogReg] = useState(false);
    const handleCloseModalLogReg = () => setShowModalLogReg(false);
  
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
          <LoginPage showModalLogReg={showModalLogReg} closeModalLogReg={handleCloseModalLogReg} />
        }
      } catch (error) {
        <LoginPage showModalLogReg={showModalLogReg} closeModalLogReg={handleCloseModalLogReg} />
      }
    };
  
    return { isValid, error };
  };
  
  export default VerifyToken;