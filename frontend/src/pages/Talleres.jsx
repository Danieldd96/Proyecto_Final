import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Talleres.css'; 

const servicios = [
  {
    icono: '/src/img/firefly.gif', 
    titulo: 'Mantenimiento de Bicicletas Eléctricas',
    descripcion: 'Revisión y reparación de motor, batería, y componentes eléctricos.',
    enlace: '/servicio-mantenimiento-bicicletas-electricas'
  },
  {
    icono: '/src/img/firefly.gif',
    titulo: 'Ajuste y Reparación de Bicicletas de Ruta',
    descripcion: 'Ajuste de cambios, reparación de ruedas y frenos, revisión de transmisión.',
    enlace: '/servicio-ajuste-bicicletas-ruta'
  },
  {
    icono: '/src/img/firefly.gif', 
    titulo: 'Servicio de Bicicletas BMX',
    descripcion: 'Ajuste de frenos, revisión de ruedas y cuadros, reemplazo de piezas desgastadas.',
    enlace: '/servicio-reparacion-bicicletas-bmx'
  },
  {
    icono: '/src/img/firefly.gif',
    titulo: 'Mantenimiento de Bicicletas de Montaña',
    descripcion: 'Servicio de suspensión, ajuste de cambios, y mantenimiento de frenos de disco.',
    enlace: '/servicio-mantenimiento-bicicletas-montana'
  }
];

const Talleres = () => {
  const [animateBanner, setAnimateBanner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimateBanner(true);
  }, []);

  const redireccionar = () => {
    navigate('/agendar');
  };

  return (
    <div>
      <Navbar />
      <div className={`banner ${animateBanner ? 'animate' : ''}`}>
        <div className="banner-text">
          <h1>EXPERTOS EN BICICLETAS</h1>
          <p>Aqui tenemos lo mejor para tu bicicleta, siempre disponible.</p>
          <button className="btn-primary" onClick={redireccionar}>
            AGENDA TU CITA
          </button>
        </div>
        <img src="/src/img/road-bike.jpg" alt="Agendar" className="banner-image" />
      </div>
      <div className='title-section'>
        <h2>Nuestros Servicios</h2>
      </div>

      <div className="section section-services">
        <div className="services-grid">
          {servicios.map((servicio, index) => (
            <div key={index} className="service-card">
              <div className="service-front">
                <img src={servicio.icono} alt={servicio.titulo} className="service-icon" />
                <h3>{servicio.titulo}</h3>
              </div>
              <div className="service-back">
                <p>{servicio.descripcion}</p>
                <a href={servicio.enlace} className="btn-red">
                  Ver Servicio
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Talleres;
