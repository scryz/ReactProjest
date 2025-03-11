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
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <YMaps>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/map' element={<Map />} />
          <Route path="/profileold" element={<Profile />} />
          <Route path='/events/:pageNumber' element={<Events />} />
          <Route path='/event/:id' element={<EventDetail />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/profile/:username' element={<MyProfile />} />
          <Route path='/profile' element={<PrivateRoute><MyProfile /></PrivateRoute>} />
        </Routes>
      </Router>
    </YMaps>
  );
}

export default App;