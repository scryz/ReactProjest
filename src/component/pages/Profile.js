




//старый профиль (ДИАКТИВИРОВАТЬ!)

import Navbar from "../navbar/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Profile.css"
import defaultImg from '../../img/avatar.png';
import Footer from "../body/Footer";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import VerifyToken from "../body/VerifyToken";
import $ from 'jquery';
import calendar from '../../img/calendar.png';
import view_icon from '../../img/view.png'
import comment_icon from '../../img/comment.png'
import like_icon from '../../img/like.png'
import edit from '../../img/edit.png';
import trash from '../../img/trash.png';
import { Link } from 'react-router-dom';


const Profile = () => {
  const { isValid, error } = VerifyToken();
  const [id, setId] = useState('');
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState();
  const [uploadResult, setUploadResult] = useState('');
  const [views, setViews] = useState(0);
  const [comment, setComment] = useState(0);
  const [like, setLike] = useState(0);
  const [events, setEvents] = useState([]);
  const [delite, setDelite] = useState(false);

  //кнопка загрузки аватара
  (function () {

    'use strict';

    $('.input-file').each(function () {
      var $input = $(this),
        $label = $input.next('.js-labelFile'),
        labelVal = $label.html();

      $input.on('change', function (element) {
        var fileName = '';
        if (element.target.value) fileName = element.target.value.split('\\').pop();
        fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
      });
    });

  })();



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:7293/GetMyProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7293/GetTwelveEvents');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };

    fetchData();
  }, [user.id]);

  function Text({ text, id }) {
    const words = text.split(' ');
    if (words.length > 30) {
      return <p>{words.slice(0, 30).join(' ')} <Link to={`/event/${id}`}>ещё</Link></p>;
    }
    else {
      return text;
    }
  }

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:7293/api/TestImage/GetImage?link=${user.avatar}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          responseType: 'arraybuffer'
        });
        const base64 = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        setAvatar(`data:${response.headers['content-type'].toLowerCase()};base64,${base64}`);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (user.avatar) {
      fetchAvatar();
    }
  }, [user.avatar]);

  async function uploadFile(file) {
    const formData = new FormData();
    formData.append('uploadedFile', file);

    try {
      const response = await fetch('http://localhost:7293/api/TestImage/AddImage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error during image upload');
      }

      const result = await response.text(); // Изменение здесь
      setUploadResult(result); // Изменение здесь
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  }

  const UserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:7293/UpdateProfile?Name=${name}&Age=${age}&Avatar=${uploadResult}`, {
        name: user.name,
        age: user.age
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log('User profile posted successfully:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error posting user profile:', error.response.data);
    }
  };

  const handleDeleteEvent = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
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
        } else {
          //setErrorMessage('Произошла ошибка при удаления мероприятию. Пожалуйста, повторите попытку позже.');
        }
      } catch (err) {
        if (err.response.status === 401) {
          //setErrorMessage('Вы не авторизованы! Пожалуйста, войдите в аккаунт.');
        } else {
          //setErrorMessage('Ошибка, вы не создатель мероприятия!');
        }
      }
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('token');
    navigate('/');
  }

  return (
    <div>
      {isValid ? (
        <>
          <Navbar />
          <div className="container">
            <div className="row gutters">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="account-settings">
                      <div className="user-profile">
                        <div className="user-avatar">
                          {avatar ? (
                            <img src={avatar} alt="Avatar" />
                          ) : (
                            <img src={defaultImg} alt="Default Avatar" />

                          )}
                          <div>
                            <div className="example-2">
                              <div className="form-group">
                                <input type="file" name="file" id="file" onChange={(event) => uploadFile(event.target.files[0])} className="input-file" />
                                <label for="file" className="btn btn-tertiary js-labelFile">
                                  <span className="js-fileName">Загрузить аватар</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h5 className="user-name">{user.name}</h5>
                        <h6 className="user-email">{user.userName}</h6>
                      </div>
                      <div className="about">
                        <h5>Обо мне:</h5>
                        <p>Всем привет! Меня зовут Ваня, я разработчик. Увлекаюсь футболом, хоккем, по выходным хожу в тренажёрный зал.
                          Люблю видео-гейминг, особенно ТАНКИ!!!!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h4 className="mb-2 text-primary">Персональные данные</h4>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="fullName">Имя:</label>
                          <input type="text" className="form-control" id="fullName" placeholder={user.name} value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="fullName">Ник:</label>
                          <input type="text" className="form-control" id="fullName" placeholder={user.userName} />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="fullName">Возраст:</label>
                          <input type="text" className="form-control" id="fullName" placeholder={user.age} value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="eMail">Email:</label>
                          <input type="email" className="form-control" id="eMail" placeholder="Введите E-mail" />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="phone">Номер телефона:</label>
                          <input type="text" className="form-control" id="phone" placeholder="Введите номер телефона" />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="website">Город:</label>
                          <input type="text" className="form-control" id="cite" placeholder="Введите город" />
                        </div>
                      </div>

                    </div>
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div>

                          <button type="button" id="submit" name="submit" onClick={UserProfile}>Сохранить данные</button>
                          <button onClick={handleLogout}>Выйти</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                      <div className="h-100">

                        <div className="row gutters">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h4 className="mb-2 text-primary">Мои мероприятия</h4>
                          </div>
                          <div className="container">
                            <div className="row row-margin-bottom">
                              {events.map((event, id) => (
                                <div className="col-md-six" key={id}>
                                  <div className="lib-panel">
                                    <div className="row box-shadow">
                                      <div className="col-md-six">
                                        <div className="lib-row lib-header">
                                          <a onClick={handleLogout}>
                                            <img className='icon_myevents' src={edit} />
                                          </a>
                                          <a onClick={handleDeleteEvent}>
                                            <img className='icon_myevents' src={trash} />
                                          </a>
                                          <Link to={`/event/${event.id}`}><h4>{event.eventName}</h4></Link>
                                          <div className="lib-header-seperator"></div>
                                        </div>
                                        <div className="lib-row lib-desc">
                                          <div className="right">
                                            <span className="glyphicon" aria-hidden="true">
                                              <img className='icon' src={calendar} />26.08.2003</span>
                                          </div>
                                          <h5 className='H5_center'><Text text={event.description} id={event.id} /></h5>
                                        </div>
                                        <div className='icon_position'>
                                          <p><span className="glyphicon" aria-hidden="true">
                                            <img className='icon' src={view_icon} /></span> {views} |
                                            <span className=" glyphicon" aria-hidden="true">
                                              <img className='icon' src={comment_icon} /></span> {comment} |
                                            <span className="glyphicon" aria-hidden="true">
                                              <img className='icon' src={like_icon} /></span> {like} |</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
export default Profile;