import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../navbar/Navbar";
import { Link } from 'react-router-dom';
import Footer from "../body/Footer";
import "../../css/Events.css"
import defaultImg from '../../img/avatar.png';
import calendar from '../../img/calendar.png';
import view_icon from '../../img/view.png'
import comment_icon from '../../img/comment.png'
import like_icon from '../../img/like.png'


const Events = () => {

  const [page, setPage] = useState(1);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState('');
  const [avatar, setAvatar] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [views, setViews] = useState(0);
  const [comment, setComment] = useState(0);
  const [like, setLike] = useState(0);


  const eventsPerPage = 12;
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const startIndex = (page - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = events.slice(startIndex, endIndex).reverse();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:7293/GetTwelveEvents');
        setEvents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching events: ', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  function Text({text, id}) {
   const words = text.split(' ');
    if (words.length > 30){
       return <p>{words.slice(0, 30).join(' ')} <Link to={`/event/${id}`}>ещё</Link></p>;
    }
    else{
       return text;
    }
   }


  return (
    <>
      <Navbar />
      {isLoading ? (
        <h2 className='loading'>Загрузка мероприятий, немного подождите ...</h2>
        ) : (
      <div>
      <div className="container">
        <h1>Мероприятия</h1>
      </div>
      <div className="container">
  <div className="row row-margin-bottom">
    {currentEvents.map((event, id) => (
      <div className="lib-panel-wrapper" key={id}>
        <div className="lib-panel">
          <div className="box-shadow">
            <div className="circle">
              {avatar ? (
                <img src={avatar} alt="Avatar" />
              ) : (
                <img src={defaultImg} alt="Default Avatar" />
              )}
            </div>
            <div className="lib-panel-content">
              <div className="lib-row lib-header">
                <Link to={`/event/${event.id}`}>
                  <h4>{event.eventName}</h4>
                </Link>
                <div className="lib-header-seperator"></div>
              </div>
              <div className="lib-row lib-desc">
                <span className="glyphicon" aria-hidden="true">
                  <img className="icon" src={calendar} />
                  26.08.2003
                </span>

                <h5 className="H5_center">
                  <Text text={event.description} id={event.id} />
                </h5>
              </div>
              <div className="icon_position">
                <p>
                  <span className="glyphicon" aria-hidden="true">
                    <img className="icon" src={view_icon} />
                  </span>
                  {views} |
                  <span className=" glyphicon" aria-hidden="true">
                    <img className="icon" src={comment_icon} />
                  </span>
                  {comment} |
                  <span className="glyphicon" aria-hidden="true">
                    <img className="icon" src={like_icon} />
                  </span>
                  {like} |
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

<div className="container_pagin">
      <div className="pagination p1">
        <ul>
          <li>
            <Link to={`/events/${page === 1 ? 1 : page - 1}`} onClick={() => handlePageChange(page === 1 ? 1 : page - 1)}>
              &lt;
            </Link>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <li key={pageNumber}>
              <Link to={`/events/${pageNumber}`} onClick={() => handlePageChange(pageNumber)} className={pageNumber === page ? 'is-active' : ''}>
                {pageNumber}
              </Link>
            </li>
          ))}
          <li>
            <Link to={`/events/${page === totalPages ? totalPages : page + 1}`} onClick={() => handlePageChange(page === totalPages ? totalPages : page + 1)}>
              &gt;
            </Link>
          </li>
        </ul>
      </div>
    </div>
</div>
)}
      <Footer />
      </>
    );
}

export default Events;