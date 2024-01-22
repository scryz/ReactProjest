import "../../css/AddEvent.css";
import Navbar from "../navbar/Navbar";
import Footer from "../body/Footer";
import { useState } from "react";
import axios from "axios";

const AddEvent = () => {
  const [EventName, setEventName] = useState('');
  const [Description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {

    const url = "https://localhost:7293/AddEvent?EventName="+EventName+"&Description="+Description;

    try {
      const token = localStorage.getItem('token');
    const response = await axios.post(url, {
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setErrorMessage('Мероприяте создано!');
    window.location.href="/events";
    
    } catch (err) {
      setErrorMessage('Ошибка при создании мероприятия, заполните все поля ввода!');
    }
  };
  


  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Добавление мероприятий</h1>
          <label htmlFor="name">Название:</label>
          <input type="text" id="name" name="name"  value={EventName} onChange={(e) => setEventName(e.target.value)} />

          <label htmlFor="description">Подробное описание:</label>
          <textarea name="description"  value={Description} onChange={(e) => setDescription(e.target.value)} required/>

          {errorMessage && <p>{errorMessage}</p>}

          <button type="submit" onClick={handleSubmit}>Добавить мероприятие</button>
      </div>
      <Footer />
    </>
  );
}

export default AddEvent;