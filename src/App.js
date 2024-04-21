import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/pages/Home';
import { YMaps } from '@pbe/react-yandex-maps'
import Profile from './component/pages/Profile';
import Events from './component/pages/Events';
import EventDetail from './component/pages/EventDetail';
import AddEvent from './component/pages/AddEvent';
import Chat from './component/pages/Chat';
import Map from './component/pages/Map';
import MyProfile from './component/pages/MyProfile';











function App() {


  return (
    <YMaps>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/map' element={<Map />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/events/:pageNumber' element={<Events />} />
          <Route path='/event/:id' element={<EventDetail />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/myprofile' element={<MyProfile />} />
        </Routes>
      </Router>
    </YMaps>

  );
}

export default App;