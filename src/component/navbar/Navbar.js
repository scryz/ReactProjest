import React from 'react';
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
              <Link to="/">GetToGether </Link>
          </div>
          <div className="col-lg-9 col-sm-6 col-md-12 col-6 ant006_header-menu-wrap">
              <div className="ant006_header-toggle">
            
                  <i className="material-icons">menu</i>
              </div>
              
              <nav className="ant006_header-container">
                  <ul className="menu">
                      {token ? ( <>
                        <li><Link to="/events">Мероприятия</Link></li>
                        <li><Link to="/addevent">Создать мероприятие</Link></li>
                        <li><Link to="/profile">Профиль</Link></li>
                      </>):
                      (<>
                      <Popup trigger = {<li className='menu-item'><a href='#0'>Регистрация</a></li>} modal nested>
                      {
                            close => (
                                <Reg></Reg>
                            )
                        }
                      </Popup>
                      <Popup trigger = {<li className='menu-item'><a href='#0'>Авторизация</a></li>} modal nested>
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