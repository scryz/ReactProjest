import React, { useState } from 'react';
import "./reg.css";
import { NavLink } from 'react-router-dom';

const Reg = () => {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [useremail, setEmail] = useState('');
    const [usercity, setCity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://localhost:7293/Survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username,useremail,usercity, password }),
    });

    const data = await response.json();
    console.log(data);
  }
    return (
        <div className="intro">
        <div className="container">
            <div className="login_reg_block">
            
                <div className="logo">GetGether</div>
                <div className="reg_text">Создание аккаунта</div>
                <div className="regin">
                <div className="input-form">
                    <input type="text" value={username} placeholder="Ник" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="input-form">
                    <input type="email" value={useremail} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-form">
                    <input type="text" value={usercity} placeholder="Город" onChange={(e) => setCity(e.target.value)}/>
                </div>
                <div className="input-form">
                    <input type="password" value={password} placeholder="Пароль" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="input-form">
                    <input type="password" value={password} placeholder="Пароль" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button onClick={handleSubmit}>Создать</button>
                </div>
                    <footer className="nav">
                        
                            <NavLink to="/login" className="nav_link">
                                Уже есть аккаунт
                            </NavLink>
                        
                    </footer>
            
            </div>
        </div>
    </div>
        );
    }
    export default Reg;