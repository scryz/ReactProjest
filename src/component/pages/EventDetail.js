import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import Footer from '../body/Footer';
import VerifyToken from "../body/VerifyToken";
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

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(`http://localhost:7293/GetEventById?EventId=${id}`);
          setEvent(response.data);
        } catch (error) {
          console.error('Error fetching event details: ', error);
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
        } 
        else {
          console.error('Failed to join event.');
        }
      } catch (err) {
        setErrorMessage('Вы уже присоединились к данному мероприятию!');
      }
    };

    const handleDeleteEvent = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`http://localhost:7293/DeleteEvent?EventId=${id}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      setDelite(true);
      window.history.back();
    } 
    else {
      setErrorMessage('Ошибка, вы не создатель мероприятия!');
    }
  } catch (err) {
    setErrorMessage('Ошибка, вы не создатель мероприятия!');
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
<button onClick={() => handleDeleteEvent(props.eventId)}>Удалить мероприятие</button>
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
    <div className='row box-shadow'>
    {participants.map((participant, index) => (
    
  <li key={index}>{participant.name}</li>
))}
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