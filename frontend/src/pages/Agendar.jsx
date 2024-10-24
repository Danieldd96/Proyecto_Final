import React, { useState } from 'react';
import Navbar from '../components/navbar';
import '../styles/Agendar.css';

const Agendar = () => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tipoBicicleta, setTipoBicicleta] = useState('');
  const [mantenimiento, setMantenimiento] = useState('');

  const mantenimientosPorBicicleta = {
    montana: ['Cambio de llantas', 'Ajuste de suspensión', 'Limpieza completa'],
    ruta: ['Ajuste de frenos', 'Cambio de cadena', 'Limpieza de transmisión'],
    bmx: ['Ajuste de frenos', 'Cambio de llantas', 'Revisión general'],
    electrica: ['Revisión de batería', 'Ajuste de frenos eléctricos', 'Revisión de motor'],
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1>¿DESEA AGENDAR UNA CITA?</h1>
        <p style={{fontSize:"1.2em"}}>
          Si busca mantenimiento de su bicicleta, seleccione el tipo y servicio. ¡Agende su cita directo aquí!
        </p>

        <form className="agendar-form">
          <label>
            Seleccione si su servicio será en nuestras instalaciones o Taller a Domicilio 
            <select>
              <option value="">Seleccione una opción</option>
              <option value="instalaciones">En nuestras instalaciones</option>
              <option value="domicilio">A Domicilio</option>
            </select>
          </label>

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
            ¿En qué fecha le gustaría visitarnos/recibirnos? 
            <input 
              type="date" 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)} 
              required 
            />
          </label>

          <label>
            Hora de la cita 
            <input 
              type="time" 
              value={hora} 
              onChange={(e) => setHora(e.target.value)} 
              required 
            />
            <small>Servicio a domicilio disponible entre 08:00 a.m. y 05:00 p.m.</small>
          </label>

          <label>
            Nombre 
            <input 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
            />
          </label>

          <label>
            Apellidos 
            <input 
              type="text" 
              value={apellidos} 
              onChange={(e) => setApellidos(e.target.value)} 
              required 
            />
          </label>

          <label>
            Email 
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </label>

          <label>
            Teléfono
            <input 
              type="tel" 
              value={telefono} 
              onChange={(e) => setTelefono(e.target.value)} 
            />
          </label>

          <label>
            Compártanos su dirección (sólo en caso de servicio móvil) o cualquier información adicional 
            <textarea 
              value={direccion} 
              onChange={(e) => setDireccion(e.target.value)} 
              required
            ></textarea>
          </label>

          <button type="submit" className="btn-submit">ENVIAR</button>
        </form>
      </div>
    </div>
  );
};

export default Agendar;
