import React, { Component } from 'react';

class Ncomponent extends Component {
  constructor() {
    super();
    this.state = {
      surveys: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    // Здесь мы выполняем запрос к локальному API при загрузке компонента
    this.setState({ isLoading: true });

    fetch('https://localhost:7293/Survey')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка при загрузке данных: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ surveys: data.surveys, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error, isLoading: false });
      });
  }

  render() {
    const { surveys, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Загрузка данных...</div>;
    }

    if (error) {
      return <div>Произошла ошибка: {error.message}</div>;
    }

    return (
      <div>
        <h1>Опросы:</h1>
        <ul>
          {surveys.map((survey) => (
            <li key={survey.id}>
              <p>Имя: {survey.name}</p>
              <p>Год рождения: {survey.yearOfBirth}</p>
              <p>Город: {survey.city}</p>
              <p>Страна: {survey.country}</p>
              <p>Телефон: {survey.phone}</p>
              <p>Email: {survey.email}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Ncomponent;






