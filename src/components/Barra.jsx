import React from 'react'
import { Link } from 'react-router-dom'

const Barra = () => {
  return (
    <header>
      <h1>Dark Horizon Shop</h1>
      <nav>
        <ul className="menu">
          <li><Link to='/'>Inicio</Link></li>
          <li><Link to='/login'>Iniciar Sesión</Link></li>
          <li><Link to='/registro'>Registrarse</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Barra