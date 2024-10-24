import React, { useState } from 'react'
import '../styles/Calendario.css'
import Calendario from '../components/Calendario'
import Navbar from '../components/navbar'
import '../styles/CaledMante.css'
import { addMonths } from 'date-fns'

const CalendMante = () => {
  const [fecha, setFecha] = useState('');
  const [tipoBicicleta, setTipoBicicleta] = useState('');
  const [mantenimiento, setMantenimiento] = useState('');
  const [eventos, setEventos] = useState([]);

  const mantenimientosPorBicicleta = {
    montana: ['Cambio de llantas', 'Ajuste de suspensión', 'Limpieza completa'],
    ruta: ['Ajuste de frenos', 'Cambio de cadena', 'Limpieza de transmisión'],
    bmx: ['Ajuste de frenos', 'Cambio de llantas', 'Revisión general'],
    electrica: ['Revisión de batería', 'Ajuste de frenos eléctricos', 'Revisión de motor'],
  };

  const intervaloMantenimiento = {
    'Cambio de llantas': 6,
    'Ajuste de suspensión': 12,
    'Limpieza completa': 3,
    'Ajuste de frenos': 6,
    'Cambio de cadena': 6,
    'Limpieza de transmisión': 3,
    'Revisión general': 12,
    'Revisión de batería': 12,
    'Ajuste de frenos eléctricos': 6,
    'Revisión de motor': 12,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fechaInicio = new Date(fecha);
    const intervalo = intervaloMantenimiento[mantenimiento];
    const fechaProximoMantenimiento = addMonths(fechaInicio, intervalo);

    const eventoInicio = {
      title: `${tipoBicicleta} - ${mantenimiento} (Inicio)`,
      start: fechaInicio,
      end: fechaInicio,
      allDay: true,
    };

    const eventoFin = {
      title: `${tipoBicicleta} - ${mantenimiento} (Próximo)`,
      start: fechaProximoMantenimiento,
      end: fechaProximoMantenimiento, 
      allDay: true,
    };

    setEventos([...eventos, eventoInicio, eventoFin]);

    setFecha('')
    setTipoBicicleta('')
    setMantenimiento('')
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', order: '2' }}>
        <div style={{ width: '100%', padding: '20px', backgroundColor: '#000', color: 'white', borderRadius: '10px' }}>
          <div className='agendar-form'>
            <h1>Calendario</h1>
            <form onSubmit={handleSubmit}>
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
          <Calendario eventos={eventos} />
        </div>
      </div>
    </div>
  )
}

export default CalendMante
