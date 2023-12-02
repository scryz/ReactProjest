import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="header">
      <div className="header_inner">
        <div className="header_logo">
          <NavLink to="/" className="nav_link">
            GetGether
          </NavLink>
        </div>
        <ul className="nav_log">
          <NavLink to="/login" className="nav_linkbar nav_link:hover nav_link:after">
            Авторизация
          </NavLink>
          <NavLink to="/registrathion" className="nav_linkbar nav_link:hover nav_link:after">
            Регистрация
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;