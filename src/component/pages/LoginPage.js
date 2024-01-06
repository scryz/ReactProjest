import React, { useState }  from 'react';
import "../../css/login.css";
import { NavLink } from 'react-router-dom';
import { login } from '../../auth/auth';



const LoginPage = () => {

const [userName, setName] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');



 const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
  const { access_token } = await login(userName, password);
  localStorage.setItem('access_token', access_token);
  document.cookie = `access_token=${access_token}; path=/`;
    window.location.reload();
} catch (error) {
    setErrorMessage('Неверный логин или пароль.');
  }
 };



 return (
  <form onSubmit={handleSubmit}>
    
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
  <footer className="nav">
      
          <NavLink to="/" className="nav_link">
              Не помню пароль
          </NavLink>
      
          <NavLink to="/registrathion" className="nav_link">
              Создать учётную запись
          </NavLink>
  
  </footer>
</main>
    </form>
 );
}
 
    export default LoginPage;
