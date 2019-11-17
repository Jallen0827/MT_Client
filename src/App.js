import React, {useEffect, useState} from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Videos from './Components/Videos/videos'

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
      <h1>JORDAN YMCA MULTIFIT SWIM VIDEOS</h1>
      <Videos token={sessionToken}/>
    </div>
  );
}

export default App;
