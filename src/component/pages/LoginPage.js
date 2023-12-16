import React, { useState } from 'react';
import axios from 'axios';
import "./login.css";
import { NavLink } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://localhost:7293/Survey', { username, password });
            const token = response.data.token;
            // сохранение токена в localStorage или в состоянии приложения
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <main className="login_block">
            <div className="logo">GetGether</div>
            <div className="login_text">Войдите в аккаунт</div>
            <div className="login">
                <div className="input-form">
                    <input type="text" value={username} placeholder="Ник/E-mail" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="input-form">
                    <input type="password" value={password} placeholder="Пароль" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button onClick={handleLogin}>Войти</button>
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
    );
}

export default LoginPage;