import "../../css/AddEvent.css";
import Navbar from "../navbar/Navbar";
import Footer from "../body/Footer";
import VerifyToken from "../body/VerifyToken";
import { useState } from "react";
import axios from "axios";
import jQuery from "jquery";
import { Modal } from "react-bootstrap";

const AddEvent = ({ showModalAddEvent, closeModalAddEvent }) => {

  (function ($) {
    function floatLabel(inputType) {
      $(inputType).each(function () {
        var $this = $(this);
        // on focus add cladd active to label
        $this.focus(function () {
          $this.next().addClass("active");
        });
        //on blur check field and remove class if needed
        $this.blur(function () {
          if ($this.val() === '' || $this.val() === 'blank') {
            $this.next().removeClass();
          }
        });
      });
    }
    // just add a class of "floatLabel to the input field!"
    floatLabel(".floatLabel");
  })(jQuery);



  const [EventName, setEventName] = useState('');
  const [Description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { isValid, error } = VerifyToken();

  const handleSubmit = async (e) => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:7293/AddEvent?EventName=${EventName}&Description=${Description}`, {
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setErrorMessage('Мероприяте создано!');
      window.location.href = "/events/1";

    } catch (err) {
      setErrorMessage('Ошибка при создании мероприятия, заполните все поля ввода!');
    }
  };



  return (
    <div>
      {isValid ? (
        <Modal show={showModalAddEvent} onHide={closeModalAddEvent}>
          <Modal.Body>
            <>
              <div class="form-group">
                <span className="close_btn heavy" onClick={closeModalAddEvent}></span>
                <h2 class="heading">Добавить событие</h2>
                <div>
                  <div for="name">Название</div>
                  <input type="text" id="name" name="nameEvent" value={EventName} onChange={(e) => setEventName(e.target.value)} />
                </div>
                <div class="grid">
                  <div class="col-1-3">
                    <div>
                      <div for="street-number">Количество участников</div>
                      <input type="number" id="street-number" name="street-number" />
                    </div>
                  </div>
                </div>
                <div class="grid">
                  <div class="col-2-3">
                    <div>
                      <div for="city">Место</div>
                      <input type="text" id="city" name="city" />
                    </div>
                  </div>
                  <div class="col-1-3">
                    <div>
                      <div for="post-code">Теги</div>
                      <input type="text" id="post-code" name="post-code" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <h2 class="heading">Детали</h2>
                <div class="grid">
                  <div class="col-1-4 col-1-4-sm">
                    <div>
                      <div for="arrive" class="label-date"><i class="fa fa-calendar"></i>&nbsp;&nbsp;Начало</div>
                      <input type="date" id="arrive" />
                    </div>
                  </div>
                  <div class="col-1-4 col-1-4-sm">
                    <div>
                      <div for="arrive" class="label-date"><i class="fa fa-calendar"></i>&nbsp;&nbsp;Окончание</div>
                      <input type="date" id="arrive" />
                    </div>
                  </div>
                </div>
                <div class="grid">
                  <div>
                    <div for="comments">Описание</div>
                    <textarea name="description" value={Description} onChange={(e) => setDescription(e.target.value)} required class="floatLabel" id="comments"></textarea>
                  </div>
                  <h6>{errorMessage && <p>{errorMessage}</p>}</h6>
                  <button className="buttonEvent button_addevent" type="submit" onClick={handleSubmit}>Добавить мероприятие</button>
                </div>
              </div>
            </>
          </Modal.Body>
        </Modal>

      ) : (
        <p>{error}</p>
      )}
    </div>

  );
}

export default AddEvent;