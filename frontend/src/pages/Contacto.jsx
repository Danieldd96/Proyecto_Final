import React, { useState } from 'react';
import '../styles/Contacto.css';
import Navbar from '../components/Navbar';
import emailjs from 'emailjs-com';

const Contacto = () => {
  // Estado para almacenar los datos del formulario de contacto
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    sujeto: '',
    mensaje: ''
  })

  // Maneja el cambio en los campos del formulario y actualiza el estado
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  // Envía el correo usando la biblioteca emailjs
  const enviarCorreo = (e) => {
    e.preventDefault(); // Evita la recarga de la página

    // Configura los datos para el envío de email usando el servicio y template de emailjs
    emailjs.send(
      'service_pwt3uzp', // ID del servicio de emailjs
      'template_vst2qoe', // ID del template de emailjs
      {
        nombre: datos.nombre,
        correo: datos.correo,
        telefono: datos.telefono,
        sujeto: datos.sujeto,
        mensaje: datos.mensaje
      },
      '2WpRvMS3xruYJ7EZ0' // Llave pública de emailjs
    )
    .then(() => {
      alert('Mensaje enviado con éxito!'); // Alerta en caso de éxito
      // Reinicia el estado del formulario después del envío
      setDatos({
        nombre: '',
        correo: '',
        telefono: '',
        sujeto: '',
        mensaje: ''
      });
    })
    .catch((error) => {
      console.error('Error al enviar el mensaje:', error); // Muestra el error en la consola
      alert('Error al enviar el mensaje, por favor intenta nuevamente.'); // Alerta en caso de error
    });
  };

  return (
    <div>
      <Navbar />
      <div className='contact'>
        <h2>Contacta con nosotros</h2>
        <form onSubmit={enviarCorreo}>
          <div className='input-box'>
            {/* Campo de nombre completo */}
            <div className='input-field field'>
              <input
                className='item'
                type="text"
                name="nombre"
                value={datos.nombre}
                onChange={handleInputChange}
                placeholder=" "
                autoComplete='off'
                required
              />
              <label>Nombre completo</label>
            </div>

            {/* Campo de correo */}
            <div className='input-field field'>
              <input
                className='item'
                type="email"
                name="correo"
                value={datos.correo}
                onChange={handleInputChange}
                placeholder=" "
                autoComplete='off'
                required
              />
              <label>Correo</label>
            </div>

            {/* Campo de teléfono */}
            <div className='input-field field'>
              <input
                className='item'
                type="tel"
                name="telefono"
                value={datos.telefono}
                onChange={handleInputChange}
                placeholder=" "
                autoComplete='off'
                required
              />
              <label>Teléfono</label>
            </div>

            {/* Campo de sujeto */}
            <div className='input-field field'>
              <input
                className='item'
                type="text"
                name="sujeto"
                value={datos.sujeto}
                onChange={handleInputChange}
                placeholder=" "
                autoComplete='off'
                required
              />
              <label>Sujeto</label>
            </div>

            {/* Campo de mensaje */}
            <div className='textarea-field field'>
              <textarea
                className='item'
                name="mensaje"
                value={datos.mensaje}
                onChange={handleInputChange}
                placeholder=" "
                autoComplete='off'
                cols="30"
                rows="10"
                required
              ></textarea>
              <label>Mensaje</label>
            </div>

            {/* Botón para enviar el formulario */}
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contacto;
