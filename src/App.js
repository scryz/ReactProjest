import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/pages/Home';
//import {Login} from './component/pages/LoginPage';
import Profile from './component/pages/Profile';
import Events from './component/pages/Events';
import EventDetail from './component/pages/EventDetail';
import AddEvent from './component/pages/AddEvent';
import Chat from './component/pages/Chat';
import { RenameChat } from './component/pages/CRUDchat';

function App() { 


  return (
      
      <Router>
          <Routes>
            <Route path ="/" element={<Home/>}/>
            
            <Route path="/profile" element={<Profile/>}/>
            <Route path='/events' element={<Events/>}/>
            <Route path='/event/:id' element={<EventDetail/>}/>
            <Route path='/addevent' element={<AddEvent/>}/>
            <Route path='/chat' element={<Chat/>}/>
          </Routes>
      </Router>
        
  );
}

export default App;