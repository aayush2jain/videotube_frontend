import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/SignUp';
import Login from './pages/Login';
import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage';
import UploadVideo from './pages/UploadVideo';
import Videopage from './pages/Videopage';
import Yourvideo from './pages/Yourvideo';

function App() {
  return (
    
  <>
   <BrowserRouter>
   <Routes>
    <Route path="/signup" element={<Signup></Signup>}></Route>
    <Route path="/" element={<Login></Login>}></Route>
    <Route path="/home" element={<Homepage></Homepage>}></Route>
    <Route path="/upload" element={<UploadVideo></UploadVideo>}></Route>
    <Route path="/video" element={<Videopage></Videopage>}></Route>
    <Route path="/yourvideo" element={<Yourvideo></Yourvideo>}></Route>
   </Routes>
   </BrowserRouter>
  </>
  )
}

export default App;
