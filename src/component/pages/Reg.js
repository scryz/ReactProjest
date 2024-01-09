import React, { useState } from 'react';
import "../../css/reg.css";


const Reg = () => {
const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
const [userProfile, setUserProfile] = useState({userNameId: 'string'});
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
                window.location.href="/";
             }
           
        }
    }



    return (
        <div className="container">
            <div className="login_reg_block">
                <div className="logo">GetGether</div>
                <div className="reg_text">Регистрация</div>
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
                        <input type="text" name="number" placeholder="Возраст" value={userProfile.age} onChange={(e)=>setUserProfile({...userProfile, age: e.target.value})} />
                    </label>
                
                    {errorMessage && <p>{errorMessage}</p>}
                    <button className="button" type="submit" >Создать</button>
                </form>
                
            </div>
        </div>
    );
}

export default Reg;