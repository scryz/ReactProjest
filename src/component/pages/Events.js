import Navbar from "../navbar/Navbar";
import Footer from "../body/Footer";
import "../../css/Events.css"
const Events = () => {

  function Text({text}) {
    const words = text.split(' ');
    if (words.length > 30){
    return <p>{words.slice(0, 30).join(' ')} <a href="/">ещё</a></p>;
    }
    else{
      return text;
    }
  }


    return (
      <>
      <Navbar />
      <div className="container">
      <h1>Мероприятия</h1>
      </div>
      <div className="container">
  <div className="row row-margin-bottom">
    <div className="col-md-6">
      <div className="lib-panel">
        <div className="row box-shadow">
          <div className="col-md-6">
            <img className="lib-img-show" src="https://rileydentalassociates.com/wp-content/uploads/2020/03/Pu0p79x8.jpeg.jpg" />
          </div>
          <div className="col-md-6">
            <div className="lib-row lib-header">
              <a href="/">Италия</a>
              <div className="lib-header-seperator"></div>
            </div>
            <div className="lib-row lib-desc">
              <p><span className="glyphicon glyphicon-calendar" aria-hidden="true"></span> 12.11.2023</p>
              <p><Text text="" /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="lib-panel">
        <div className="row box-shadow">
          <div className="col-md-6">
            <img className="lib-img-show" src="https://fikiwiki.com/uploads/posts/2022-02/1644866886_25-fikiwiki-com-p-selfi-prikolnie-kartinki-29.jpg" />
          </div>
          <div className="col-md-6">
            <div className="lib-row lib-header">
              <a href="/">Днюха</a>
              <div className="lib-header-seperator"></div>
            </div>
            <div className="lib-row lib-desc">
              <p><span className="glyphicon glyphicon-calendar" aria-hidden="true"></span> 10.01.2024</p>
              <p><Text text="Есть предложение, отпразнывать днюху у Локтя в загородном доме, кто за? Все расходы берёт на себя, с вас всего одна подпись в договре." /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="clearfix visible-md-block"></div>
    <div className="col-md-6">
      <div className="lib-panel">
        <div className="row box-shadow">
          <div className="col-md-6">
            <img className="lib-img-show" src="https://i.ytimg.com/vi/VZt6HkKAbPA/maxresdefault.jpg" />
          </div>
          <div className="col-md-6">
            <div className="lib-row lib-header">
              <a href="/">Идущий к реке</a>
              <div className="lib-header-seperator"></div>
            </div>
            <div className="lib-row lib-desc">
              <p><span className="glyphicon glyphicon-calendar" aria-hidden="true"></span> 13.06.2015</p>
              <p><Text text="Я в своем познании настолько преисполнился, что я как будто бы уже

сто триллионов миллиардов лет проживаю на триллионах и

триллионах таких же планет, как эта Земля, мне этот мир абсолютно

понятен, и я здесь ищу только одного - покоя, умиротворения и

вот этой гармонии, от слияния с бесконечно вечным, от созерцания

великого фрактального подобия и от вот этого замечательного всеединства

существа, бесконечно вечного, куда ни посмотри, хоть вглубь - бесконечно

малое, хоть ввысь - бесконечное большое, понимаешь? А ты мне опять со

своим вот этим, иди суетись дальше, это твоё распределение, это

твой путь и твой горизонт познания и ощущения твоей природы, он

несоизмеримо мелок по сравнению с моим, понимаешь? Я как будто бы уже

давно глубокий старец, бессмертный, ну или там уже почти бессмертный,

который на этой планете от её самого зарождения, ещё когда только Солнце

только-только сформировалось как звезда, и вот это газопылевое облако,

вот, после взрыва, Солнца, когда оно вспыхнуло, как звезда, начало

формировать вот эти коацерваты, планеты, понимаешь, я на этой Земле уже

как будто почти пять миллиардов лет живу и знаю её вдоль и поперёк

этот весь мир, а ты мне какие-то... мне не важно на твои тачки, на твои

яхты, на твои квартиры, там, на твоё благо."/></p>
            </div> 
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="lib-panel">
        <div className="row box-shadow">
          <div className="col-md-6">
            <img className="lib-img-show" src="https://cdn.fishki.net/upload/post/2017/09/07/2374872/tn/fe1ad6fae22ee9d9409eaf7c924f22b1.jpg" />
          </div>
          <div className="col-md-6">
            <div className="lib-row lib-header">
              <a href="/">Балли</a>
              <div className="lib-header-seperator"></div>
            </div>
            <div className="lib-row lib-desc">
              <p><span className="glyphicon glyphicon-calendar" aria-hidden="true"></span> 09.01.2024</p>
              <p><Text text="Салам всем, кто хочет полетать на самолёте. Подумаешь, что он пассажирский. Лечу на Балли, с человека 20к, вылет 15.02.2024, за отдельнцю плату можно посетить кабину пилота."/></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      <Footer />
      </>
    );
}

export default Events;