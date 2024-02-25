import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../navbar/Navbar";
import { Link } from 'react-router-dom';
import Footer from "../body/Footer";
import "../../css/Events.css"
import VerifyToken from "../body/VerifyToken";
const Events = () => {

  const [events, setEvents] = useState([]);
  const { isValid, error } = VerifyToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://95.163.241.39:5000/GetTwelveEvents');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };

    fetchData();
  }, []);




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
      <div>
        <>
      <Navbar />
      <div className="container">
        <h1>Мероприятия</h1>
      </div>
      <div className="container">
        <div className="row row-margin-bottom">
          {events.map((event, id) => (
            <div className="col-md-6" key={id}>
              <div className="lib-panel">
                <div className="row box-shadow">
                  <div className="circle">
                    <img src="https://sun9-77.userapi.com/impg/hOzKxV4E-EzCsL_9x_EodSfQsAjZCqUjrRdHCA/8MPpyb-Y0ZY.jpg?size=972x2160&quality=95&sign=0a2c08de5862fb032bd95b6ba184e88f&type=album" alt="about" />
                  </div>
                  <div className="col-md-6">
                  <div className="lib-row lib-header">
                      <Link to={`/event/${event.id}`}><h4>{event.eventName}</h4></Link>
                      <div className="lib-header-seperator"></div>
                    </div>
                    <div className="lib-row lib-desc">
                      <span className="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                      
                      <h6><Text text={event.description} id={event.id}/></h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      </>
    </div>
    );
}

export default Events;