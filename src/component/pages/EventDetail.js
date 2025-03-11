import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import Footer from '../body/Footer';
import VerifyToken from "../body/VerifyToken";
import defaultImg from "../../img/avatar.png";
import "../../css/EventDetail.css";
import "../../css/login.css";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [participants, setParticipants] = useState([]);
  const { isValid, error } = VerifyToken();
  const [err, setErrorMessage] = useState('');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(`http://localhost:7293/GetEventById?EventId=${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`http://localhost:7293/GetParticipants/${id}`);
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const joinEvent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:7293/ADDPatricipant?eventId=${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setIsJoined(true);
        setErrorMessage('');
      } else {
        setErrorMessage('Ошибка присоединения. Пожалуйста, попробуйте позже.');
      }
    } catch (err) {
      if (err.response.status === 401) {
        setErrorMessage('Вы неавторизованы! Пожалуйста, авторизуйтесь.');
      } else {
        setErrorMessage('Вы уже присоединились к этому мероприятию!');
      }
    }
  };

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <h2 className='loading'>Загрузка мероприятия, немного подождите...</h2>
      ) : (
        <div className="cardEvent">
          <div className="containerEvent">
            <div className="circle">
              <img src="https://sun9-77.userapi.com/impg/hOzKxV4E-EzCsL_9x_EodSfQsAjZCqUjrRdHCA/8MPpyb-Y0ZY.jpg?size=972x2160&quality=95&sign=0a2c08de5862fb032bd95b6ba184e88f&type=album" alt="Event Image" />
            </div>
            <div className="descriptionEvent">
              <h2>{event.eventName}</h2>
              <h6>26.08.2024 12:00</h6>
              <p><h5>{event.description}</h5></p>
              {err && <p className="error-message">{err}</p>}
              {!isJoined ? (
                <button className='btnh' onClick={joinEvent}>Я согласен!</button>
              ) : (
                <p>Вы успешно присоединились!</p>
              )}
              <Link className="btnh" to="/chat">Войти в чат</Link>
              <div>Участники:</div>
              <section className="overflow-x">
                <div className="horizontal-friends-list">
                  {participants.map((participant, index) => (
                    <figure className='friend-item' key={index}>
                      <picture>
                        <img src={defaultImg} alt={participant.name} />
                      </picture>
                      <figcaption>{participant.name}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default EventDetail;