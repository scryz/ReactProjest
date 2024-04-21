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
                <div class="controls">
                  <input type="text" class="floatLabel" id="name" name="nameEvent" value={EventName} onChange={(e) => setEventName(e.target.value)} />
                  <label for="name">Название</label>
                </div>
                <div class="controls">
                  <input type="text" id="email" class="floatLabel" name="email" />
                  <label for="email">Email</label>
                </div>
                <div class="controls">
                  <input type="tel" id="phone" class="floatLabel" name="phone" />
                  <label for="phone">Phone</label>
                </div>
                <div class="grid">
                  <div class="col-2-3">
                    <div class="controls">
                      <input type="text" id="street" class="floatLabel" name="street" />
                      <label for="street">Street</label>
                    </div>
                  </div>
                  <div class="col-1-3">
                    <div class="controls">
                      <input type="number" id="street-number" class="floatLabel" name="street-number" />
                      <label for="street-number">Number</label>
                    </div>
                  </div>
                </div>
                <div class="grid">
                  <div class="col-2-3">
                    <div class="controls">
                      <input type="text" id="city" class="floatLabel" name="city" />
                      <label for="city">Город</label>
                    </div>
                  </div>
                  <div class="col-1-3">
                    <div class="controls">
                      <input type="text" id="post-code" class="floatLabel" name="post-code" />
                      <label for="post-code">Post Code</label>
                    </div>
                  </div>
                </div>
                <div class="controls">
                  <input type="text" id="country" class="floatLabel" name="country" />
                  <label for="country">Country</label>
                </div>
              </div>

              <div class="form-group">
                <h2 class="heading">Детали</h2>
                <div class="grid">
                  <div class="col-1-4 col-1-4-sm">
                    <div class="controls">
                      <input type="date" id="arrive" class="floatLabel" name="arrive" value="<?php echo date('Y-m-d'); ?>" />
                      <label for="arrive" class="label-date"><i class="fa fa-calendar"></i>&nbsp;&nbsp;Начало</label>
                    </div>
                  </div>
                  <div class="col-1-4 col-1-4-sm">
                    <div class="controls">
                      <input type="date" id="depart" class="floatLabel" name="depart" value="<?php echo date('Y-m-d'); ?>" />
                      <label for="depart" class="label-date"><i class="fa fa-calendar"></i>&nbsp;&nbsp;Окончание</label>
                    </div>
                  </div>
                </div>
                <div class="grid">
                  <div class="col-1-3 col-1-3-sm">
                    <div class="controls">
                      <i class="fa fa-sort"></i>
                      <select class="floatLabel">
                        <option value="blank"></option>
                        <option value="1">1</option>
                        <option value="2" selected>2</option>
                        <option value="3">3</option>
                      </select>
                      <label for="fruit"><i class="fa fa-male"></i>&nbsp;&nbsp;People</label>
                    </div>
                  </div>
                  <div class="col-1-3 col-1-3-sm">
                    <div class="controls">
                      <i class="fa fa-sort"></i>
                      <select class="floatLabel">
                        <option value="blank"></option>
                        <option value="deluxe" selected>With Bathroom</option>
                        <option value="Zuri-zimmer">Without Bathroom</option>
                      </select>
                      <label for="fruit">Room</label>
                    </div>
                  </div>

                  <div class="col-1-3 col-1-3-sm">
                    <div class="controls">
                      <i class="fa fa-sort"></i>
                      <select class="floatLabel">
                        <option value="blank"></option>
                        <option value="single-bed">Zweibett</option>
                        <option value="double-bed" selected>Doppelbett</option>
                      </select>
                      <label for="fruit">Bedding</label>
                    </div>
                  </div>

                </div>
                <div class="grid">
                  <br />
                  <div class="controls">
                    <textarea name="description" value={Description} onChange={(e) => setDescription(e.target.value)} required class="floatLabel" id="comments"></textarea>
                    <label for="comments">Описание</label>
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