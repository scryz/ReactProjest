import "../../css/AddEvent.css";
import Navbar from "../navbar/Navbar";
import Footer from "../body/Footer";
import VerifyToken from "../body/VerifyToken";
import { useState } from "react";
import axios from "axios";

const AddEvent = () => {
  const [EventName, setEventName] = useState('');
  const [Description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { isValid, error } = VerifyToken();

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
    <div>
    {isValid ? (
      <>
      <Navbar />
      <div className="container">
        <h2>Добавление мероприятий</h2>
        <div className="text-align">
          <label htmlFor="name"><h5>Придумайте название:</h5></label>
          <input className="inputName" placeholder="Например: Пойдёмте гулять?" type="text" id="name" name="nameEvent"  value={EventName} onChange={(e) => setEventName(e.target.value)} />

          <label htmlFor="description"><h5>Напишите подробное описание:</h5></label>
          <textarea rows="5" name="description" placeholder="Например: Завтра собираюсь прогуляться по парку, кто составит компанию?" value={Description} onChange={(e) => setDescription(e.target.value)} required/>
          </div>

          <h6>{errorMessage && <p>{errorMessage}</p>}</h6>

          <button className="buttonEvent" type="submit" onClick={handleSubmit}>Добавить мероприятие</button>
      </div>
      <Footer />
    </>
    ) : (
      <p>{error}</p>
    )}
  </div>
    
  );
}

export default AddEvent;