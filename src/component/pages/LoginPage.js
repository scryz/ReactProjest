import React, { useState }  from 'react';
import "./login.css";
import { NavLink } from 'react-router-dom';
import { login } from '../../auth';




const LoginPage = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  const { access_token } = await login(email, password);
  localStorage.setItem('access_token', access_token);
 };

 


 return (
  <form onSubmit={handleSubmit}>
    <main className="login_block">
  <div className="logo">GetGether</div>
  <div className="login_text">Войдите в аккаунт</div>
  <div className="login">
  
      <div className="input-form">
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ник/E-mail"/>
      </div>
      <div className="input-form">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль"/>
      </div>
      
      
      <button type='submit'>Войти</button>
    
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
