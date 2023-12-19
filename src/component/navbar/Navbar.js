import React from 'react';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import "./Navbar.css"

const Navbar = () => { 

 const access_token = localStorage.getItem('access_token');
 let decoded;
  
 try {
    decoded = jwtDecode(access_token);
 } catch (error) {
    console.error('Failed to decode token:', error);
 }
  
 return (
    <div className="header">
      <div className="header_inner">
        <div className="header_logo">
          <NavLink to="/" className="nav_linkbar">
            GetGether
          </NavLink>
        </div>
        <ul className="nav_log">
        {access_token ? (
          <NavLink to="/registrathion" className="nav_linkbar">
          Регистрация
        </NavLink>
          ):(
            <NavLink to="/login" className="nav_linkbar">
            Авторизация
          </NavLink>

          )
        }
        </ul>
      </div>
    </div>
 );
};

export default Navbar;