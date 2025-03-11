import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import "../../css/Char.css";
import { Link, useLocation } from 'react-router-dom';
import { useSignalR } from '../SignalRContext';

import Navbar from '../navbar/Navbar';
import { RenameChat, CreateChat, DeleteChat, DeleteMessage } from './CRUDchat';
import signalRService from '../SignalRService';

import Smile1 from '../../img/emoji1.png';
import Smile2 from '../../img/emoji2.png';
import Smile3 from '../../img/emoji3.png';
import Smile4 from '../../img/emoji4.png';
import Smile5 from '../../img/emoji5.png';
import Smile6 from '../../img/emoji6.png';
import Smile7 from '../../img/emoji7.png';
import defaultImg from '../../img/avatar.png';

const API_URL = 'http://localhost:7293';
const SOCKET_URL = 'http://localhost:3000/';
const MESSAGES_PER_PAGE = 20;

const Chat = () => {
  const signalRS = useSignalR();
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalRename, setShowModalRename] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalDeleteMessage, setShowModalDeleteMessage] = useState(false);
  const [isVisibleUser, setIsVisibleUser] = useState(false);
  const [isVisibleRooms, setIsVisibleRooms] = useState(true);
  const [room, setRooms] = useState([]);
  const [name, setName] = useState('');
  const [id, setId] = useState();
  const [idMess, setIdMess] = useState(null);
  const [currentUserName, setCurrentUserName] = useState();
  const [messRoom, setMessRoom] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [user, setUser] = useState('');
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [avatar, setAvatar] = useState();
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(messRoom);
  const messagesEndRef = useRef(null);
  const socketRef = useMemo(() => socketIOClient(SOCKET_URL), []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCarouselActive, setIsCarouselActive] = useState(false);

  const formatDate = useCallback((date) => {
    const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    return formattedDate;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [userResponse, roomsResponse] = await Promise.all([
          axios.get(`${API_URL}/GetMyProfile`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_URL}/api/Rooms`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const user = userResponse.data;
        setUser(user);
        setCurrentUserName(user.userName);
        setRooms(roomsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchMessRoom = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/Messages/Room/${id}?RoomId=${id}&page=${page}&pageSize=${MESSAGES_PER_PAGE}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newMessages = response.data;
      setAllMessages((prevMessages) => [...prevMessages, ...newMessages]);
      setMessRoom((prevMessages) => [...newMessages, ...prevMessages]);
    } catch (error) {
      console.error("Error fetching events: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setAllMessages([]);
      setMessRoom([]);
      fetchMessRoom(1);
    }
  }, [id, fetchMessRoom]);

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottom();
    }
  }, [messRoom]);

  useEffect(() => {
    const handleReceiveMessage = (messRoom) => {
      console.log("Received message:", messRoom);
      setMessRoom((prevMessages) => [...prevMessages, messRoom]);
    };

    signalRService.connection.on("ReceiveMessage", handleReceiveMessage);

    return () => {
      signalRService.connection.off("ReceiveMessage", handleReceiveMessage);
    };
  }, []);

  const onChatClick = useCallback(async (id) => {
    setId(id);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/Rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = response.data;
      setName(data.name);
      signalRS.join(`${id}`);
      console.log("Join be invoked");
    } catch (error) {
      console.error('Error fetching chat details: ', error);
    }
  }, [signalRS]);

  const onMessClick = useCallback(async (idMess) => {
    setIdMess(id);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/Messages/${idMess}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = response.data;
      setIdMess();
      console.log(data.name);
    } catch (error) {
      console.error('Error fetching chat details: ', error);
    }
  }, []);

  const [content, setContent] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/Messages`, {
        content: content,
        timestamp: new Date(),
        fromUserNameId: 'bob',
        fromFullName: 'MegaBob222',
        roomId: id,
        avatar: user.avatar,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setContent('');
      scrollToBottom();
    } catch (error) {
      console.error('Error:', error);
    }
  }, [content, id, user.avatar]);

  const enterHandler = useCallback((event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSubmit(event);
    }
  }, [handleSubmit]);

  const handleShowEmojis = useCallback(() => {
    setIsEmojiPickerVisible(true);
  }, []);

  const handleButtonClickUser = useCallback(() => {
    setIsVisibleUser(!isVisibleUser);
  }, [isVisibleUser]);

  const handleButtonClickRooms = useCallback(() => {
    setIsVisibleRooms(!isVisibleRooms);
    setIsSidebarOpen(!isSidebarOpen);
    window.scrollTo(0, 0);
  }, [isVisibleRooms]);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleEmojiClick = useCallback((emoji) => {
    setSelectedEmoji(emoji);
    setIsEmojiPickerVisible(false);
    setContent((prevContent) => prevContent + emoji);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      setFilteredUsers(messRoom);
      return;
    }
    setFilteredUsers(
      messRoom.filter(
        (user) =>
          user.fromFullName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }, [messRoom]);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (name.length > 16) {
      setIsCarouselActive(true);
    } else {
      setIsCarouselActive(false);
    }
  }, [name]);

  const handleAnimationEnd = (event) => {
    const spanElement = event.target;
    spanElement.style.animation = 'none'; // Останавливаем анимацию
    setTimeout(() => {
      spanElement.style.animation = 'marquee 15s linear'; // Возобновляем анимацию через 20 секунд
    }, 20000);
  };

  return (
    <>
      <Navbar />
      <div className="app">
        <div className="sidebar">
          <div className="header">
            <h5>Ваши чаты</h5>
            <div className="actions">
              <a role="button" id="create-room" onClick={() => setShowModalCreate(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </a>
              <CreateChat showModalCreate={showModalCreate} closeModalCreate={() => setShowModalCreate(false)} />
              <a role="button" onClick={handleButtonClickRooms}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </a>
            </div>
          </div>
          {isVisibleRooms && (
            <ul className="rooms list-unstyled">
              {room.map((room, id) => (
                <li key={id} onClick={handleButtonClickRooms} className='name-rooms marquee'>
                  <Link onClick={() => onChatClick(room.id)}>{room.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {id == null ? (
          <div className="no-messages-info">Как то пустоватенько<p />
            Создай или выбери чат!</div>
        ) : (
          <div className="main-content">
            <div className="header">
              <div className={`horizontal-name-room ${isCarouselActive ? 'marquee' : ''}`}>
                <span onAnimationEnd={handleAnimationEnd}><h5 id="joinedRoom">{name}</h5></span>
                <p className='participants'>Участники: 2</p>
              </div>
              <div className="room-actions">
                <button type="button" className="btn btn-link text-secondary px-1" onClick={handleButtonClickUser}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </button>
                <button type="button" className="btn btn-link text-secondary px-1" onClick={() => setShowModalRename(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                </button>
                <RenameChat showModalRename={showModalRename} closeModalRename={() => setShowModalRename(false)} id={id} />
                <button type="button" className="btn btn-link text-secondary px-1" onClick={() => setShowModalDelete(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <DeleteChat showModalDelete={showModalDelete} closeModalDelete={() => setShowModalDelete(false)} id={id} />
              </div>
            </div>
            <div className="messages-container position-relative" ref={messagesEndRef}>
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : !messRoom.length ? (
                <div className="no-messages-info">Как тут пусто<p />
                  Начни диалог первым!</div>
              ) : (
                <ul className="list-unstyled">
                  {messRoom.map((message, idMess) => (
                    <ul className="list-unstyled" key={idMess}>
                      <li>
                        <div className={`message-item ${message.fromUserNameId === currentUserName ? 'my-message' : 'other-user-message'}`}>
                          {message.fromUserNameId === currentUserName ? (
                            <>
                              <div className="actions">
                                <div className="dropdown dropstart">
                                  <a className="text-secondary" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => setShowModalDeleteMessage(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                  </a>
                                  <DeleteMessage showModalDeleteMessage={showModalDeleteMessage} closeModalDeleteMessage={() => setShowModalDeleteMessage(false)} idMess={idMess} onClick={() => onMessClick(message.idMess)} />
                                </div>
                              </div>
                              <div className="message-content">
                                <div className="message-info d-flex flex-wrap align-items-center">
                                  <span className="author">{message.fromFullName}</span>
                                  <span className="timestamp">{formatDate(new Date(message.timestamp))}</span>
                                  <span className="timestamp"></span>
                                </div>
                                <div className="content" message={message.content}>{message.content}</div>
                              </div>
                              <span className="avatar-lg mx-2 text-uppercase">
                                {avatar ? (
                                  <img className='avatar' src={avatar} alt="Avatar" />
                                ) : (
                                  <img className='avatar' src={defaultImg} alt="Default Avatar" />
                                )}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="avatar-lg mx-2 text-uppercase">
                                {avatar ? (
                                  <img className='avatar' src={avatar} alt="Avatar" />
                                ) : (
                                  <img className='avatar' src={defaultImg} alt="Default Avatar" />
                                )}
                              </span>
                              <div className="message-content">
                                <div className="message-info d-flex flex-wrap align-items-center">
                                  <span className="author">{message.fromFullName}</span>
                                  <span className="timestamp">{formatDate(new Date(message.timestamp))}</span>
                                  <span className="timestamp"></span>
                                </div>
                                <div className="content" message={message.content}>{message.content}</div>
                              </div>
                              <div className="actions">
                                <div className="dropdown dropstart">
                                  <a className="text-secondary" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => setShowModalDeleteMessage(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                  </a>
                                  <DeleteMessage showModalDeleteMessage={showModalDeleteMessage} closeModalDeleteMessage={() => setShowModalDeleteMessage(false)} idMess={idMess} onClick={() => onMessClick(message.idMess)} />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </li>
                    </ul>
                  ))}
                </ul>
              )}
            </div>
            {id != null && (
              <div className="message-input-container">
                <textarea className='message-input-container input' type="text" maxLength="500" placeholder="Напишите сообщение..." onKeyDown={enterHandler} value={content} onChange={(e) => setContent(e.target.value)} />
                <div className="actions d-flex align-items-center">
                  <div asp-action="Upload" asp-controller="Upload" encType="multipart/form-data" id="uploadForm">
                    <label htmlFor="UploadedFile" className="position">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </label>
                    <input type="hidden" name="RoomId" />
                    <input type="file" id="UploadedFile" name="File" accept=".jpg,.jpeg,.png" data-bind="event: {change: uploadFiles}" />
                  </div>
                  <a role="button" onClick={handleShowEmojis}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-smile"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                  </a>
                  <a role="button" id="btn-send-message" data-bind="click: sendNewMessage" type='submit' onClick={handleSubmit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </a>
                </div>
                {isEmojiPickerVisible && (
                  <div className="emojis-container">
                    <button onClick={() => handleEmojiClick('😅')}>
                      <img src={Smile1} alt="😅" />
                    </button>
                    <button onClick={() => handleEmojiClick('🥰')}>
                      <img src={Smile2} alt="🥰" />
                    </button>
                    <button onClick={() => handleEmojiClick('🤔')}>
                      <img src={Smile3} alt="🤔" />
                    </button>
                    <button onClick={() => handleEmojiClick('😠')}>
                      <img src={Smile4} alt="😠" />
                    </button>
                    <button onClick={() => handleEmojiClick('🤣')}>
                      <img src={Smile5} alt="🤣" />
                    </button>
                    <button onClick={() => handleEmojiClick('😴')}>
                      <img src={Smile6} alt="😴" />
                    </button>
                    <button onClick={() => handleEmojiClick('😎')}>
                      <img src={Smile7} alt="😎" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {isVisibleUser && (
          <div className="users-container">
            <div className="header">
              <h5>Участники (<span>{filteredUsers.length}</span>)</h5>
            </div>
            <ul className="list-unstyled flex-grow-1" id="users-list">
              {filteredUsers.map((message) => (
                <li>
                  <div className="user">
                    <span className="avatar me-2 text-uppercase">{message.fromFullName.charAt(0)}</span>
                    <div className="user-info">
                      <span className="name">{message.fromFullName}</span>
                      <span className="device">Телефон</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="position-relative search-container text-secondary">
              <input
                type="text"
                className=""
                placeholder="Поиск"
                value={search}
                onChange={handleSearchChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;