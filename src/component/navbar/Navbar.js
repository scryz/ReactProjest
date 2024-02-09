import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import "../../css/Navbar.css"
import { LoginPage } from '../pages/LoginPage';
import VerifyToken from '../body/VerifyToken';

const Navbar = () => {

const { isValid, error } = VerifyToken();
const [showModalLogReg, setShowModalLogReg] = useState(false);
const handleShowModalLogReg = () => setShowModalLogReg(true);
const handleCloseModalLogReg = () => setShowModalLogReg(false);


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
                      {isValid ? ( <>
                        <li><Link to="/events">Мероприятия</Link></li>
                        <li><Link to="/addevent">Создать мероприятие</Link></li>
                        <li><Link to="/chat">Сообщения</Link></li>
                        <li><Link to="/profile">Профиль</Link></li>
                      </>):
                      (<>
                      <li className='menu-item'>
                        <a href="#0" onClick={handleShowModalLogReg}>Авторизация / Регистрация</a>
                        <LoginPage showModalLogReg={showModalLogReg} closeModalLogReg={handleCloseModalLogReg} />
                        </li>  
                                            
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