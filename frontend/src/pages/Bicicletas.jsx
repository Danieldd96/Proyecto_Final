import React , { useState } from 'react';
import Navbar from '../components/Navbar';
import Casillas from './Casillas';
import ScrollButton from '../components/ScrollButton';
import '../styles/Bicicletas.css';


const Bicicletas = () => {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false); 

  const productosBicicletas = [
    { nombre: 'Bicicleta Eléctrica', precio: 1500, imagen: 'src/img/bicicleta-electrica.jpg' },
    { nombre: 'Bicicleta de Montaña', precio: 1200, imagen: '/src/img/mountain-bike.jpg' },
    { nombre: 'Bicicleta de Ruta', precio: 900, imagen: '/src/img/road-bike.jpg' },
    { nombre: 'Bicicleta BMX', precio: 800, imagen: '/src/img/bmx-bike.jpg' },
  ];

  const Tipos = [
    '/src/img/mountain-bike.jpg',
    '/src/img/road-bike.jpg',
    'src/img/bicicleta-electrica.jpg',
    '/src/img/bmx-bike.jpg'
  ];

  return (
    <div>
      <Navbar />

      <ScrollButton />

      <div>

        <div className={`sidebar ${filtrosAbiertos ? 'sidebar-open' : ''}`}>
          <h2>BICICLETAS</h2>
          <div className="scrollable-filters">
            <h2>Filtros</h2>
            <h2>filtro 1</h2>
            <h2>filtro 2</h2>
            <h2>filtro 3</h2>
          </div>
        </div>

        <div>
          <div>

        <button className="filter-button" onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}>
          {filtrosAbiertos ? 'Cerrar Filtros' : 'Abrir Filtros'}
        </button>
            {Tipos.map((imagen, index) => (
              <img key={index} src={imagen}/>
            ))}
          </div>

          <h1>Bicicletas</h1>
          <div>
            {productosBicicletas.map((producto, index) => (
              <div key={index}>
                <Casillas producto={producto} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bicicletas
