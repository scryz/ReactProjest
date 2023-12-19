import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/pages/Home';
import Login from './component/pages/LoginPage';
import Reg from './component/pages/Reg';


function App() { 


  return (
      
      <Router>
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrathion" element={<Reg />}/>
        
      </Routes>
    </Router>
        
  );
}

export default App;