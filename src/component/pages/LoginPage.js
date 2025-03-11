import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import "../../css/login.css";

export const LoginPage = ({ showModalLogReg, closeModalLogReg }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingReg, setIsLoadingReg] = useState(false);

  const signUpButtonRef = useRef(null);
  const signInButtonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setErrorMessage(null);
  }, [showModalLogReg]);

  const handleSignUpClick = () => {
    containerRef.current.classList.add("right-panel-active");
    setIsSignUp(true);
    setErrorMessage(null);
  };

  const handleSignInClick = () => {
    containerRef.current.classList.remove("right-panel-active");
    setIsSignUp(false);
    setErrorMessage(null);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setErrorMessage('Пожалуйста, заполните все поля.');
      return;
    }

    setIsLoadingLogin(true);

    try {
      const response = await axios.post('http://localhost:7293/api/Auth/Login', {
        userName,
        password
      });

      localStorage.setItem('token', response.data.token);
      const decoded = jwtDecode(response.data.token);
      console.log(decoded);

      setErrorMessage(null);
      closeModalLogReg();
      window.location.href = '/events/1';
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage('Неверный логин или пароль');
      } else {
        setErrorMessage('Ошибка сервера');
      }
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const handleSubmitReg = async (e) => {
    e.preventDefault();

    if (!userName || !password || !name || !confirmPassword) {
      setErrorMessage('Пожалуйста, заполните все поля.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают!');
      return;
    }

    setIsLoadingReg(true);

    try {
      const response = await axios.post('http://localhost:7293/api/Auth/Register', {
        userName,
        password,
        name,
        birthDate
      });

      if (response.status === 200) {
        setErrorMessage(null);
        handleSignInClick();
      } else {
        setErrorMessage('Ошибка регистрации');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Ошибка сервера');
      }
    } finally {
      setIsLoadingReg(false);
    }
  };

  return (
    <Modal show={showModalLogReg} onHide={closeModalLogReg}>
      <Modal.Body>
        <div className="container_log" ref={containerRef}>
          <div className={`form-container_log sign-up-container_log ${isSignUp ? 'active' : ''}`}>
            <form onSubmit={handleSubmitReg}>
              <h2>Создать аккаунт</h2>
              <input
                type="text"
                name="userName"
                placeholder="Ник"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="date"
                name="birthDate"
                placeholder="День рождения"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button className='btn_margin' type="submit" ref={signInButtonRef} disabled={isLoadingReg}>
                {isLoadingReg ? <div className="loader"></div> : 'Создать'}
              </button>
            </form>
          </div>
          <div className={`form-container_log sign-in-container_log ${!isSignUp ? 'active' : ''}`}>
            <span className="close_btn heavy" onClick={closeModalLogReg}></span>
            <form onSubmit={handleSubmitLogin}>
              <h1>Авторизоваться</h1>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Ник"
                autoFocus
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                required
              />
              <a href="#0">Забыли пароль?</a>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button className='btn_margin' type="submit" disabled={isLoadingLogin}>
                {isLoadingLogin ? <div className="loader"></div> : 'Войти'}
              </button>
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
};