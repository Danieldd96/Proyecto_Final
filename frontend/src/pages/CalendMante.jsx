import React from 'react'
import '../styles/Calendario.css'
import Calendario from '../components/Calendario'
import Navbar from '../components/Navbar'


const CalendMante = () => {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center'}}>
        <div style={{ width: '90%', margin: '0 auto', transform: 'scale(0.7)'}}>
          <Calendario />
        </div>
      </div>
    </div>
  )
}

export default CalendMante
