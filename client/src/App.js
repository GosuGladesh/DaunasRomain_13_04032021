import { BrowserRouter as Router,  Routes,  Route,} from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';

function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<Homepage />} />   
        <Route path="/login" element={<Login />} /> 
        <Route path="/profile" element={<Profile/>} />                  
        </Routes>
      </Router>    
  );
}

export default App;
