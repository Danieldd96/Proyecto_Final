import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/carrusel.css';

const diapositivas = [
  {
    imagenFondo: 'src/img/6b3a2e2a7dcfdb9b38ac71c29bfcc60c.jpg',
    imagenPequeña: 'src/img/6b3a2e2a7dcfdb9b38ac71c29bfcc60c.jpg',
    titulo: 'Bicicletas',
    descripcion: 'Tenemos una gran variedad de bicicletas para todo tipo usuario con muy buenos precios y calidad garantizada .',
    link: '/bicicletas',
  },
  {
    imagenFondo: '',
    imagenPequeña: 'src/img/bicycle-1839005_1920.jpg',
    titulo: 'Nuestros Servicios',
    descripcion: '',
    link: '',
  },
  {
    imagenFondo: '',
    imagenPequeña: '',
    titulo: '',
    descripcion: '',
    link: '', 
  },
];

const Carrusel = () => {
    const [indice, setIndice] = useState(0);
    const [visible, setVisible] = useState(true);
  
    const siguiente = () => {
      setVisible(false);
      setTimeout(() => {
        setIndice((prev) => (prev + 1) % diapositivas.length);
        setVisible(true);
      }, 500);
    };
  
    const anterior = () => {
      setVisible(false); 
      setTimeout(() => {
        setIndice((prev) => (prev - 1 + diapositivas.length) % diapositivas.length);
        setVisible(true); 
      }, 500); 
    };
  
    return (
      <div className="carrusel">
        <div className={`diapositiva ${visible ? 'visible' : ''}`} style={{ backgroundImage: `url(${diapositivas[indice].imagenFondo})` }}>
          <div className="contenido">
            <Link to={diapositivas[indice].link}>
              <img src={diapositivas[indice].imagenPequeña} alt={diapositivas[indice].titulo} className="imagen-pequeña" />
            </Link>
            <div className="textos">
              <Link to={diapositivas[indice].link}>
                <h2>{diapositivas[indice].titulo}</h2>
              </Link>
              <p>{diapositivas[indice].descripcion}</p>
            </div>
          </div>
        </div>

        <button className='btncarrusel' onClick={anterior}>&lt;</button>
        <button className='btncarrusel' onClick={siguiente}>&gt;</button>
      </div>
    );
  };
  

export default Carrusel;
