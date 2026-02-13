
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/login/login'
import Signup from './Pages/SignUp/Signup'

function App() {

  return (
  <Routes>
    
    <Route path='/Signup' element={<Signup />} />
    <Route path='/home' element={<Home />} />
    <Route path='/' element={ <Login />} />

  </Routes>
        
  )
}

export default App
