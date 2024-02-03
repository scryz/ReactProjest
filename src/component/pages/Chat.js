import React, { useState, useEffect } from 'react';
import "../../css/Char.css";
import Navbar from '../navbar/Navbar';
import Footer from '../body/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CreateChat } from './CRUDchat';
import { RenameChat } from './CRUDchat';
import { DeleteChat } from './CRUDchat';
import { DeleteMessage } from './CRUDchat'



const Chat = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalRename, setShowModalRename] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalDeleteMessage, setShowModalDeleteMessage] = useState(false);

    const handleShowModalCreate = () => setShowModalCreate(true);
    const handleShowModalRename = () => setShowModalRename(true);
    const handleShowModalDelete = () => setShowModalDelete(true);
    const handleShowModalDeleteMessage = () => setShowModalDeleteMessage(true);

    const handleCloseModalCreate = () => setShowModalCreate(false);
    const handleCloseModalRename = () => setShowModalRename(false);
    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleCloseModalDeleteMessage = () => setShowModalDeleteMessage(false);


    const [rooms, setRooms] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://localhost:7293/api/Rooms', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the auth state as a bearer token
          },
        });
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching events: ', error);
    }
  };

  fetchData();
}, []);



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
<div class="app">
    <div class="sidebar container">
        <div class="header">
            <h5>Ваши чаты</h5>
            <div class="actions">

                <a role="button" id="create-room" data-bs-toggle="modal" data-bs-target="#create-room-modal" onClick={handleShowModalCreate}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </a>
                <CreateChat showModalCreate={showModalCreate} closeModalCreate={handleCloseModalCreate} />
                <a role="button" class="ms-3" id="expand-users-list">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </a>
                <a role="button" id="expand-sidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </a>
            </div>
        </div>
        <ul class="rooms list-unstyled" id="rooms-list" >
        {rooms.map((rooms, id) => (
            <li>
                <a href='#0'>{rooms.name}</a>
            </li>
            ))}
        </ul>
        <div class="profile">
            <div class="d-flex align-items-center flex-grow-1">
            <span class="avatar me-2 text-uppercase">А</span>
                <a>Александр</a>
            </div>
            
            <div>
                <div class="form-inline">
                    <button type="submit" class="btn-sign-out">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="main-content">
        <div class="header">
            <h5 id="joinedRoom">Тест чата</h5>
            <div class="room-actions">
                <button type="button" class="btn btn-link text-secondary px-1" onClick={handleShowModalRename}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                </button>
                <RenameChat showModalRename={showModalRename} closeModalRename={handleCloseModalRename} />
                <button type="button" class="btn btn-link text-secondary px-1" onClick={handleShowModalDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <DeleteChat showModalDelete={showModalDelete} closeModalDelete={handleCloseModalDelete} />
            </div>
        </div>
        <div class="messages-container position-relative">
            <div class="no-messages-info" /*проверка на наличие сообщений*/>Напиши первое сообщение!</div>
            <ul class="list-unstyled" id="messages-list">
                <li>
                    <div class="message-item">
                        <span class="avatar avatar-lg mx-2 text-uppercase">А</span>
                        
                        <div class="message-content">
                            <div class="message-info d-flex flex-wrap align-items-center">
                                <span class="author" data-bind="text: fromFullName">Александр</span>
                                <span class="timestamp">12:30</span>
                            </div>
                            <div class="content" data-bind="html: content">Blazor - говно!</div>
                        </div>
                        <div class="actions">
                            <div class="dropdown dropstart">
                                <a class="text-secondary" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleShowModalDeleteMessage}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                </a>
                                <DeleteMessage showModalDeleteMessage={showModalDeleteMessage} closeModalDeleteMessage={handleCloseModalDeleteMessage} />
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="message-input-container">
            <input id="message-input" type="text" maxlength="500" placeholder="Напишите сообщение..." />
            <div class="actions d-flex align-items-center">
                <div asp-action="Upload" asp-controller="Upload" enctype="multipart/form-data" id="uploadForm">
                    <label for="UploadedFile" class="custom-file-upload">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </label>
                    <input type="hidden" name="RoomId" />
                    <input type="file" id="UploadedFile" name="File" accept=".jpg,.jpeg,.png" data-bind="event: {change: uploadFiles}"/>
                </div>
                <a role="button" id="btn-show-emojis">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                </a>
                <a role="button" id="btn-send-message" data-bind="click: sendNewMessage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </a>
            </div>
            <div class="emojis-containe d-none" id="emojis-container">
                <button data-value=":)">
                    <img src="~/images/emojis/emoji1.png" />
                </button>
                <button data-value=":P">
                    <img src="~/images/emojis/emoji2.png" />
                </button>
                <button data-value=":O">
                    <img src="~/images/emojis/emoji3.png" />
                </button>
                <button data-value=":-)">
                    <img src="~/images/emojis/emoji4.png" />
                </button>
                <button data-value="B|">
                    <img src="~/images/emojis/emoji5.png" />
                </button>
                <button data-value=":D">
                    <img src="~/images/emojis/emoji6.png" />
                </button>
                <button data-value="<3">
                    <img src="~/images/emojis/emoji7.png" />
                </button>
            </div>
        </div>
    </div>
    <div class="users-container">
        <div class="header">
            <h5>Участники (<span>0</span>)</h5>
        </div>
        <ul class="list-unstyled flex-grow-1" id="users-list">
            <li>
                <div class="user">
                    <span class="avatar me-2 text-uppercase">А</span>
                    <div class="user-info">
                        <span class="name">Александр</span>
                        <span class="device">Телефон</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="position-relative search-container text-secondary">
            <input type="text" class="" placeholder="Поиск"/>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    </div>
</div>
)}

<Footer />
</>

);
}
export default Chat;