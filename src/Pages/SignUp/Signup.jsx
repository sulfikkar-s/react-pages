import React, { useReducer, useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'

 function Signup() {

    const[error,setError]=useState("")

    const navigate = useNavigate()
    const reducer=(state,action)=>{
        setError('')
        switch(action.type){
            case 'name' :return{ ...state,name:action.payload}
            case 'email' :return{ ...state,email:action.payload}
            case 'password' :return{ ...state,password:action.payload}
            case 'confirmpas' :return{ ...state,confirmpass:action.payload}
            case 'clr' :return {
        name:"",
        email:"",
        password:"",
        confirmpass:"",
    }

        }

    }

    const[state,disptch]=useReducer(reducer,{
        name:"",
        email:"",
        password:"",
        confirmpass:"",
    })


    const submite=async (e)=>{
        e.preventDefault()
        if(!state.name){
            setError("fill the name")
            return

        }
        if(!state.email){
            setError("enter emai id")
            return

        }
       
        if(state.password.length < 8){
                                        
            setError("password should be 8characters")
            return
        }
         if(state.password!==state.confirmpass){
            setError('doest not match the password')
            return
        }
         
        const res = await fetch('http://localhost:3001/user')
        const users = await res.json();

        const emailHandle=users.some((u)=>u.email===state.email)
        const nameHandle=users.some((u)=>u.name===state.name)

        if(nameHandle){
            setError("this username allready exist")
            return
        }

        if(emailHandle){
            setError("this email id allready exist")
            return
        }
        disptch({type:'clr'})


        fetch('http://localhost:3001/user',{
            method:'POST',
            headers: {
     "Content-Type": "application/json"
        },
            body: JSON.stringify(state)
        })
        navigate('/')
        disptch({type:'clr'})
    }
  return (
    <div className='hed'>
        <div className='contain'>
            <div className='card'>
            <form onSubmit={submite}>
                <h1  style={{
    textAlign: "center",
    fontSize: "30px",
    font:"caption",
    fontWeight: "700",
    color: "#faab84f0",
    letterSpacing: "1px",
    marginBottom: "20px"
  }}
>SignUp</h1>
                <input type='text' 
                value={state.name}
                placeholder='enter your name'  
                onChange={(e)=>disptch({type:"name" ,payload:e.target.value})}/>
                <input type='email'
                 value={state.email} 
                 placeholder='enter your email' 
                 onChange={(e)=>disptch({type:"email" ,payload:e.target.value})}/>
                <input type='password' 
                value={state.password}
                placeholder="enter your password" 
                 onChange={(e)=>disptch({type:"password" ,payload:e.target.value})}/>
                <input type='password'
                 value={state.confirmpass} 
                 placeholder='confirm password' 
                 onChange={(e)=>disptch({type:"confirmpas" ,payload:e.target.value})}/>
                 {
                    error && <p style={{color:"red", }}>{error}</p>
                 }
                 <button>signup</button>
            <p style={{font:"menu"}}>Already have an account? <span onClick={() => navigate('/')}> Log in</span></p>
            </form>
            </div>
        </div>
    </div>
  )
}
export default Signup