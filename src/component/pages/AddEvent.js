import "../../css/AddEvent.css";
import VerifyToken from "../body/VerifyToken";
import { useState } from "react";
import axios from "axios";
import jQuery from "jquery";
import { Modal } from "react-bootstrap";

const AddEvent = ({ showModalAddEvent, closeModalAddEvent }) => {
  const [EventName, setEventName] = useState('');
  const [Description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isValid, error } = VerifyToken();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EventName || !Description) {
      setErrorMessage('Пожалуйста, заполните все поля.');
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:7293/AddEvent?EventName=${EventName}&Description=${Description}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setErrorMessage('Мероприятие создано!');
      window.location.href = "/events/1";
    } catch (err) {
      setErrorMessage('Ошибка при создании мероприятия, заполните все поля ввода!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isValid ? (
        <Modal show={showModalAddEvent} onHide={closeModalAddEvent}>
          <Modal.Body>
            <>
              <div className="form-group">
                <span className="close_btn heavy" onClick={closeModalAddEvent}></span>
                <h2 className="heading">Добавить событие</h2>
                <div>
                  <div htmlFor="name">Название</div>
                  <input type="text" id="name" name="nameEvent" value={EventName} onChange={(e) => setEventName(e.target.value)} required />
                </div>
                <div className="grid">
                  <div className="col-1-3">
                    <div>
                      <div htmlFor="street-number">Количество участников</div>
                      <input type="number" id="street-number" name="street-number" required />
                    </div>
                  </div>
                </div>
                <div className="grid">
                  <div className="col-2-3">
                    <div>
                      <div htmlFor="city">Место</div>
                      <input type="text" id="city" name="city" required />
                    </div>
                  </div>
                  <div className="col-1-3">
                    <div>
                      <div htmlFor="post-code">Теги</div>
                      <input type="text" id="post-code" name="post-code" required />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <h2 className="heading">Детали</h2>
                <div className="grid">
                  <div className="col-1-4 col-1-4-sm">
                    <div>
                      <div htmlFor="arrive" className="label-date"><i className="fa fa-calendar"></i>&nbsp;&nbsp;Начало</div>
                      <input type="date" id="arrive" required />
                    </div>
                  </div>
                  <div className="col-1-4 col-1-4-sm">
                    <div>
                      <div htmlFor="arrive" className="label-date"><i className="fa fa-calendar"></i>&nbsp;&nbsp;Окончание</div>
                      <input type="date" id="arrive" required />
                    </div>
                  </div>
                </div>
                <div className="grid">
                  <div>
                    <div htmlFor="comments">Описание</div>
                    <textarea name="description" value={Description} onChange={(e) => setDescription(e.target.value)} required className="floatLabel" id="comments"></textarea>
                  </div>
                  <h5>{errorMessage && <p className="error-message">{errorMessage}</p>}</h5>
                  <button className="buttonEvent button_addevent" type="submit" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? <div className="loader"></div> : 'Добавить мероприятие'}
                  </button>
                </div>
              </div>
            </>
          </Modal.Body>
        </Modal>
      ) : (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
}

export default AddEvent;