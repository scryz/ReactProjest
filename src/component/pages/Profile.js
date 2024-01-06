import Navbar from "../navbar/Navbar";
import "../../css/Profile.css"
import Footer from "../body/Footer";
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
 }

    return (
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
                <img src="https://sun9-73.userapi.com/impg/srebFlAsSh-u-SfRBT6XdzgO1wY1MDUf1HwPTA/JkC6qjqVWow.jpg?size=340x604&quality=96&sign=74c6af4f1495d8960e59be794964cec4&c_uniq_tag=psh9bmfxdj-UGZogBYZfuINSc88AwrFK_DLKiBeQEO4&type=album" alt="Пользователь" />
              </div>
              <h5 className="user-name">Иван Пупкин</h5>
              <h6 className="user-email">Ivan@bk.ru</h6>
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
              <h6 className="mb-2 text-primary">Персональные данные</h6>
              <button className="btn btn-primary" onClick={handleLogout}>Выйти</button>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="fullName">Имя</label>
                <input type="text" className="form-control" id="fullName" placeholder="Введите Имя" />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="fullName">Фамиля</label>
                <input type="text" className="form-control" id="fullName" placeholder="Введите фамилию" />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="fullName">Ник</label>
                <input type="text" className="form-control" id="fullName" placeholder="Введите ник-нейм" />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="fullName">Возраст</label>
                <input type="text" className="form-control" id="fullName" placeholder="Введите возраст" />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="eMail">Email</label>
                <input type="email" className="form-control" id="eMail" placeholder="Введите E-mail" />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="phone">Номер телефона</label>
                <input type="text" className="form-control" id="phone" placeholder="Введите номер телефона" />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label for="website">Город</label>
                <input type="text" className="form-control" id="cite" placeholder="Введите город" />
              </div>
            </div>
          </div>
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="text-right">
                
                <button type="button" id="submit" name="submit" className="btn btn-primary">Сохранить данные</button>
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
    );
}
export default Profile;

/*<h2>Редактирование профиля</h2>
        <form>
          <label>
            Имя:
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              />
              </label>
              <label>
                Возраст:
                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                />
              </label>
              <label>
                Город:
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                />
              </label>
              <label>
                Пол:
                <select name="gender" value={profile.gender} onChange={handleChange}>
                  <option value="">Выберите пол</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </select>
              </label>
              <label>
                Номер телефона:
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Увлечения:
                <textarea
                  name="hobbies"
                  value={profile.hobbies}
                  onChange={handleChange}
                />
              </label>
              <label>
                О себе:
                <textarea
                  name="about"
                  value={profile.about}
                  onChange={handleChange}
                />
              </label>
            </form>
          </div>
        </div>*/