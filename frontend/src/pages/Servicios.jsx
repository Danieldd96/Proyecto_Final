import React from 'react'
import Calendario from '../components/Calendario'
import Navbar from '../components/Navbar'
import '../styles/Servicios.css'
import { Link } from 'react-router-dom'
const Servicios = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div style={{padding: '10px 40px'}}>
          <h1>Nuestros Servicios</h1>
          <hr />
        </div>
      <div className='containerService'>
        <div className="containerImg">
          <img src="src/img/marzo.png" alt="" />
          <Link to="/tutoriales" style={{color:'white',textDecoration:'none',fontSize:"25px"}}>TUTORIALES DE MANTENIMIENTO</Link>
        </div>
        <div className="containerImg">
          <img src="src/img/marzo.png" alt="" />
          <Link to="/calendario" style={{color:'white',textDecoration:'none',fontSize:"25px"}}>CALENDARIO DE MANTENIMIENTO</Link>
        </div>
        <div className="containerImg">
          <img src="src/img/marzo.png" alt="" />
          <Link to="/tutoriales" style={{color:'white',textDecoration:'none',fontSize:"25px"}}>TALLER</Link>
        </div>
        <div className="containerImg">
          <img src="src/img/marzo.png" alt="" />
          <h2>CENTRO DE AYUDA</h2>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Servicios
