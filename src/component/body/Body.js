import people from "../../img/team_sec_bg.png";
import "../../css/Body.css"
import VerifyToken from "./VerifyToken";
import { jwtDecode } from 'jwt-decode';
import Popup from "reactjs-popup";
import LoginPage from "../pages/LoginPage";
import { Link } from "react-router-dom";


const Body = () => { 

    const { isValid, error } = VerifyToken();

const token = localStorage.getItem('token');


if (token) {
 try {
    const decoded = jwtDecode(token);
    console.log(decoded);
 } catch (error) {
    console.error('Ошибка:', error);
 }
}



    return(
        <>
        <section id="ant-section__ant012_welcome" className="ant-section__ant012_welcome "> 

                <div className="overlay-colored color-bg-heading opacity-60"></div>

                <div className="slide-content">

                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">

                                <div className="banner-center-box text-white">

                                    <h1>Найди компанию по интересам!</h1>
                                    <div className="description">
                                        <h5>Создай мероприятие<br /> Или присоединись к уже созданному!</h5>
                                    </div>
                                    {isValid ? (
                                        <>
                                        <Link className="btn popup-btn xx-large rounded colorful hover-colorful-darken" to="/addevent" title="Создать мероприятие">
                                        Создать мероприятие</Link>
                                        <Link className="btn popup-btn xx-large rounded colorful hover-colorful-darken" to="/events" title="Присоединиться">
                                        Присоединиться</Link>
                                        </>
                                        ):
                                        (
                                        <Popup trigger = {<a className="btn popup-btn xx-large rounded colorful hover-colorful-darken" href="#0" title="Авторизоваться">
                                        Авторизоваться </a>} modal nested>
                                            {
                                                close => (
                                                    <LoginPage></LoginPage>
                                                )
                                            }
                                        </Popup>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>

<section className="ant-section__ant047_text_0">
<div className="container">
    <div className="row_l justify-content-center mb-30-none">
        <div className="col-lg-6">
            <div className="service-content mt-60 mb-30 yobject-marked">
                <h1 className="title">Место, где легко общаться</h1>
                <h4><p>Взаимодействуй с незнакомыми людьми или приглашай друзей. </p>
                <p>Все могут увидеть, что вы в сети, и смогут написать вам! </p></h4>
            </div>
        </div>
        <div className="col-lg-6">
            <div className="service-thumb mb-30">
                <img className="img_home" src={people} alt="about"/>
            </div>
        </div>
        </div>
        </div>
        </section>
        <section className="ant-section__ant047_text_1">
        <div className="container">
        <div className="row_r justify-content-center mb-30-none">
        <div className="col-lg-6">
            <div className="service-thumb mb-30">
                <img className="img_home" src={people} alt="about"/>
            </div>
        </div>
        <div className="col-lg-6">
            <div className="service-content mt-60 mb-30 yobject-marked">
            <h1 className="title">Находи события в своем городе</h1>
                <h4><p>Вы можете найти интересные события, которые проходят в вашем городе. 
                    Мы предлагаем широкий выбор мероприятий на любой вкус - от концертов до выставок и фестивалей.</p>
                <p>Для этого просто нажми на вкладку с мероприятими! </p></h4>
            </div>
        </div>
        </div>
        </div>
</section>
<section className="ant-section__ant047_text_0">
<div className="container">
    <div className="row_l justify-content-center mb-30-none">
        <div className="col-lg-6">
            <div className="service-content mt-60 mb-30 yobject-marked">
            <h1 className="title">Найди компанию по интересам</h1>
                <h4><p>Вы можете выбрать интересующую вас категорию и начать поиск компаний по интересам. </p>
                <p>Вы можете пригласить своих друзей, либо завести новых! </p></h4>
            </div>
        </div>
        <div className="col-lg-6">
            <div className="service-thumb mb-30">
                <img className="img_home" src={people} alt="about"/>
            </div>
        </div>
        </div>
        </div>
        </section>
        <section className="ant-section__ant047_text_1">
        <div className="container">
        <div className="row_r justify-content-center mb-30-none">
        <div className="col-lg-6">
            <div className="service-thumb mb-30">
                <img className="img_home" src={people} alt="about"/>
            </div>
        </div>
        <div className="col-lg-6">
            <div className="service-content mt-60 mb-30 yobject-marked">
            <h1 className="title">Покупай билеты и получай купоны</h1>
                <h4><p>Наш сайт - это уникальная платформа, которая объединяет людей с общими интересами. 
                    Мы предлагаем удобный и простой способ покупки билетов на различные мероприятия прямо внутри нашего приложения.</p>
                <p>Но это еще не все! Каждый раз, когда вы покупаете билет, вы получаете специальные купоны, 
                    которые можно использовать для получения скидок на будущие покупки! </p></h4>
            </div>
        </div>
        </div>
        </div>
        </section>
        <section className="ant-section__ant047_text_0">
<div className="container">
    <div className="row_l justify-content-center mb-30-none">
        <div className="col-lg-6">
            <div className="service-content mt-60 mb-30 yobject-marked">
            <h1 className="title">Делись своими событиями</h1>
                <h4><p>Легко делиться своими событиями и находить людей с похожими интересами. </p>
                <p>Вы можете создать событие любого типа - от вечеринки до спортивного мероприятия. </p></h4>
            </div>
        </div>
        <div className="col-lg-6">
            <div className="service-thumb mb-30">
                <img className="img_home" src={people} alt="about"/>
            </div>
        </div>
        </div>
        </div>
        </section>
        
</>
    );
}
export default Body;