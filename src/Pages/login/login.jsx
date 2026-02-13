import React, { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'

 function login() {
  const navigate = useNavigate()

const[user,setUser]=useState({
  name:"",
  password:"",
})
const[error,setError]=useState('')

const submiteHandle= async(e)=>{ 
  e.preventDefault()
  const {name, password} = user;
  if(!name || !password){
    setError("fill the empty field")
    return;
  }
   const res = await fetch(`http://localhost:3001/user?name=${name}`)
   const users = await res.json();
   console.log(users)
   
   if(!users.length){
     setError("invalid username")
     return
    }
        console.log(users)
        if(users[0].password===password){
          localStorage.setItem('user', name)
            navigate('/home')
        }else{
          setError("wrong password");
          return;
        }
        
        setUser({
  name:"",
  password:"",
})
}


  return (
    <div className='inter'> 
    <div className='face'>
     
      <form onSubmit={submiteHandle}>
         <h1 style={{textAlign:"center", font:"caption", fontSize:"30px"}}>Login</h1>
         <h4 style={{font:"inherit"}}>Welcome Back!</h4>
        {
          error && <p>{error}</p>
        }
      <input type='text' placeholder='username' value={user.name} onChange={(e)=>setUser({...user ,name: e.target.value})}/>
      <input  type='password' placeholder='password' value={user.password} onChange={(e)=>setUser({...user ,password: e.target.value})}/>
      <button>login</button>
     <p style={{font:"menu"}}>Don't have account?<span onClick={() => navigate('/signup')}> Signup</span></p>
    </form>
    </div>
    </div>

  )
}
export default login
