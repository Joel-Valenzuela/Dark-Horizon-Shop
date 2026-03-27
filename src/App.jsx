import React from 'react'
import Barra from './components/Barra'
import { Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import Registro from './pages/Registro'
import './App.css';

const App = () => {
  return (
    <>
    <Barra />
    
    <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />

    </Routes>
    
    
    </>
  )
}

export default App