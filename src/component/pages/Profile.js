import Navbar from "../navbar/Navbar";
import React, {useEffect, useState} from "react";
import axios from "axios";
import "../../css/Profile.css"
import defaultImg from '../../img/avatar.png';
import Footer from "../body/Footer";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import VerifyToken from "../body/VerifyToken";

const Profile = () => {
  const { isValid, error } = VerifyToken();
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);





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
    const fetchAvatar = async () => {
      try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:7293/api/TestImage/GetImage", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAvatar(response.data)
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  fetchAvatar();
  });


  const [uploadResult, setUploadResult] = useState('');

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

    const result = await response.text();
    setUploadResult(result); // Сохраняем путь к загруженной картинке в состоянии
  } catch (error) {
    console.error('Error during image upload:', error);
    setUploadResult('Error during image upload');
  }
}


const UserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`http://localhost:7293/UpdateProfile?Name=${name}&Age=${age}&Avatar=`, {
      name: user.name,
      age: user.age,
      avatar: user.avatar
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log('User profile posted successfully:', response.data);
  } catch (error) {
    console.error('Error posting user profile:', error.response.data);
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
                <input type="file" onChange={(event) => uploadFile(event.target.files[0])} />
                <p>{uploadResult}</p>
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
                <button  onClick={handleLogout}>Выйти</button>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
      <div className="card h-100">
        <div className="card-body">
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <h4 className="mb-2 text-primary">Мои мероприятия</h4>
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