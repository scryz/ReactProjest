import "../../css/Footer.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import {LoginPage} from "../pages/LoginPage";
import VerifyToken from "./VerifyToken";

const Footer = () => {
    const { isValid, error } = VerifyToken();
    const [showModalLogReg, setShowModalLogReg] = useState(false);
    const handleShowModalLogReg = () => setShowModalLogReg(true);
    const handleCloseModalLogReg = () => setShowModalLogReg(false);

    return(
<footer id="ant-section__ant007_footer" className="">

<div className="container">
    <div className="row">

        <div className="col-lg-5 ant007_footer__foter-item-wrap">
            <div className="footer-item">
                <p>Приложение для поиска компаний по интересам в Вашем городе.</p>
                {isValid ? (<Link to="/Events" className="btn" title="Мероприятия">Мероприятия</Link>
                ):(
                    <>
                      <button className = "btn popup-btn xx-large rounded colorful hover-colorful-darken" onClick={handleShowModalLogReg}>
                      Авторизация</button>
                  <LoginPage showModalLogReg={showModalLogReg} closeModalLogReg={handleCloseModalLogReg} />
                  </>
                )
                }
            </div>
        </div>

        <div className="col-lg-2 col-md-4 ant007_footer__foter-item-wrap footer-col-2">
            <div className="footer-item">

                <h6>Компания</h6>

                <ul className="footer-menu">
                    <li><a href="#0">Услуги</a></li>
                    <li><a href="#0">О компании</a></li>
                    <li><a href="#0">Главная</a></li>
                    <li><a href="#0">Возможности</a></li>
                    <li><a href="#0">О Нас</a></li>
                    <li><a href="#0">Вакансии</a></li>
                </ul>
            </div>
        </div>

        <div className="col-lg-2 col-md-4 ant007_footer__foter-item-wrap footer-col-3">
            <div className="footer-item">
                
                <h6>Информация</h6>

                <ul className="footer-menu">
                    <li><a href="#0">Новости</a></li>
                    <li><a href="#0">Безопсность</a></li>
                    <li><a href="#0">Поддержка</a></li>
                    <li><a href="#0">Разработчикам</a></li>
                    <li><a href="#0">Telegram</a></li>
                </ul>
            </div>
        </div>

        <div className="col-lg-2 col-md-4 ant007_footer__foter-item-wrap footer-col-4">
            <div className="footer-item">

                <h6>Политика</h6>

                <ul className="footer-menu">
                    <li><a href="#0">Условия использования</a></li>
                    <li><a href="#0">Конфиденциальность</a></li>
                    <li><a href="#0">Настройки Cookie</a></li>
                    <li><a href="#0">Правила</a></li>
                    <li><a href="#0">Лицензии</a></li>
                </ul>

            </div>
        </div>

    </div>
</div>
</footer>
    );
    }
export default Footer;