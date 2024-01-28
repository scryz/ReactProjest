import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import Footer from '../body/Footer';
import VerifyToken from "../body/VerifyToken";
import "../../css/EventDetail.css"

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [isJoined, setIsJoined] = useState(false);
    const { isValid, error } = VerifyToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`https://localhost:7293/GetEventById?EventId=${id}`);
                setEvent(response.data);
              } catch (error) {
                console.error('Error fetching event details: ', error);
              }
            };
        
            fetchData();
          }, [id]);

          const joinEvent = async () => {
            try {
              const token = localStorage.getItem('token');
              const response = await axios.post(`https://localhost:7293/ADDPatricipant?eventId=${id}`, {}, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            });
        
              if (response.ok) {
                setIsJoined(true);
              } else {
                console.error('Failed to join event.');
              }
            } catch (error) {
              console.error('Error joining event:', error.response.data);
            }
          };
        
          if (!event) {
            return <div>Немного подождите, идёт загрузка мероприятия</div>;
          }
  return (
    <div>
    {isValid ? (
      <>
<Navbar />
<div className="cardEvent">
<div className="containerEvent">
<div className="circle">
    <img src="https://sun9-77.userapi.com/impg/hOzKxV4E-EzCsL_9x_EodSfQsAjZCqUjrRdHCA/8MPpyb-Y0ZY.jpg?size=972x2160&quality=95&sign=0a2c08de5862fb032bd95b6ba184e88f&type=album" about='imgPart' alt=''/>
    <div><h5>Bvz</h5></div>
  </div>
  <p>Bvz</p>
  <div className="descriptionEvent">
    <h2>{event.eventName}</h2>
    <h6>крч, тут дата и время</h6>
    <p><h5>{event.description}</h5></p>
    {!isJoined ? (
                  <button onClick={joinEvent}>Я согласен!</button>
                ) : (
                  <p>Вы уже присоединись!</p>
                )}
    <button>Чат</button>
    <div className='row box-shadow'>
    <h2>тут должны быть фотки участников, но Миша ещё не сделал функционал</h2>
    </div>
  </div>
  </div>
  </div>

    <Footer />
    </>
    ) : (
      <p>{error}</p>
    )}
  </div>
  );
}

export default EventDetail;