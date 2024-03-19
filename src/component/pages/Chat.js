import React, { useState, useEffect, useRef} from 'react';
import "../../css/Char.css";
import Navbar from '../navbar/Navbar';
import Footer from '../body/Footer';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import { Link } from 'react-router-dom';
import { RenameChat } from './CRUDchat';
import { CreateChat } from './CRUDchat';
import { DeleteChat } from './CRUDchat';
import { DeleteMessage } from './CRUDchat';
import signalRService from '../SignalRService';
import Smile1 from '../../img/emoji1.png'
import Smile2 from '../../img/emoji2.png'
import Smile3 from '../../img/emoji3.png'
import Smile4 from '../../img/emoji4.png'
import Smile5 from '../../img/emoji5.png'
import Smile6 from '../../img/emoji6.png'
import Smile7 from '../../img/emoji7.png'

import { useSignalR } from '../SignalRContext'; // Импортируем useSignalR из вашего файла SignalRContext.js






const Chat = () => {

    const signalRS = useSignalR(); // Получаем экземпляр SignalRService с помощью useSignalR
    const [isLoading, setIsLoading] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalRename, setShowModalRename] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalDeleteMessage, setShowModalDeleteMessage] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);
    const [isVisibleUser, setIsVisibleUser] = useState(false);
    const [isVisibleRooms, setIsVisibleRooms] = useState(true);

    const handleShowModalCreate = () => setShowModalCreate(true);
    const handleShowModalRename = () => setShowModalRename(true);
    const handleShowModalDelete = () => setShowModalDelete(true);
    const handleShowModalDeleteMessage = () => setShowModalDeleteMessage(true);

    const handleCloseModalCreate = () => setShowModalCreate(false);
    const handleCloseModalRename = () => setShowModalRename(false);
    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleCloseModalDeleteMessage = () => setShowModalDeleteMessage(false);


    const [room, setRooms] = useState([]);
    

    const [name, setName] = useState('');
    const [id, setId] = useState(null);
    const [idMess, setIdMess] = useState(null);

    const [messRoom, setMessRoom] = useState([]);
    const socketRef = socketIOClient("http://localhost:3000/");
    const [isFetched, setIsFetched] = useState(false);

    const formatDate = (date) => {
        const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        return formattedDate;
      };

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:7293/api/Rooms', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching events: ', error);
    }
  };

fetchData();
}, []);


useEffect(() => {
    const fetchMessRoom = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:7293/api/Messages/Room/${id}?RoomId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessRoom(response.data);
   
        console.log("Join be invoked");
        signalRS.join("RoomName"); // Замените "RoomName" на имя комнаты, в которую вы хотите присоединиться
        console.log("Join be invoked");

      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchMessRoom();
}, [id]);

const onChatClick = async (id) => {
    setId(id);
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:7293/api/Rooms/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the auth state as a bearer token
            },
          });
        const data = response.data;
        setName(data.name);
        
        console.log(data.name);
    } catch (error) {
        console.error('Error fetching chat details: ', error);
    }
}

const onMessClick = async (idMess) => {
    setIdMess(id);
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:7293/api/Messages/${idMess}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the auth state as a bearer token
            },
          });
        const data = response.data;
        setIdMess();
        
        console.log(data.name);
    } catch (error) {
        console.error('Error fetching chat details: ', error);
    }
}



const [content, setContent] = useState('');

  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:7293/api/Messages', {
          content: content,
          timestamp: new Date(),
          fromUserNameId: 'Bob',
          fromFullName: 'MegaBob222',
          roomId: id,
          avatar: 'https://w.forfun.com/fetch/5d/5d572d697e41c82ac511549420ebcf44.jpeg?w=1470&r=0.5625'
      }, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the auth state as a bearer token
          }
        });

        setContent('');
      } catch (error) {
        console.error('Error:', error);
      }
      
      signalRService.startConnection(); // Вызов метода при открытии модального окна
    };


    const handleShowEmojis = () => {
        setShowEmojis(!showEmojis);
      };

      const handleButtonClickUser = () => {
        setIsVisibleUser(!isVisibleUser);
      };

      const handleButtonClickRooms = () => {
        setIsVisibleRooms(!isVisibleRooms);
      };


    return(
<>
<Navbar />
{isLoading ? (
            <div>
<div className="d-flex flex-column justify-content-center align-items-center vh-100">
    <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Загрузка...</span>
    </div>
</div>
</div>
) : (
<div className="app">
    <div className="sidebar">
        <div className="header">
            <h5>Ваши чаты</h5>
            <div className="actions">

                <a role="button" id="create-room" onClick={handleShowModalCreate}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </a>
                <CreateChat showModalCreate={showModalCreate} closeModalCreate={handleCloseModalCreate} />
                <a role="button" className="ms-3" onClick={handleButtonClickUser}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </a>
                <a role="button" onClick={handleButtonClickRooms}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </a>
            </div>
        </div>
        {isVisibleRooms && (
        <ul className="rooms list-unstyled" >
        {room.map((room, id) => (
            <li key={id} onClick={handleButtonClickRooms}>
                <Link onClick={() => onChatClick(room.id)}>{room.name}</Link>
            </li>
            ))}
        </ul>
        )}
    </div>
    <div className="main-content">
        <div className="header">
            <h5 id="joinedRoom">{name}</h5>
            <div className="room-actions">
                <button type="button" className="btn btn-link text-secondary px-1" onClick={handleShowModalRename}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                </button>
                <RenameChat showModalRename={showModalRename} closeModalRename={handleCloseModalRename} id={id}/>
                <button type="button" className="btn btn-link text-secondary px-1" onClick={handleShowModalDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <DeleteChat showModalDelete={showModalDelete} closeModalDelete={handleCloseModalDelete} id={id}/>
            </div>
        </div>
        <div className="messages-container position-relative">
            <div className="no-messages-info" /*проверка на наличие сообщений*/></div>
            
            <ul className="list-unstyled">
    {messRoom.map((message, idMess) => (
            <li key={idMess}>
                
                <li>
                    <div className="message-item">
                        <span className="avatar avatar-lg mx-2 text-uppercase">А</span>
                        
                        <div className="message-content">
                                <div className="message-info d-flex flex-wrap align-items-center">
                                <span className="author">{message.fromFullName}</span>
                                <span className="timestamp">{formatDate(new Date(message.timestamp))}</span>
                            </div>
                            <div className="content" message={message.content}>{message.content}</div>
                        </div>
                        <div className="actions">
                            <div className="dropdown dropstart">
                                <a className="text-secondary" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleShowModalDeleteMessage}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                </a>
                                <DeleteMessage showModalDeleteMessage={showModalDeleteMessage} closeModalDeleteMessage={handleCloseModalDeleteMessage} idMess={idMess} onClick={() => onMessClick(message.idMess)}/>
                            </div>
                        </div>
                    </div>
                </li>
            </li>
            ))}
            </ul>

        </div>
        <div className="message-input-container">
            <textarea className='message-input-container input' type="text" maxLength="500" placeholder="Напишите сообщение..." value={content} onChange={(e) => setContent(e.target.value)} />
            <div className="actions d-flex align-items-center">
                <div asp-action="Upload" asp-controller="Upload" encType="multipart/form-data" id="uploadForm">
                    <label htmlFor="UploadedFile" className="custom-file-upload">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </label>
                    <input type="hidden" name="RoomId" />
                    <input type="file" id="UploadedFile" name="File" accept=".jpg,.jpeg,.png" data-bind="event: {change: uploadFiles}"/>
                </div>
                <a role="button" onClick={handleShowEmojis}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-smile"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                </a>
                <a role="button" id="btn-send-message" data-bind="click: sendNewMessage" type='submit' onClick={handleSubmit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </a>
            </div>
            {showEmojis && (
            <div className="emojis-container">
                <button>
                    <img src={Smile1} />
                </button>
                <button>
                    <img src={Smile2} />
                </button>
                <button>
                    <img src={Smile3} />
                </button>
                <button>
                    <img src={Smile4} />
                </button>
                <button>
                    <img src={Smile5} />
                </button>
                <button>
                    <img src={Smile6} />
                </button>
                <button>
                    <img src={Smile7} />
                </button>
            </div>
            )}
        </div>
    </div>
    {isVisibleUser && (
    <div className="users-container">
        <div className="header">
            <h5>Участники (<span>0</span>)</h5>
        </div>
        <ul className="list-unstyled flex-grow-1" id="users-list">
        {messRoom.map((message) => (
            <li>
                <div className="user">
                    <span className="avatar me-2 text-uppercase">А</span>
                    <div className="user-info">
                        <span className="name">{message.fromFullName}</span>
                        <span className="device">Телефон</span>
                    </div>
                </div>
            </li>
            ))}
        </ul>
        <div className="position-relative search-container text-secondary">
            <input type="text" className="" placeholder="Поиск"/>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    </div>
     )}
</div>

)}

<Footer />
</>

);
}
export default Chat;