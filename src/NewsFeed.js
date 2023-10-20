import React, { useState, useEffect } from 'react';
import axios from 'axios';
/*import styles from "../public/css/style.css";*/

function NewsList() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    axios
      .get('https://localhost:7293/api/News') // url вашего C# API
      .then((response) => {
        setNewsList(response.data);
      })
      .catch((error) => {
        console.error(`Ошибка при получении новостей: ${error}`);
      });
  }, []); // пустой массив означает, что этот useEffect будет запускаться только при монтировании компонента

  return (
    <div className = "img">
      {newsList.map((news) => (
        <div key={news.id}>
          <h2>{news.title}</h2>
          <p>{news.content}</p>
        </div>
      ))}
    </div>
  );
}

export default NewsList;