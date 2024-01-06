import "../../css/Footer.css"
import Reg from "../pages/Reg";
import Popup from "reactjs-popup";

const Footer = () => {
    const access_token = localStorage.getItem('access_token');
    return(
<footer id="ant-section__ant007_footer" className="">

<div className="container">
    <div className="row">

        <div className="col-lg-5 ant007_footer__foter-item-wrap">
            <div className="footer-item">
                <p>Приложение для поиска компаний по интересам в Вашем городе.</p>
                {access_token ? (<a href="Events" className="btn" title="Мероприятия">Мероприятия</a>
                ):(
                    
                      <Popup trigger = {<a href='#' className="btn">Регистрация</a>} modal nested>
                      {
                            close => (
                                <Reg></Reg>
                            )
                        }
                      </Popup>
                )
                }
            </div>
        </div>

        <div className="col-lg-2 col-md-4 ant007_footer__foter-item-wrap footer-col-2">
            <div className="footer-item">

                <h6>Компания</h6>

                <ul className="footer-menu">
                    <li><a href="#">Услуги</a></li>
                    <li><a href="#">О компании</a></li>
                    <li><a href="#">Главная</a></li>
                    <li><a href="#">Возможности</a></li>
                    <li><a href="#">О Нас</a></li>
                    <li><a href="#">Вакансии</a></li>
                </ul>
            </div>
        </div>

        <div className="col-lg-2 col-md-4 ant007_footer__foter-item-wrap footer-col-3">
            <div className="footer-item">
                
                <h6>Информация</h6>

                <ul className="footer-menu">
                    <li><a href="#">Новости</a></li>
                    <li><a href="#">Безопсность</a></li>
                    <li><a href="#">Поддержка</a></li>
                    <li><a href="#">Разработчикам</a></li>
                    <li><a href="#">Telegram</a></li>
                </ul>
            </div>
        </div>

        <div className="col-lg-2 col-md-4 ant007_footer__foter-item-wrap footer-col-4">
            <div className="footer-item">

                <h6>Политика</h6>

                <ul className="footer-menu">
                    <li><a href="#">Условия использования</a></li>
                    <li><a href="#">Конфиденциальность</a></li>
                    <li><a href="#">Настройки Cookie</a></li>
                    <li><a href="#">Правила</a></li>
                    <li><a href="#">Лицензии</a></li>
                </ul>

            </div>
        </div>

    </div>
</div>
</footer>
    );
    }
export default Footer;