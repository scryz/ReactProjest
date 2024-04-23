import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../css/Navbar.css"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LoginPage } from '../pages/LoginPage';
import VerifyToken from '../body/VerifyToken';
import jQuery from 'jquery';

const Navbar = () => {
  // менюшка для мобильных телефонов
  (function ($) {
    $(function () {
      $('#nav-toggle').off('click').on('click', function () {
        $('nav ul').slideToggle();
      });
      $('#nav-toggle').on('click', function () {
        this.classList.toggle('active');
      });
    });
  })(jQuery);


  //показ регистрации и авторизации
  const { isValid, error } = VerifyToken();
  const [showModalLogReg, setShowModalLogReg] = useState(false);
  const handleShowModalLogReg = () => setShowModalLogReg(true);
  const handleCloseModalLogReg = () => setShowModalLogReg(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('token');
    window.location.reload();
  }


  return (
    <>
      <section className="navigation">
        <div className="nav-container">
          <div className="brand">
            <a href="/">MeetMaker</a>
          </div>

          <nav>
            <div className="nav-mobile"><a id="nav-toggle"><span></span></a></div>
            <ul className="nav-list">
              {isValid ? (<>
                <li><Link to="/events/1">События</Link></li>
                <li><Link to="/map">Карта</Link></li>
                <li><Link to="/chat">Сообщения</Link></li>
                <li><Link to="/profile">Профиль</Link></li>
                <li><Link onClick={handleLogout}>Выйти</Link></li>
              </>) :
                (<>
                  <li><Link to="/events/1">События</Link></li>
                  <li><Link to="/map">Карта</Link></li>
                  <li>
                    <a href="#0" onClick={(event) => { event.preventDefault(); handleShowModalLogReg(); }}>
                      Авторизация / Регистрация</a>
                    <LoginPage showModalLogReg={showModalLogReg} closeModalLogReg={handleCloseModalLogReg} />
                  </li>
                </>

                )
              }
            </ul>
          </nav>
        </div>

      </section>
    </>
  )
}

export default Navbar;