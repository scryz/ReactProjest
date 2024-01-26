import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import Footer from '../body/Footer';

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

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
        
          if (!event) {
            return <div>Loading event details...</div>;
          }
  return (
    <>
<Navbar />


    <div>
      <h1>{event.eventName}</h1>
      <p>{event.description}</p>
    </div>

    <Footer />
    </>
  );
}

export default EventDetail;