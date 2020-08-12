import React, { useState } from 'react';
import axios from 'axios';
import Context from '../Context';
import Header from './Header';
import Tagline from './Tagline';
import Content from './Content';
import WeatherSearch from './WeatherSearch';
import WeatherData from './WeatherData';
import DateTime from './DateTime';
import Footer from './Footer';
import Error from './Error';

const Main = () => {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();
  const [error, setError] = useState();

  const api_call = async (event) => {
    event.preventDefault();

    const location = event.target.elements.location.value;
    if (!location) {
      return setError('Пожалуйста введите название города'), setWeather(null);
    }
    const API_KEY = 'зайдите в файл .gitignore, скопируйте ключ и замените (формат String)';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric&lang=ru`;
    const request = axios.get(url);
    const response = await request;

    setError(null)
    setWeather(response.data.main)
    setCity(response.data.name)
  };

  return (
    <div className="main">
      <Header />
      <Content>
        <DateTime />
        <Tagline />
        <Context.Provider value={{ api_call, weather, city }}>
          <WeatherSearch />
          {weather && <WeatherData />}
          {error && <Error error={error} />}
        </Context.Provider>
        <Footer/>
      </Content>
    </div>
  );
};

export default Main;
