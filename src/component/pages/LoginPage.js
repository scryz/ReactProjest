import React, { useState, useRef }  from 'react';
import axios from 'axios';
import { Modal} from 'react-bootstrap';
import "../../css/login.css";
import { jwtDecode } from 'jwt-decode';



export const LoginPage = ({ showModalLogReg, closeModalLogReg }) => {
 const [userName, setUserName] = useState('');
 const [password, setPassword] = useState('');
 const [errorMessage, setErrorMessage] = useState(null);
 const [name, setName] = useState('');
 const [age, setAge] = useState('');


 const signUpButtonRef = useRef(null);
 const signInButtonRef = useRef(null);
 const containerRef = useRef(null);
 
 const handleSignUpClick = () => {
   containerRef.current.classList.add("right-panel-active");
   setErrorMessage(null);
 };
 
 const handleSignInClick = () => {
   containerRef.current.classList.remove("right-panel-active");
   setErrorMessage(null);
 };

 const handleSubmitLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://localhost:7293/api/Auth/Login', {
          userName: userName,
          password: password
          },
      );
      setErrorMessage(null);
      localStorage.setItem('token', response.data.token);
      document.cookie = `token=${response.data.token}; expires=${new Date(Date.now() + 86400000)}; path=/`;

      const token = localStorage.getItem(response.data.token);
      const decoded = jwtDecode(token);
        const data = await response.json();
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

      const handleSubmitReg = async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch('https://localhost:7293/api/Auth/Register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, password, name, age }),
          });
          setErrorMessage(null);
            const data = await response.json();
            console.log(data);
            setErrorMessage('Неверно введены данные или пропущены поля!');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                  setErrorMessage('Неправильно введены данные или пропущены поля!');
                } else {
                  setErrorMessage('Ошибка сервера');
                }
               } else {
                setErrorMessage('Аккаунт успешно зарегистрирован!');
                handleSignInClick();
             }
           
        }
    }



    

 return (
  

<Modal show={showModalLogReg} onHide={closeModalLogReg}>
  <Modal.Body>
    <div className="container_log" ref={containerRef}>
      <div className="form-container_log sign-up-container_log">
        <form onSubmit={handleSubmitReg}>
          <h1>Создать аккаунт</h1>
          <input type="text" name="userName" placeholder="Ник" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input type="text" name="name" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="number" name="age" placeholder="Возраст" value={age} onChange={(e) => setAge(e.target.value)} />
          <input type="password" name="name" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errorMessage && <p>{errorMessage}</p>}
          <button type="submit" ref={signInButtonRef} >Создать</button>
        </form>
      </div>
      <div className="form-container_log sign-in-container_log">
        <form onSubmit={handleSubmitLogin}>
          <h1>Авторизоваться</h1>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Ник" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
          <a href="#0">Забыли пароль?</a>
          {errorMessage && <p>{errorMessage}</p>}
          <button type="submit">Войти</button>
        </form>
      </div>
      <div className="overlay-container_log">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Добро пожаловать!</h1>
            <p>Уже есть аккаунт? Тогда жми кнопку ниже!</p>
            <button ref={signInButtonRef} onClick={handleSignInClick}>Войти</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Привет!</h1>
            <p>Ещё нет аккаунта? Тогда жми кнопку ниже!</p>
            <button ref={signUpButtonRef} onClick={handleSignUpClick}>Зарегистрироваться</button>
          </div>
        </div>
      </div>
    </div>
  </Modal.Body>
</Modal>
 );
}
