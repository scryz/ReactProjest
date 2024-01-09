import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import "../../css/Navbar.css"
import LoginPage from '../pages/LoginPage';
import Reg from '../pages/Reg';

const Navbar = () => {

 const token = localStorage.getItem('token');

 return (
  <header id="ant-section__ant006_header">
  <div className="container">
      <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-6 col-6  ant006_header-logo">
              <a href="#0" title="Сайтов по поиску компаний!">GetToGether </a>
          </div>
          <div className="col-lg-9 col-sm-6 col-md-12 col-6 ant006_header-menu-wrap">
              <div className="ant006_header-toggle">
            
                  <i className="material-icons">menu</i>
              </div>
              
              <nav className="ant006_header-container">
                  <ul className="menu">
                      {token ? ( <>
                        <li><Link to="/Events">Мероприятия</Link></li>
                        <li><Link to="/addevent">Создать мероприятие</Link></li>
                        <li><Link to="/profile">Профиль</Link></li>
                      </>):
                      (<>
                      <Popup trigger = {<li className='menu-item'><a href='#'>Регистрация</a></li>} modal nested>
                      {
                            close => (
                                <Reg></Reg>
                            )
                        }
                      </Popup>
                      <Popup trigger = {<li className='menu-item'><a href='#'>Авторизация</a></li>} modal nested>
                        {
                            close => (
                                <LoginPage></LoginPage>
                            )
                        }
                      </Popup>
                      </>
                      )
                    }
                  </ul>
              </nav>
          </div>
      </div>
  </div>
  </header>
 )
}

export default Navbar;