import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import "../../css/login.css";
import { jwtDecode } from 'jwt-decode';



export const LoginPage = ({ showModalLogReg, closeModalLogReg }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');


  const signUpButtonRef = useRef(null);
  const signInButtonRef = useRef(null);
  const containerRef = useRef(null);

  //клик на кнопку автоиизации
  const handleSignUpClick = () => {
    containerRef.current.classList.add("right-panel-active");
    setErrorMessage(null);
  };

  //клик на кнопку регистрации
  const handleSignInClick = () => {
    containerRef.current.classList.remove("right-panel-active");
    setErrorMessage(null);
  };


  //авторизация
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setErrorMessage('Неверно введены данные или пропущены поля!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7293/api/Auth/Login', {
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

    catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setErrorMessage('Неверный логин или пароль');
        } else {
          setErrorMessage('Ошибка сервера');
        }
      } else {
        setErrorMessage('Успешный вход!');
        window.location.reload();

      }
    }
  }


  //регистрация
  const handleSubmitReg = async (e) => {
    e.preventDefault();

    //проверки
    if (!userName || !password || !name || !confirmPassword) {
      setErrorMessage('Неверно введены данные или пропущены поля!');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают!');
      return;
    }

    try {
      const response = await fetch('http://localhost:7293/api/Auth/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password, name, birthDate }),
      });

      if (response.status === 400) {
        const data = await response.json();
        setErrorMessage(data.message);
      } else {
        setErrorMessage(null);
        handleSignInClick();
        console.log(birthDate);
      }
    } catch (error) {
      setErrorMessage('Ошибка сервера');
    }
  };

  return (


    <Modal show={showModalLogReg} onHide={closeModalLogReg}>
      <Modal.Body>
        <div className="container_log" ref={containerRef}>
          <div className="form-container_log sign-up-container_log">
            <form onSubmit={handleSubmitReg}>
              <h2>Создать аккаунт</h2>
              <input type="text" name="userName" placeholder="Ник" value={userName} onChange={(e) => setUserName(e.target.value)} autoFocus />
              <input type="text" name="name" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="date" name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
              <input type="password" name="name" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input type="password" name="confirmPassword" placeholder="Подтвердите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              {errorMessage && <p>{errorMessage}</p>}
              <button className='btn_margin' type="submit" ref={signInButtonRef} >Создать</button>
            </form>
          </div>
          <div className="form-container_log sign-in-container_log">
            <span className="close_btn heavy" onClick={closeModalLogReg}></span>
            <form onSubmit={handleSubmitLogin}>
              <h1>Авторизоваться</h1>
              <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Ник" autoFocus />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
              <a href="#0">Забыли пароль?</a>
              {errorMessage && <p>{errorMessage}</p>}
              <button className='btn_margin' type="submit">Войти</button>
            </form>
          </div>
          <div className="overlay-container_log">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <span className="close_btn heavy" onClick={closeModalLogReg}></span>
                <h1>Добро пожаловать!</h1>
                <p>Уже есть аккаунт? Тогда жми кнопку ниже!</p>
                <button className='btn_margin' ref={signInButtonRef} onClick={handleSignInClick}>Войти</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Привет!</h1>
                <p>Ещё нет аккаунта? Тогда жми кнопку ниже!</p>
                <button className='btn_margin' ref={signUpButtonRef} onClick={handleSignUpClick}>Зарегистрироваться</button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
