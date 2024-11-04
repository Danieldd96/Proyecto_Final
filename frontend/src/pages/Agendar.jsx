import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Agendar.css';
import ScrollButton from '../components/ScrollButton';

const Agendar = () => {
  const [fecha, setFecha] = useState('');                      ///Este estado es para la fecha
  const [hora, setHora] = useState('');                        ///Este estado es para la hora
  const [nombre, setNombre] = useState('');                    ///Este estado es para el nombre
  const [apellidos, setApellidos] = useState('');              ///Este estado es para el apellidos
  const [email, setEmail] = useState('');                      ///Este estado es para el email
  const [telefono, setTelefono] = useState('');                ///Este estado es para el telefono
  const [direccion, setDireccion] = useState('');              ///Este estado es para la direccion
  const [tipoBicicleta, setTipoBicicleta] = useState('');      ///Este estado es para el tipo de bicicleta
  const [mantenimiento, setMantenimiento] = useState('');      ///Este estado es para el mantenimiento

  const mantenimientosPorBicicleta = {                                            ///Este constante es para los mantenimientos por bicicleta
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
          {/* Este form es para el formulario de agendación */}
          <label>
            Seleccione si su servicio será en nuestras instalaciones o Taller a Domicilio 
            <select>
              {/* Este select es para el tipo de servicio */}
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
              // Este select es para el tipo de bicicleta el cual con el onchange se actualiza el estado de la variable tipoBicicleta para que se pueda mostrar en la seccion de detalles
              required
            >
              <option value="">Seleccione el tipo de bicicleta</option>
              <option value="montana">Montaña</option>
              <option value="ruta">Ruta</option>
              <option value="bmx">BMX</option>
              <option value="electrica">Eléctrica</option>
              {/* Las opciones que se muestran en el select son las que se encuentran en la constante mantenimientosPorBicicleta */}
            </select>
          </label>

          <label>
            Tipo de mantenimiento
            <select 
              value={mantenimiento}
              ///Este value es para el mantenimiento que se selecciona
              onChange={(e) => setMantenimiento(e.target.value)} 
              ///Este onChange se actualiza el estado de la variable mantenimiento para que se pueda mostrar en la seccion de detalles
              disabled={!tipoBicicleta}
              ///Este disabled se deshabilita el select si el tipo de bicicleta no esta seleccionado
              required
            >
              <option value="">Seleccione un mantenimiento</option>
              {/* Las opciones que se muestran en el select son las que se encuentran en la constante mantenimientosPorBicicleta */}
              {tipoBicicleta && mantenimientosPorBicicleta[tipoBicicleta].map((mantenimiento, index) => (
                ///tipoBicicleta y mantenimientosPorBicicleta son constantes que se encuentran en la seccion de mantenimiento
                //que con el map se muestran las opciones que se encuentran en mantenimientosPorBicicleta
                <option key={index} value={mantenimiento}>{mantenimiento}</option>
              ))}
            </select>
          </label>

          <label>
            ¿En qué fecha le gustaría visitarnos/recibirnos? 
            <input 
              type="date" 
              value={fecha}
              ///Este value es para la fecha que se selecciona
              onChange={(e) => setFecha(e.target.value)} 
              ///Este onChange se actualiza el estado de la variable fecha
              required 
            />
          </label>

          <label>
            Hora de la cita 
            <input 
              type="time" 
              value={hora}
              ///Este value es para la hora que se selecciona
              onChange={(e) => setHora(e.target.value)}
              ///Este onChange se actualiza el estado de la variable hora
              required 
            />
            <small>Servicio a domicilio disponible entre 08:00 a.m. y 05:00 p.m.</small>
          </label>

          <label>
            Nombre 
            <input 
              type="text" 
              value={nombre}
              // Este value es para el nombre que se escribe
              onChange={(e) => setNombre(e.target.value)}
              // Este onChange se actualiza el estado de la variable nombre
              required 
            />
          </label>

          <label>
            Apellidos 
            <input 
              type="text" 
              value={apellidos}
              // Este value es para el apellido que se escribe
              onChange={(e) => setApellidos(e.target.value)}
              ///Este onChange se actualiza el estado de la variable apellidos
              required 
            />
          </label>

          <label>
            Email 
            <input 
              type="email" 
              value={email}
              ///Este value es para el email que se escribe
              onChange={(e) => setEmail(e.target.value)}
              ///Este onChange se actualiza el estado de la variable email
              required 
            />
          </label>

          <label>
            Teléfono
            <input 
              type="tel" 
              value={telefono}
              ///Este value es para el telefono que se escribe
              onChange={(e) => setTelefono(e.target.value)}
              ///Este onChange se actualiza el estado de la variable telefono
            />
          </label>

          <label>
            Compártanos su dirección (sólo en caso de servicio móvil) o cualquier información adicional 
            <textarea 
              value={direccion}
              // Este value es para la direccion que se escribe
              onChange={(e) => setDireccion(e.target.value)}
              // Este onChange se actualiza el estado de la variable direccion
              required
            ></textarea>
          </label>

          <button type="submit" className="btn-submit">ENVIAR</button>
          {/* Este button es para enviar el formulario */}
          
          <ScrollButton />
        </form>
      </div>
    </div>
  );
};

export default Agendar;
