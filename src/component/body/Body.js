import people from "../../img/team_sec_bg.png";
import banner from "../../img/banner-left.png";
import "../../css/Body.css"
import SurveyList from "../profile/SurveyList";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Reg from '../pages/Reg';
import Popup from "reactjs-popup";

const Body = ({ newsList = [] }) => { 


const access_token = localStorage.getItem('access_token');


if (access_token) {
 try {
    const decoded = jwtDecode(access_token);
    const username = decoded.email;
    localStorage.setItem('username', username);
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
                                        <p>Создай ивент<br /> Или присоединись к уже созданному!</p>
                                    </div>
                                    {access_token ? (
                                        <a className="btn popup-btn xx-large rounded colorful hover-colorful-darken" href="#" title="Зарегистрироватьсяы">
                                        Создать мероприятие</a>
                                        ):
                                        (
                                        <Popup trigger = {<a className="btn popup-btn xx-large rounded colorful hover-colorful-darken" href="#" title="Зарегистрироватьсяы">
                                        Зарегистрироваться </a>} modal nested>
                                            {
                                                close => (
                                                    <Reg></Reg>
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
                <img className="img_home" src={people} alt="about image"/>
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
                <img className="img_home" src={people} alt="about image"/>
            </div>
        </div>
        <div className="col-lg-6">
            <div className="service-content mt-60 mb-30 yobject-marked">
                <h3 className="title">Разработка сайтов &amp; Web Development</h3>
                <p>Взаимодействие корпорации и клиента, следовательно, упорядочивает потребительский маркетинг, опираясь на опыт западных коллег. </p>
                <p>Воздействие на потребителя создает клиентский спрос, повышая конкуренцию. Выставочный стенд, пренебрегая деталями, категорически специфицирует ролевой рекламный блок. </p>
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
                <h3 className="title">Графический дизайн &amp; UI/UX Design</h3>
                <p>Взаимодействие корпорации и клиента, следовательно, упорядочивает потребительский маркетинг, опираясь на опыт западных коллег. </p>
                <p>Воздействие на потребителя создает клиентский спрос, повышая конкуренцию. Выставочный стенд, пренебрегая деталями, категорически специфицирует ролевой рекламный блок. </p>
            </div>
        </div>
        <div className="col-lg-6">
            <div className="service-thumb mb-30">
                <img className="img_home" src={people} alt="about image"/>
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
                <img className="img_home" src={people} alt="about image"/>
            </div>
        </div>
        <div className="col-lg-6">
            <div className="service-content mt-60 mb-30 yobject-marked">
                <h3 className="title">Разработка сайтов &amp; Web Development</h3>
                <p>Взаимодействие корпорации и клиента, следовательно, упорядочивает потребительский маркетинг, опираясь на опыт западных коллег. </p>
                <p>Воздействие на потребителя создает клиентский спрос, повышая конкуренцию. Выставочный стенд, пренебрегая деталями, категорически специфицирует ролевой рекламный блок. </p>
            </div>
        </div>
        </div>
        </div>
</section>
</>
    );
}
export default Body;