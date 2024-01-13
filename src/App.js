import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/pages/Home';
import Login from './component/pages/LoginPage';
import Reg from './component/pages/Reg';
import Profile from './component/pages/Profile';
import Events from './component/pages/Events';
import AddEvent from './component/pages/AddEvent';


function App() { 


  return (
      
      <Router>
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrathion" element={<Reg />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path='/events' element={<Events/>}/>
        <Route path='/addevent' element={<AddEvent/>}/>
        
        
      </Routes>
    </Router>
        
  );
}

export default App;