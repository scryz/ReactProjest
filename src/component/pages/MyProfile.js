import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../../css/MyProfile.css'
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

const DRAG_SENSITIVITY = 3;

const MyProfile = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
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


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

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
                console.log(user.birthDate);
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

    const UserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:7293/UpdateProfile?Name=${name}&BirthDate=${birthDate}&Avatar=${uploadResult}`, {
                name: user.name,
                birthDate: user.birthDate
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
            <section class="container">
                <div class="page-heading">
                    <div class="myprofile clearfix">
                        <div className="cover-size">
                            <img className="cover" src="https://webmg.ru/wp-content/uploads/2022/10/i-200-3.jpeg" />
                        </div>
                        <div class="myavatar-padding">
                            <a href="#">
                                <img class="myavatar" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." />
                            </a>
                        </div>
                        <div class="media-body va-m">
                            <h2 class="media-heading">Михаил чОРт
                                <small> - ColorCloudCo</small>
                            </h2>
                            <p class="lead">Я не боюсь шутить про дьявола, потому что я абсолютно уверен, никто из вас сейчас из зала не выкрикнет «Э! Э! Не шути про дьявола, у меня брат черт!»</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <div class="panel">
                            <div class="panel-heading">
                                <span class="panel-icon">
                                    <i class="fa fa-star"></i>
                                </span>
                                <span class="panel-title">Альбом</span>
                                <span>+</span>
                            </div>
                            <div class="panel-body pn">
                                <ul ref={sliderRef} class="gallery">
                                    <li><img className="img-gallery" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." /></li>
                                    <li><img className="img-gallery" src="https://gas-kvas.com/grafic/uploads/posts/2023-10/1696502271_gas-kvas-com-p-kartinki-lyubie-5.jpg" alt="..." /></li>
                                    <li><img className="img-gallery" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." /></li>
                                    <li><img className="img-gallery" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." /></li>
                                    <li><img className="img-gallery" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." /></li>
                                </ul>
                            </div>
                        </div>
                        <div class="panel">
                            <div class="panel-heading">
                                <span class="panel-icon">
                                    <i class="fa fa-trophy"></i>
                                </span>
                                <span class="panel-title"> Мои интересы</span>
                            </div>
                            <div class="panel-body pb5">
                                <span class="label label-warning mr5 mb10 ib lh15">Футбол</span>
                                <span class="label label-primary mr5 mb10 ib lh15">Теннис</span><br />
                                <span class="label label-info mr5 mb10 ib lh15">Видео игры</span>
                                <span class="label label-success mr5 mb10 ib lh15">Прогулки</span>
                                <span class="label label-warning mr5 mb10 ib lh15">Общение</span><br />
                                <span class="label label-primary mr5 mb10 ib lh15">Программирование</span>
                                <span class="label label-info mr5 mb10 ib lh15">UI дизайн</span><br />
                                <span class="label label-success mr5 mb10 ib lh15">Миша чОРт</span>
                                <span class="label label-primary mr5 mb10 ib lh15">Активный отдых</span>

                            </div>
                        </div>

                        <div class="panel">
                            <div class="panel-heading">
                                <span class="panel-icon">
                                    <i class="fa fa-trophy"></i>
                                </span>
                                <span class="panel-title"> Социальные сети</span>
                            </div>
                            <div class="panel-body pb5">
                                <ul class="social-icons">
                                    <li><a class="social-icon-twitter" href="https://twitter.com/itchief_ru" title="Официальная страница ИТ Шеф в Twitter" target="_blank" rel="noopener"></a></li>
                                    <li><a class="social-icon-fb" href="https://www.facebook.com/itchief.ru" title="Официальная страница ИТ Шеф в Facebook" target="_blank" rel="noopener"></a></li>
                                    <li><a class="social-icon-vk" href="https://vk.com/itchief" title="Официальная страница ИТ Шеф в ВКонтакте" target="_blank" rel="noopener"></a></li>
                                    <li><a class="social-icon-telegram" href="https://t.me/itchief_ru" title="Официальная страница ИТ Шеф в Telegram" target="_blank" rel="noopener"></a></li>
                                    <li><a class="social-icon-youtube" href="https://www.youtube.com/channel/UCbh6Tqnw22ZBRvELewUXgxA" title="Официальный канал ИТ Шеф на Youtube" target="_blank" rel="noopener"></a></li>
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
                                                <img className="imgEvent" src="https://gas-kvas.com/grafic/uploads/posts/2023-10/1696502271_gas-kvas-com-p-kartinki-lyubie-5.jpg" />
                                            </div>
                                            <a href="">
                                                <div className="share-container">
                                                    <img className="postImage" src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                                                    <div className="postDetails">
                                                        <div className="postTitle">Название события</div>
                                                        <div className="postDate">12.06.2003</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="icon_position_container">
                                                <div className='icon_position'>
                                                    <p><span class="glyphicon" aria-hidden="true">
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
                                                                <p><span class="glyphicon" aria-hidden="true">
                                                                    <img className='icon' src={view_icon} />
                                                                </span> {views}
                                                                </p>
                                                            </div>
                                                            <div className='icon_position'>
                                                                <p>
                                                                    <span class=" glyphicon" aria-hidden="true">
                                                                        <img className='icon' src={comment_icon} />
                                                                    </span> {comment}
                                                                </p>
                                                            </div>
                                                            <div className='icon_position'>
                                                                <p>
                                                                    <span class="glyphicon" aria-hidden="true">
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
                                            <div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="fullName">Имя:</label>
                                                        <input type="text" className="form-control" id="fullName" placeholder={user.name} onChange={(e) => setName(e.target.value)} />
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
                                                        <label htmlFor="fullName">Дата рождения:</label>
                                                        <input type="date" className="form-control" id="birthDate" value={user.birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="eMail">Email:</label>
                                                        <input type="email" className="form-control" id="eMail" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="eMail">Чтот ещё:</label>
                                                        <input type="text" className="form-control" id="eMail" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="phone">Номер телефона:</label>
                                                        <input type="tel" className="form-control" id="phone" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="website">Город:</label>
                                                        <input type="text" className="form-control" id="cite" placeholder="Введите город" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="website">Хобби:</label>
                                                        <input type="text" className="form-control" id="cite" placeholder="Введите город" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="website">Образование:</label>
                                                        <input type="text" className="form-control" id="cite" placeholder="Введите город" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="website">Место работы:</label>
                                                        <input type="text" className="form-control" id="cite" placeholder="Введите город" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="website">ВКонтакте:</label>
                                                        <input type="url" className="form-control" id="eMail" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="website">Instagram:</label>
                                                        <input type="url" className="form-control" id="eMail" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="website">Telegram:</label>
                                                        <input type="url" className="form-control" id="eMail" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="eMail">Twitter:</label>
                                                        <input type="url" className="form-control" id="eMail" />
                                                    </div>
                                                </div>
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