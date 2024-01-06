import React, { useState } from 'react';
import "../../css/reg.css";
import { NavLink } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Popup from "reactjs-popup";

const Reg = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userProfile, setUserProfile] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('https://localhost:7293/api/Auth/Register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, password, userProfile }),
          });

          if (!response.ok) {
            throw new Error(response.statusText);
          }

    

            const data = await response.json();
            console.log(data);
        } catch (error) {
            setErrorMessage('Ошибка регистрации!');
        }
    }

    return (
        <div className="container">
            <div className="login_reg_block">
                <div className="logo">GetGether</div>
                <div className="reg_text">Создание аккаунта</div>
                <form className="regin" onSubmit={handleSubmit}>
                    <label className="input-form">
                        <input type="text" name="userName" placeholder="Ник" value={userName} onChange={(e)=>setUserName(e.target.value)} />
                    </label>
                    <label className="input-form">
                        <input type="password" name="name" placeholder="Пароль" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </label>
                    <label className="input-form">
                        <input type="text" name="age" placeholder="Имя" value={userProfile.name} onChange={(e)=>setUserProfile({...userProfile, name: e.target.value})} />
                    </label>
                    <label className="input-form">
                        <input type="password" name="number" placeholder="Возраст" value={userProfile.age} onChange={(e)=>setUserProfile({...userProfile, age: e.target.value})} />
                    </label>
                    <label className="input-form">
                        <input type="text" name="userNameId" placeholder="ID" value={userProfile.userNameId} onChange={(e)=>setUserProfile({...userProfile, userNameId: e.target.value})} />
                    </label>
                    {errorMessage && <p>{errorMessage}</p>}
                    <button type="submit">Создать</button>
                </form>
                <footer className="nav">
                    <Popup trigger={<li className='menu-item'><a href="#">Авторизация</a></li>} modal nested>
                        {
                            close => (
                                <LoginPage></LoginPage>
                            )
                        }
                    </Popup>
                </footer>
            </div>
        </div>
    );
}

export default Reg;