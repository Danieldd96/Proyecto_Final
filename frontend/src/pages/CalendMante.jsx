import React, { useState } from 'react'
import '../styles/Calendario.css'
import Calendario from '../components/Calendario'      //// Importamos el componente Calendario
import Navbar from '../components/navbar'
import '../styles/CaledMante.css'
import { addMonths } from 'date-fns'                  //// Importamos la función addMonths de date-fns para agregar meses a una fecha

const CalendMante = () => {
  const [fecha, setFecha] = useState('');
  const [tipoBicicleta, setTipoBicicleta] = useState('');
  const [mantenimiento, setMantenimiento] = useState('');
  const [eventos, setEventos] = useState([]);

  const mantenimientosPorBicicleta = {            //// Creamos un objeto mantenimientosPorBicicleta que contenga los mantenimientos por tipo de bicicleta
    montana: ['Cambio de llantas', 'Ajuste de suspensión', 'Limpieza completa'],
    ruta: ['Ajuste de frenos', 'Cambio de cadena', 'Limpieza de transmisión'],
    bmx: ['Ajuste de frenos', 'Cambio de llantas', 'Revisión general'],
    electrica: ['Revisión de batería', 'Ajuste de frenos eléctricos', 'Revisión de motor'],
  };

  const intervaloMantenimiento = {                //// Creamos un objeto intervaloMantenimiento que contenga el intervalo de tiempo entre mantenimientos
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
    const fechaInicio = new Date(fecha);                                      ///Fecha de inicio del evento
    const intervalo = intervaloMantenimiento[mantenimiento];                  ///Intervalo de tiempo entre mantenimientos
    const fechaProximoMantenimiento = addMonths(fechaInicio, intervalo);      ///Fecha del próximo mantenimiento

    const eventoInicio = {                                           ///Evento inicial
      title: `${tipoBicicleta} - ${mantenimiento} (Inicio)`,         ///Título del evento el cual contiene el tipo de bicicleta y el mantenimiento con una etiqueta de inicio
      start: fechaInicio,                                            ///Fecha de inicio del evento
      end: fechaInicio,                                              ///Fecha de fin del evento
      allDay: true,                                                  ///Evento de todos los días
    };

    const eventoFin = {                                              ///Evento final
      title: `${tipoBicicleta} - ${mantenimiento} (Próximo)`,        ///Título del evento el cual contiene el tipo de bicicleta y el mantenimiento con una etiqueta de próximo
      start: fechaProximoMantenimiento,                              ///Fecha de inicio del evento
      end: fechaProximoMantenimiento,                                ///Fecha de fin del evento
      allDay: true,                                                  ///Evento de todos los días
    };

    setEventos([...eventos, eventoInicio, eventoFin]);    ///Se agregan los eventos al estado de eventos que contienen el evento inicial y el evento final mas el ... de los eventos que ya existen

    setFecha('')                                                  ///Se limpia el campo de fecha
    setTipoBicicleta('')                                          ///Se limpia el campo de tipo de bicicleta
    setMantenimiento('')                                          ///Se limpia el campo de mantenimiento
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
                  //El onchange se ejecuta cuando el usuario selecciona un valor en el select
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
                  //El onchange se ejecuta cuando el usuario selecciona un valor en el select para el tipo de mantenimiento
                  disabled={!tipoBicicleta}
                  //El disabled se ejecuta cuando el tipo de bicicleta no este seleccionado
                  required
                >
                  <option value="">Seleccione un mantenimiento</option>
                  {tipoBicicleta && mantenimientosPorBicicleta[tipoBicicleta].map((mantenimiento, index) => (
                    //Se muestran los mantenimientos para el tipo de bicicleta seleccionado
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
                  // El onchange se ejecuta cuando el usuario agrega una fecha en el input
                  required
                />
              </label>

              <button type="submit">Agregar Evento</button>
            </form>
          </div>
        </div>
        <div className="calendar-display">
          {/* Se muestra el calendario con los eventos que se agregaron */}
          <Calendario eventos={eventos} />
        </div>
      </div>
    </div>
  )
}

export default CalendMante
