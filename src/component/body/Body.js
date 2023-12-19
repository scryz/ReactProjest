import index from "../../img/index_walk.png";
import banner from "../../img/banner-left.png";
import "./Body.css"
import SurveyList from "../../SurveyList";
import { jwtDecode } from 'jwt-decode';

const Body = ({ newsList = [] }) => { 
const access_token = localStorage.getItem('access_token');
if (access_token) {
 try {
    const decoded = jwtDecode(access_token);
 } catch (error) {
    console.error('Failed to decode token:', error);
 }
}
else {
  console.log("Токен не найден")
}

    return(
        <div className="body">
            <section className="section">
                <div className="intro">
                <div className="container">
                    <div className="container_image">
                    <div className="container_image_left">
                        <img src={banner} alt="" />
                        <div className="text_banner">
                        <div className="container_text">
                            GetGether - <br /> сайт для поиска компаний в вашем городе.
                        </div>
                        </div>
                    </div>
                    <div className="container_image_right">
                        <img src={index} alt="" />
                    </div>
                    </div>
                    <div className="container">
                    </div>
                    {access_token ? (
                <SurveyList />
                ):( <div>Скорее авторизуйся,
                    чтобы увидеть ленту! </div>)
                }
                </div>
                </div>
            </section>
            <section className="section_1">
                <div className="intro">
                <div className="container">{/* Здесь может быть ваше содержимое */}</div>
                </div>
            </section>
        </div>
    );
}
export default Body;