import React , { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import Casillas from '../components/Casillas';
import ScrollButton from '../components/ScrollButton';
import '../styles/Bicicletas.css';
import { Get } from '../hooks/Get';
import CasillasHorizontales from '../components/CasillasHorizontales';


const Accesorios = () => {
    const [filtrosAbiertos, setFiltrosAbiertos] = useState(false); 

    const [productos, setProductos] = useState([]);
  
    const obtenerProductos = async () => {
        const data = await Get('http://127.0.0.1:8000/api/v3/producto/productos/');
        const productosFiltrados = data.filter(producto => producto.categoria === 'Partes' || producto.categoria === 'Ropa' || producto.categoria === 'Nutrición');
        setProductos(productosFiltrados);
    };
    
    useEffect(() => {
      obtenerProductos();
    }, []);
  
    const Tipos = {
      Partes:'src/img/bicicleta-electrica.jpg',
      Ropa:'src/img/mountain-bike.jpg',
      Nutricion:'src/img/road-bike.jpg',
    }
  
  return (
    <div>
        <Navbar />

        <ScrollButton />

        <div className="container">

        <div className={`sidebar ${filtrosAbiertos ? 'sidebar-open' : ''}`}>
            <h2>Productos</h2>
            <div className="scrollable-filters">
            <h2>Filtros</h2>
            <h2>filtro 1</h2>
            <h2>filtro 2</h2>
            <h2>filtro 3</h2>
            </div>
        </div>

        <div className="content">
            <div className="image-row">

            {Object.entries(Tipos).map(([tipo, imagen], index) => (
            <div key={index}>
                <img src={imagen} alt={`Tipo ${tipo}`} />
                <h2>{tipo}</h2>
            </div>
            ))}
            </div>
            <div>
            
            </div>
            <h1 style={{borderBottom:"solid 5px #8b0000",paddingBottom:10,paddingLeft:20}}>Productos</h1>
        <button className="filter-button" onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}>
            {filtrosAbiertos ? 'Cerrar Filtros' : 'Abrir Filtros'}
        </button>
            <div className="product-container">
            {productos.map((producto, index) => (
                <div key={index} className="product-card">
                <CasillasHorizontales producto={producto} />
                </div>
            ))}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Accesorios
