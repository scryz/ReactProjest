import index from "../../img/index_walk.png";
import banner from "../../img/banner-left.png";
import "./Body.css"
import SurveyList from "../../SurveyList";

const Body = ({ newsList = [] }) => {  // убедитесь, что вы передаете newsList как свойство компонента!
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
                <SurveyList />
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