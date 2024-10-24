import React, { useState } from 'react'
import '../styles/Calendario.css'
import Calendario from '../components/Calendario'
import Navbar from '../components/navbar'
import '../styles/CaledMante.css'


const CalendMante = () => {
  const [fecha, setFecha] = useState('');
  const [tipoBicicleta, setTipoBicicleta] = useState('');
  const [mantenimiento, setMantenimiento] = useState('');

  const mantenimientosPorBicicleta = {
    montana: ['Cambio de llantas', 'Ajuste de suspensión', 'Limpieza completa'],
    ruta: ['Ajuste de frenos', 'Cambio de cadena', 'Limpieza de transmisión'],
    bmx: ['Ajuste de frenos', 'Cambio de llantas', 'Revisión general'],
    electrica: ['Revisión de batería', 'Ajuste de frenos eléctricos', 'Revisión de motor'],
  };

  return (
    <div >
      <Navbar />
      <div style={{display: 'flex',order:'2'}}>
      <div style={{width:'100%',padding:'20px',backgroundColor:'#000',color:'white',borderRadius:'10px'}}>
        <div className='agendar-form'>
          <h1>Calendario</h1>
          <form>
            <label>
            Tipo de bicicleta 
            <select 
              value={tipoBicicleta} 
              onChange={(e) => setTipoBicicleta(e.target.value)} 
              required
            >
              <option value="">Seleccione el tipo de bicicleta</option>
              <option value="montana">Montaña</option>
              <option value="ruta">Ruta</option>
              <option value="bmx">BMX</option>
              <option value="electrica">Eléctrica</option>
            </select>
          </label>


          <label>
            Tipo de mantenimiento
            <select 
              value={mantenimiento} 
              onChange={(e) => setMantenimiento(e.target.value)} 
              disabled={!tipoBicicleta}
              required
            >
              <option value="">Seleccione un mantenimiento</option>
              {tipoBicicleta && mantenimientosPorBicicleta[tipoBicicleta].map((mantenimiento, index) => (
                <option key={index} value={mantenimiento}>{mantenimiento}</option>
              ))}
            </select>
          </label>

          <label>
            Fecha en la que Se realizo el mantenimiento
            <input 
              type="date" 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)} 
              required 
            />
          </label>


            <button type="submit">Agregar Evento</button>
          </form>

        </div>
      </div>
        <div className="calendar-display">
          <Calendario />
        </div>
      </div>
    </div>
  )
}

export default CalendMante
