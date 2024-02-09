import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import VerifyToken from "../body/VerifyToken";

export const CreateChat = ({ showModalCreate, closeModalCreate }) => {
  const [roomName, setRoomName] = useState('');
  const [roomAdmin, setRoomAdmin] = useState('string');
  const [rooms, setRooms] = useState('');
  const [ err, setErrorMessage] = useState('');

  const { isValid, error } = VerifyToken();

  const handleCreateRoom = async (e) => {
    closeModalCreate();
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("https://localhost:7293/api/Rooms", {
        name: roomName,
        admin: roomAdmin 
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRooms((prevRooms) => prevRooms.concat(response.data));
      setErrorMessage('Комната создана!');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage('Ошибка при создании комнаты: проверьте правильность заполнения всех полей ввода.');
      } else {
        setErrorMessage('Ошибка при создании комнаты: проверьте логи.');
      }
    }
  };

  return (
    <div>
      {isValid ? (
        <Modal className="create-room-modal" show={showModalCreate} onHide={closeModalCreate}>
          <Modal.Header>
            <Modal.Title>Создать чат</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" id="roomName" className="form-control" maxLength="100" placeholder="Введите название чата..." value={roomName}
            onChange={(e) => setRoomName(e.target.value)}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalCreate}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleCreateRoom}>
              Создать
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};


  export const RenameChat = ({ showModalRename, closeModalRename, id }) => {
    const [newRoomName, setNewRoomName] = useState('');
    const [roomAdmin, setRoomAdmin] = useState('string');
  
    const handleChange = (e) => {
      setNewRoomName(e.target.value);
    };

    const handleRename = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`https://localhost:7293/api/Rooms/${id}`, {
          name: newRoomName,
          admin: roomAdmin 
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        closeModalRename();
      } catch (error) {
        console.error('Error:', error);
      }
    };
return(
<Modal show={showModalRename} onHide={closeModalRename}>
      <Modal.Header>
        <Modal.Title>Переименовать чат</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" className="form-control" value={newRoomName} onChange={handleChange} maxLength="100" placeholder="Введите новое название чата..." />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModalRename}>Закрыть</Button>
        <Button variant="primary" onClick={handleRename}>Обновить</Button>
      </Modal.Footer>
    </Modal>
)};

export const DeleteChat = ({ showModalDelete, closeModalDelete, id }) => {

  const handleRemove = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`https://localhost:7293/api/Rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      closeModalDelete();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
    return (
      <Modal show={showModalDelete} onHide={closeModalDelete}>
        <Modal.Header>
          <Modal.Title id="removeRoomModalLabel">Удалить чат</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">Вы действительно хотите удалить этот чат? Это действие невозможно будет отменить!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalDelete}>Закрыть</Button>
          <Button variant="danger" onClick={handleRemove}>Удалить</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  export const DeleteMessage = ({ showModalDeleteMessage, closeModalDeleteMessage, onRemoveMessage, itemToDelete }) => {
    const handleRemove = () => {
      onRemoveMessage(itemToDelete);
      closeModalDeleteMessage();
    };
  
    return (
      <Modal show={showModalDeleteMessage} onHide={closeModalDeleteMessage}>
        <Modal.Header>
          <Modal.Title id="removeMessageModalLabel">Удалить сообщение</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">Вы действительно хотите удалить это сообщение?</p>
          <input type="hidden" className="form-control" value={itemToDelete} readOnly />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalDeleteMessage}>Закрыть</Button>
          <Button variant="danger" onClick={handleRemove}>Удалить</Button>
        </Modal.Footer>
      </Modal>
    );
  };
