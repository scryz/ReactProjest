import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../../css/MyProfile.css'
import defaultImg from '../../img/avatar.png';
import Navbar from "../navbar/Navbar";
import Footer from "../body/Footer";
import calendar from '../../img/calendar.png';
import view_icon from '../../img/view.png'
import comment_icon from '../../img/comment.png'
import like_icon from '../../img/like.png'
import edit from '../../img/edit.png';
import trash from '../../img/trash.png';
import AddEvent from './AddEvent';
import jQuery from "jquery";
import Select from "react-select";

const options = [
    { value: 'Футбол', label: 'Футбол' },
    { value: 'Теннис', label: 'Теннис' },
    { value: 'Прогулки', label: 'Прогулки' },
    { value: 'Видеоигры', label: 'Видеоигры' },
    { value: 'Активный отдых', label: 'Активный отдых' }
];

const DRAG_SENSITIVITY = 3;

const MyProfile = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [work, setWork] = useState();
    const [education, setEducation] = useState();
    const [vk, setVk] = useState();
    const [inst, setInst] = useState();
    const [tg, setTg] = useState();
    const [hobbies, setHobbies] = useState();
    const [avatar, setAvatar] = useState();
    const [uploadResult, setUploadResult] = useState('');
    const [views, setViews] = useState(0);
    const [comment, setComment] = useState(0);
    const [like, setLike] = useState(0);
    const [events, setEvents] = useState([]);
    const [delite, setDelite] = useState(false);
    const [id, setId] = useState('');
    const [showModalAddEvent, setShowModalAddEvent] = useState(false);
    const handleShowModalAddEvent = () => setShowModalAddEvent(true);
    const handleCloseModalAddEvent = () => setShowModalAddEvent(false);


    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (selected) => {
        setSelectedOptions(selected);
        setHobbies(selected.value);
    };


    //анимашка активного поля
    (function ($) {
        function floatLabel(inputType) {
            $(inputType).each(function () {
                var $this = $(this);
                $this.focus(function () {
                    $this.next().addClass("active");
                });
                $this.blur(function () {
                    if ($this.val() === '' || $this.val() === 'blank') {
                        $this.next().removeClass();
                    }
                });
            });
        }
        floatLabel(".floatLabel");
    })(jQuery);


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    //получение профиля
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

    //получение ивентов
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

    //удаление ивентов
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
    //загрузка изображения
    async function uploadFile(file) {
        const formData = new FormData();
        formData.append('uploadedFile', file);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:7293/api/Image/AddImage', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Add this line
                }
            });

            if (!response.ok) {
                throw new Error('Error during image upload');
            }

            const result = await response.text();
            setUploadResult(result);
        } catch (error) {
            console.error('Error during image upload:', error);
        }
    }
    //получение изображения
    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:7293/api/Image/GetImage?FileId=1`, {
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
    //изменение профиля пользователя
    const UserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:7293/UpdateProfile?Name=${name}&BirthDate=${birthDate}&Avatar=${uploadResult}&AvatarId=1&Status=${status}
            &Work=${work}&Education=${education}&Vk=${vk}&Inst=${inst}&Tg=${tg}&Hobbies=${name}`, {
                name: user.name,
                birthDate: user.birthDate,
                status: user.status,
                work: user.work,
                education: user.education,
                vk: user.vk,
                inst: user.inst,
                tg: user.tg,
                hobbies: user.hobbies
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log('User profile posted successfully:', response.data);
            //window.location.reload();
        } catch (error) {
            console.error('Error posting user profile:', error.response.data);
        }
    };


    function Text({ text, id }) {
        const words = text.split(' ');
        if (words.length > 30) {
            return <p>{words.slice(0, 30).join(' ')} <Link to={`/event/${id}`}>ещё</Link></p>;
        }
        else {
            return text;
        }
    }

    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    //сколлинг альбома
    useEffect(() => {
        const slider = sliderRef.current;

        const handleMouseDown = (e) => {
            setIsDragging(true);
            setStartX(e.pageX - slider.offsetLeft);
            setScrollLeft(slider.scrollLeft);
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * DRAG_SENSITIVITY;
            slider.scrollLeft = scrollLeft - walk;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const handleMouseLeave = () => {
            setIsDragging(false);
        };

        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mousemove', handleMouseMove);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mousemove', handleMouseMove);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isDragging, startX, scrollLeft]);







    return (
        <>
            <Navbar />
            <section className="container">
                <div className="page-heading">
                    <div className="myprofile clearfix">
                        <div className="cover-size">
                            <img className="cover" src="https://webmg.ru/wp-content/uploads/2022/10/i-200-3.jpeg" />
                        </div>
                        <div className="myavatar-padding">
                            {avatar ? (
                                <label className="label_avatar">
                                    <img className="myavatar" src={avatar} alt="Avatar" />
                                    <input type="file" name="file" onClick={(event) => uploadFile(event.target.files[0])} hidden />
                                </label>
                            ) : (
                                <label className="label_avatar">

                                    <img className="myavatar" id="img" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Default Avatar" />
                                    <input type="file" name="file" onClick={(event) => uploadFile(event.target.files[0])} hidden />

                                </label>


                            )}
                        </div>
                        <div className="media-body va-m">
                            <h2 className="media-heading">{user.name}
                                <small> - ColorCloudCo</small>
                            </h2>
                            <p className="lead">{user.status}</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="panel">
                            <div className="panel-heading">
                                <span className="panel-icon">
                                    <i className="fa fa-star"></i>
                                </span>
                                <span className="panel-title">Альбом</span>
                                <span>+</span>
                            </div>
                            <div className="panel-body pn">
                                <ul ref={sliderRef} className="gallery">
                                    <li><img className="img-gallery" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." /></li>
                                    <li><img className="img-gallery" src="https://gas-kvas.com/grafic/uploads/posts/2023-10/1696502271_gas-kvas-com-p-kartinki-lyubie-5.jpg" alt="..." /></li>
                                    <li><img className="img-gallery" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." /></li>
                                    <li><img className="img-gallery" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." /></li>
                                    <li><img className="img-gallery" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." /></li>
                                </ul>
                            </div>
                        </div>
                        <div className="panel">
                            <div className="panel-heading">
                                <span className="panel-icon">
                                    <i className="fa fa-trophy"></i>
                                </span>
                                <span className="panel-title"> Мои интересы</span>
                            </div>
                            <div className="panel-body pb5">
                                <span className="label label-warning mr5 mb10 ib lh15">Футбол</span>
                                <span className="label label-primary mr5 mb10 ib lh15">Теннис</span><br />
                                <span className="label label-info mr5 mb10 ib lh15">Видео игры</span>
                                <span className="label label-success mr5 mb10 ib lh15">Прогулки</span>
                                <span className="label label-warning mr5 mb10 ib lh15">Общение</span><br />
                                <span className="label label-primary mr5 mb10 ib lh15">Программирование</span>
                                <span className="label label-info mr5 mb10 ib lh15">UI дизайн</span><br />
                                <span className="label label-success mr5 mb10 ib lh15">Миша чОРт</span>
                                <span className="label label-primary mr5 mb10 ib lh15">Активный отдых</span>

                            </div>
                        </div>

                        <div className="panel">
                            <div className="panel-heading">
                                <span className="panel-icon">
                                    <i className="fa fa-trophy"></i>
                                </span>
                                <span className="panel-title"> Социальные сети</span>
                            </div>
                            <div className="panel-body pb5">
                                <ul className="social-icons">
                                    <li><a className="social-icon-fb" href="https://www.facebook.com/itchief.ru" title="Официальная страница ИТ Шеф в Facebook" target="_blank" rel="noopener"></a></li>
                                    <li><a className="social-icon-vk" href="https://vk.com/itchief" title="Официальная страница ИТ Шеф в ВКонтакте" target="_blank" rel="noopener"></a></li>
                                    <li><a className="social-icon-telegram" href="https://t.me/itchief_ru" title="Официальная страница ИТ Шеф в Telegram" target="_blank" rel="noopener"></a></li>
                                    <li><a className="social-icon-youtube" href="https://www.youtube.com/channel/UCbh6Tqnw22ZBRvELewUXgxA" title="Официальный канал ИТ Шеф на Youtube" target="_blank" rel="noopener"></a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-8">
                        <div className="tab-block">
                            <ul className="nav nav-tabs">
                                <li className={`tab-pane ${activeTab === "tab1" ? "active" : ""}`}>
                                    <a href="" data-toggle="tab" onClick={(e) => { e.preventDefault(); handleTabClick("tab1") }}>
                                        Лента
                                    </a>
                                </li>
                                <li className={`tab-pane ${activeTab === "tab2" ? "active" : ""}`}>
                                    <a href="" data-toggle="tab" onClick={(e) => { e.preventDefault(); handleTabClick("tab2") }}>
                                        Мои события
                                    </a>
                                </li>
                                <li className={`tab-pane ${activeTab === "tab3" ? "active" : ""}`}>
                                    <a href="" data-toggle="tab" onClick={(e) => { e.preventDefault(); handleTabClick("tab3") }}>
                                        Настройки
                                    </a>
                                </li>
                            </ul>

                            <div className="tab-content p30">
                                <div id="tab1" className={`tab-pane ${activeTab === "tab1" ? "active" : ""}`}>
                                    <div className="event-container">
                                        <div className="post">
                                            <img className="postImage" src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                                            <div className="postDetails">
                                                <div className="postTitle">{user.name}</div>
                                                <div className="postDate">12.06.2023</div>
                                            </div>
                                        </div>
                                        <div className="postName">
                                            <div className="postNameTitle">Название поста в ленте</div>
                                            <div className="postTitle">Тестовое описание постатестовое описание тестовое описание  тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание.
                                                тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание.
                                            </div>
                                            <div className="img-container">
                                                <img className="imgEvent" src="https://gas-kvas.com/grafic/uploads/posts/2023-10/1696502271_gas-kvas-com-p-kartinki-lyubie-5.jpg" />
                                            </div>
                                            <a href="">
                                                <div className="share-container">
                                                    <img className="postImage" src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                                                    <div className="postDetails">
                                                        <div className="postTitle">Название события</div>
                                                        <div className="postDate">01.02.2024</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="icon_position_container">
                                                <div className='icon_position'>
                                                    <p><span className="glyphicon" aria-hidden="true">
                                                        <img className='icon' src={like_icon} /></span> {like}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="event-container">
                                        <div className="post">
                                            <img className="postImage" src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                                            <div className="postDetails">
                                                <div className="postTitle">Имя/Ник пользователя/орги</div>
                                                <div className="postDate">12.06.2003</div>
                                            </div>
                                        </div>
                                        <div className="postName">
                                            <div className="postNameTitle">Название поста в ленте</div>
                                            <div className="postTitle">Тестовое описание постатестовое описание тестовое описание  тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание.
                                                тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание.
                                            </div>
                                            <div className="img-container">
                                                <img className="imgEvent" src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                                                <img className="imgEvent" src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="event-container">
                                        <div className="post">
                                            <img className="postImage" src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                                            <div className="postDetails">
                                                <div className="postTitle">Имя/Ник пользователя/орги</div>
                                                <div className="postDate">12.06.2003</div>
                                            </div>
                                        </div>
                                        <div className="postName">
                                            <div className="postNameTitle">Название поста в ленте</div>
                                            <div className="postTitle">Тестовое описание постатестовое описание тестовое описание  тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание.
                                                тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="event-container">
                                        <div className="post">
                                            <img className="postImage" src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                                            <div className="postDetails">
                                                <div className="postTitle">Имя/Ник пользователя/орги</div>
                                                <div className="postDate">12.06.2003</div>
                                            </div>
                                        </div>
                                        <div className="postName">
                                            <div className="postNameTitle">Название поста в ленте</div>
                                            <div className="postTitle">Тестовое описание постатестовое описание тестовое описание  тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание.
                                                тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание тестовое описание.
                                            </div>
                                            <div className="img-container">
                                                <img className="imgEvent" src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                                                <img className="imgEvent" src="https://gas-kvas.com/grafic/uploads/posts/2023-10/1696502271_gas-kvas-com-p-kartinki-lyubie-5.jpg" />
                                                <img className="imgEvent" src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                                                <img className="imgEvent" src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                                                <img className="imgEvent" src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div id="tab2" className={`tab-pane ${activeTab === "tab2" ? "active" : ""}`}>
                                    <button className="button_profile" onClick={(event) => { event.preventDefault(); handleShowModalAddEvent(); }}>Добавить событие</button>
                                    <AddEvent showModalAddEvent={showModalAddEvent} closeModalAddEvent={handleCloseModalAddEvent} />
                                    <div className="row row-margin-bottom">
                                        {events.map((event, id) => (
                                            <div className="col-md-six" key={id}>
                                                {event == 0 ? (<div className="no-messages-info">У вас нет ещё событий, скорее создайте их!<p />
                                                </div>
                                                ) : (
                                                    <div className="lib-panel">
                                                        <div className="lib-row lib-header">
                                                            <a>
                                                                <img className='icon_myevents' src={edit} />
                                                            </a>
                                                            <a onClick={handleDeleteEvent}>
                                                                <img className='icon_myevents' src={trash} />
                                                            </a>
                                                            <Link to={`/event/${event.id}`}><h4>{event.eventName}</h4></Link>
                                                            <div className="lib-header-seperator"></div>
                                                        </div>
                                                        <div className="title-event-container">
                                                            <div className="right">
                                                                <span className="glyphicon" aria-hidden="true">
                                                                    <img className='icon' src={calendar} />26.08.2003</span>
                                                            </div>
                                                            <h5 className='H5_center'><Text text={event.description} id={event.id} /></h5>
                                                        </div>
                                                        <div className="icon_position_container">
                                                            <div className='icon_position'>
                                                                <p><span className="glyphicon" aria-hidden="true">
                                                                    <img className='icon' src={view_icon} />
                                                                </span> {views}
                                                                </p>
                                                            </div>
                                                            <div className='icon_position'>
                                                                <p>
                                                                    <span className=" glyphicon" aria-hidden="true">
                                                                        <img className='icon' src={comment_icon} />
                                                                    </span> {comment}
                                                                </p>
                                                            </div>
                                                            <div className='icon_position'>
                                                                <p>
                                                                    <span className="glyphicon" aria-hidden="true">
                                                                        <img className='icon' src={like_icon} /></span> {like}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>



                                <div id="tab3" className={`tab-pane ${activeTab === "tab3" ? "active" : ""}`}>
                                    <div className="row gutters setting-content">
                                        <div>
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 ">
                                                    <div className="form-group">
                                                        <label className="label_setting">Имя:</label>
                                                        <input type="text" className="form-control" id="fullName" placeholder={user.name} onChange={(e) => setName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label className="label_setting">Ник:</label>
                                                        <input type="text" className="form-control" id="fullName" placeholder={user.userName} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="label_setting">Дата рождения:</label>
                                                        <input type="date" className="form-control" onChange={(e) => setBirthDate(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="label_setting">Email:</label>
                                                        <input type="email" className="form-control" id="eMail" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="label_setting">Чтот ещё:</label>
                                                        <input type="text" className="form-control" id="eMail" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="label_setting">Номер телефона:</label>
                                                        <input type="tel" className="form-control" id="phone" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="label_setting">Город:</label>
                                                        <input type="text" className="form-control" id="cite" placeholder="Введите город" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="label_setting">Хобби:</label>
                                                        <Select
                                                            options={options}
                                                            value={selectedOptions}
                                                            onChange={handleChange}
                                                            isMulti
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="label_setting">Образование:</label>
                                                        <input type="text" className="form-control" id="cite" placeholder={user.education} onChange={(e) => setEducation(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="label_setting">Место работы:</label>
                                                        <input type="text" className="form-control" id="cite" placeholder={user.work} onChange={(e) => setWork(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="label_setting">ВКонтакте:</label>
                                                        <input type="url" className="form-control" id="eMail" placeholder={user.vk} onChange={(e) => setVk(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="label_setting">Instagram:</label>
                                                        <input type="url" className="form-control" id="eMail" placeholder={user.inst} onChange={(e) => setInst(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="label_setting">Telegram:</label>
                                                        <input type="url" className="form-control" id="eMail" placeholder={user.tg} onChange={(e) => setTg(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="label_setting">Twitter:</label>
                                                        <input type="url" className="form-control" id="eMail" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="label_setting">Статус:</label>
                                                <textarea required className="textarea_floatLabel" placeholder={user.status} onChange={(e) => setStatus(e.target.value)} maxLength={180} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="row gutters">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div>
                                                        <button type="button" id="submit" name="submit" onClick={UserProfile}>Сохранить</button>
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
            </section>
            <Footer />
        </>
    )
}
export default MyProfile;