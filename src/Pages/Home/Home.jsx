import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate()
  const [name, setName] = useState('')
  useEffect(() => {
    let res = localStorage.getItem('user');
    setName(res)
    if(!res){
      navigate('/')
    }
  }, [])
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/')
  }
  

  return (
    <div className='home'>
      <h1 style={{font:"message-box", fontSize:"30px", fontWeight: '900' ,color:"red",}}><b>Hello {name}🤞..</b></h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
