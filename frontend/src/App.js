import React from 'react';
import Navcomp from './components/Navcomp';
import './index.css'
import { UserProvider } from './contexts/UserContext';
import {
  Route,
  Navigate,
  Routes,
  BrowserRouter,
  useLocation
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Chat from './pages/ChatInterface';
import ConditionalNavcomp from './components/Navcond';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
        <ConditionalNavcomp />
          <Routes>
            <Route path='/' element={<Navigate to = "/home" />}/>
            <Route path='/about' element={<Navigate to = "/home" />}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/chat' element={<Chat/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
