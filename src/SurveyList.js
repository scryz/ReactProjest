import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Выполнить GET-запрос к вашей локальной API
    axios.get('https://localhost:7293/Survey')
      .then(response => {
        // Обработать данные, полученные из API
        setSurveys(response.data.surveys);
        setLoading(false); // Устанавливаем loading в false после успешной загрузки
      })
      .catch(error => {
        console.error('Ошибка при запросе к API:', error);
        setLoading(false); // Устанавливаем loading в false при ошибке
      });
  }, []);

  return (
    <div className="survey-list-container"> {/* Добавляем контейнер с классом */}
      <h2>Список опросов</h2>
      {loading ? (
        <p>Загрузка данных...</p>
      ) : (
        <ul className="survey-list"> {/* Добавляем список с классом */}
          {surveys.map(survey => (
            <li key={survey.id} className="survey-item"> {/* Добавляем элемент списка с классом */}
              <div className="survey-item-content"> {/* Обертка для контента */}
                <p>Имя: {survey.name}</p>
                <p>Год рождения: {survey.yearOfBirth}</p>
                <p>Город: {survey.city}</p>
                <p>Страна: {survey.country}</p>
                <p>Телефон: {survey.phone}</p>
                <p>Email: {survey.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SurveyList;