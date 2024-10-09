import React, { useState, useEffect } from 'react';
import '../styles/carrusel.css';

const items = [
  {
    img: '/src/img/6b3a2e2a7dcfdb9b38ac71c29bfcc60c.jpg',
    title: 'Bicicletas',
    description:
      'Tenemos un gran catálogo de bicicletas para que puedas encontrar la que más te convenga',
  },
  {
    img: '/src/img/115062.jpg',
    title: 'Accesorios',
    description:
      'Tenemos una gran cantidad de accesorios para que puedas disfrutar de tus bicicletas',
  },
  {
    img: '/src/img/bicicleta-electrica.jpg',
    title: 'Partes',
    description:
      'Tenemos repuestos de todo tipo de bicicletas junto a herramientos para que puedas dar el mejor mantenimiento a tu bicicleta',
  },
  {
    img: '/src/img/mountain-bike.jpg',
    title: 'Ropa',
    description:
      'Nuestro catologo de ropa es muy completo para usuarios casuales y profesionales',
  },
  {
    img: '/src/img/bmx-bike.jpg',
    title: 'Nutricion',
    description:
      'En esta seccion encontraras una gran variedad de suplementos alimenticios',
  },
];

const Carrusel = () => {
  const [itemActive, setItemActive] = useState(0);
  const countItem = items.length;

  const nextSlide = () => {
    setItemActive((prev) => (prev + 1) % countItem);
  };

  const prevSlide = () => {
    setItemActive((prev) => (prev - 1 + countItem) % countItem);
  };

  const miniaturas = (index) => {
    setItemActive(index);
  };

  useEffect(() => {
    const autoPlay = setInterval(() => {
      nextSlide();
    }, 9000);

    return () => clearInterval(autoPlay); 
  }, []);

  return (
    <div className="slider">
      <div className="list">
        {items.map((item, index) => (
          <div key={index} className={`item ${itemActive === index ? 'active' : ''}`}>
            <img src={item.img} alt={item.title} />
            <div className="content">
              <p>Bicicletas LOGO</p>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows">
        <button onClick={prevSlide}>&lt;</button>
        <button onClick={nextSlide}>&gt;</button>
      </div>

      <div className="thumbnail">
        {items.map((item, index) => (
          <div
            key={index}
            className={`item ${itemActive === index ? 'active' : ''}`}
            onClick={() => miniaturas(index)}
          >
            <img src={item.img} alt={`Thumbnail of ${item.title}`} />
            <div className="content">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrusel;
