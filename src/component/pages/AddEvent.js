import "../../css/AddEvent.css";
import Navbar from "../navbar/Navbar";
import Footer from "../body/Footer";
import { useState } from "react";
import axios from "axios";

const AddEvent = () => {
  const [EventName, setEventName] = useState('');
  const [Description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = "https://localhost:7293/AddEvent?EventName="+EventName+"&Description="+Description;

    try {
      const token = localStorage.getItem('token');
    const response = await axios.post(url, {
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Event added successfully:', response.data);
    } catch (err) {
      console.error('Error adding event:', err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Добавление мероприятий</h1>
        
          <label htmlFor="name">Название:</label>
          <input type="text" id="name" name="name" defaultValue={EventName} onChange={(e) => setEventName(e.target.value)} />

          <label htmlFor="description">Подробное описание:</label>
          <textarea name="description" defaultValue={Description} onChange={(e) => setDescription(e.target.value)} required/>

          <button type="submit" onClick={handleSubmit}>Добавить мероприятие</button>
        
      </div>
      <Footer />
    </>
  );
}

export default AddEvent;