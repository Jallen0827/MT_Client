import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar/Navbar';
import Videos from './Components/Videos/videos'
import Person from './Components/folders/folders'

function App() {
  const [sessionToken, setSessionToken] = useState(false)

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'))
    }
  }, [])
  
  const updateToken = (newToken) =>{
    localStorage.setItem('token', newToken)
    setSessionToken(newToken)
  }

  const clearToken = ()=>{
    localStorage.clear()
    setSessionToken('')
  }

  return (
    <div className="App">
      <Navbar updateToken={updateToken} clearToken={clearToken} token={sessionToken}/>
      
      {/* <Videos token={sessionToken}/> */}
      <Router>
        <Person token={sessionToken}/>
      </Router>
    </div>
  );
}

export default App;
