import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import Footer from '../body/Footer';
import VerifyToken from "../body/VerifyToken";
import defaultImg from "../../img/avatar.png"
import "../../css/EventDetail.css"
import "../../css/login.css"


const EventDetail = (props) => {

    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [isJoined, setIsJoined] = useState(false);
    const [delite, setDelite] = useState(false);
    const [participants, setParticipants] = useState([]);
    const { isValid, error } = VerifyToken();
    const [ err, setErrorMessage] = useState('');
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.post(`http://localhost:7293/GetEventById?EventId=${id}`);
          setEvent(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching event details: ', error);
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
          console.error("Error fetching user:", error);
        }
      };

      fetchParticipants();
    }, [id]);
  
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
          console.error('Failed to join event:', response.statusText);
          setErrorMessage('Произошла ошибка при присоединении к мероприятию. Пожалуйста, повторите попытку позже.');
        }
      } catch (err) {
        if (err.response.status === 401) {
          setErrorMessage('Вы не авторизованы! Пожалуйста, войдите в аккаунт.');
        } else {
          setErrorMessage('Вы уже присоединились к мероприятию!');
        }
      }
    };

          
  return (
    <div>
      <>
<Navbar />
{isLoading ? (
        <h2 className='loading'>Загрузка мероприятия, немного подождите ...</h2>
        ) : (
      <div>
<div className="cardEvent">
<div className="containerEvent">
<div className="circle">
    <img src="https://sun9-77.userapi.com/impg/hOzKxV4E-EzCsL_9x_EodSfQsAjZCqUjrRdHCA/8MPpyb-Y0ZY.jpg?size=972x2160&quality=95&sign=0a2c08de5862fb032bd95b6ba184e88f&type=album" about='imgPart' alt=''/>
  </div>
  <div className="descriptionEvent">
    <h2>{event.eventName}</h2>
    <h6>26.08.2024 12:00</h6>
    <p><h5>{event.description}</h5></p>
    <h6>{err && <p>{err}</p>}</h6>
    {!isJoined ? (
                  <Link className='btnh' onClick={joinEvent}>Я согласен!</Link>
                ) : (
                  <p>Вы успешно присоединились!</p>
                )}
          <Link className="btnh" to="/chat">Чат</Link>
    <section class="overflow-x">
  <div class="horizontal-friends-list" >
    {participants.map((participant, index) => (
    <figure className='friend-item' key={index}>
      <picture>
        <img src={defaultImg}/>
      </picture>
      <figcaption>{participant.name}</figcaption>
    </figure>

))}
</div>
  </section>
    </div>
  </div>
  </div>
  </div>
)}
    <Footer />
    </>
  </div>
  );
}

export default EventDetail;