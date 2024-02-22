import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import "../../css/Navbar.css"
import { LoginPage } from '../pages/LoginPage';
import VerifyToken from '../body/VerifyToken';
import jQuery from 'jquery';

const Navbar = () => {

    (function($) { // Begin jQuery
        $(function() { // DOM ready
          // Toggle open and close nav styles on click
          $('#nav-toggle').off('click').on('click', function() {
            $('nav ul').slideToggle();
          });
          // Hamburger to X toggle
          $('#nav-toggle').on('click', function() {
            this.classList.toggle('active');
          });
        });
      })(jQuery);


//поках регистрации и авторизации
const { isValid, error } = VerifyToken();
const [showModalLogReg, setShowModalLogReg] = useState(false);
const handleShowModalLogReg = () => setShowModalLogReg(true);
const handleCloseModalLogReg = () => setShowModalLogReg(false);


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
                      {isValid ? ( <>
                        <li><Link to="/events">Мероприятия</Link></li>
                        <li><Link to="/addevent">Создать мероприятие</Link></li>
                        <li><Link to="/chat">Сообщения</Link></li>
                        <li><Link to="/profile">Профиль</Link></li>
                      </>):
                      (<>
                      <li>
                        <a href="#0" onClick={handleShowModalLogReg}>Авторизация / Регистрация</a>
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