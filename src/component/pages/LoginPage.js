import React, { useState }  from 'react';
import axios from 'axios';
import "../../css/login.css";
import { jwtDecode } from 'jwt-decode';



const LoginPage = () => {
 const [userName, setName] = useState('');
 const [password, setPassword] = useState('');
 const [errorMessage, setErrorMessage] = useState(null);



 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7293/api/Auth/Login', {
          userName: userName,
          password: password
          },
      );
      setErrorMessage(null);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', userName)
      document.cookie = `token=${response.data.token}; expires=${new Date(Date.now() + 86400000)}; path=/`;

      const token = localStorage.getItem(response.data.token);
      const decoded = jwtDecode(token);
        const data = await response.json();
        console.log(decoded);
        localStorage.setItem('token', JSON.stringify(data));
        localStorage.setItem('token', token);
        


      }
      catch (err)
      {
        if (err.response) {
          if (err.response.status === 400) {
            setErrorMessage('Неверный логин или пароль');
          } else {
            setErrorMessage('Ошибка сервера');
          }
         } else {
          setErrorMessage('Успешный вход!');
          window.location.href="/";
          
       }
      }
    
       
  
      }

    

 return (

    
    <main className="login_block">
      <div className="logo">GetGether</div>
      <div className="login_text">Войдите в аккаунт</div>
      <div className="login">
  
        <div className="input-form">
          <input type="text" value={userName} onChange={(e) => setName(e.target.value)} placeholder="Ник"/>
        </div>
        <div className="input-form">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль"/>
        </div>
      
        {errorMessage && <p>{errorMessage}</p>}
      <button type='submit' className="button" onClick={handleSubmit}>Войти</button>
    
      </div>
    </main>

 );
}
 
    export default LoginPage;
