import React, { useState } from 'react';
import '../styles/Contacto.css';
import Navbar from '../components/Navbar';
import emailjs from 'emailjs-com';

const Contacto = () => {
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    sujeto: '',
    mensaje: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const enviarCorreo = (e) => {
    e.preventDefault();

    emailjs.send(
      'service_pwt3uzp',
      'template_vst2qoe',
      {
        nombre: datos.nombre,
        correo: datos.correo,
        telefono: datos.telefono,
        sujeto: datos.sujeto,
        mensaje: datos.mensaje
      },
      '2WpRvMS3xruYJ7EZ0'
    )
    .then(() => {
      alert('Mensaje enviado con éxito!');
      setDatos({
        nombre: '',
        correo: '',
        telefono: '',
        sujeto: '',
        mensaje: ''
      });
    })
    .catch((error) => {
      console.error('Error al enviar el mensaje:', error);
      alert('Error al enviar el mensaje, por favor intenta nuevamente.');
    });
  };

  return (
    <div>
      <Navbar />
      <div className='contact'>
        <h2>Contacta con nosotros</h2>
        <form onSubmit={enviarCorreo}>
          <div className='input-box'>
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

            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default Contacto;
