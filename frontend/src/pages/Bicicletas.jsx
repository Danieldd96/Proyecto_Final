import React , { useState,useEffect } from 'react';
import Navbar from '../components/navbar';
import ScrollButton from '../components/ScrollButton';
import '../styles/Bicicletas.css';
import { Get } from '../hooks/Get';
import CasillasHorizontales from '../components/CasillasHorizontales';


const Bicicletas = () => {
  const [productos, setProductos] = useState([]);       ///Const para guardar los productos
  const api = 'http://127.0.0.1:8000/api/v3/producto/productos/';

  const obtenerProductos = async () => {
      const data = await Get(api);
      const productosFiltrados = data.filter(producto => producto.categoria === 'Bicicletas');
      ///Filtro para solo mostrar bicicletas
      setProductos(productosFiltrados);
      ///Asignar los productos a la variable
  };
  
  useEffect(() => {
    // Obtener los productos al cargar la página
    obtenerProductos();
  }, []);

  const Tipos = {   //// Objeto para almacenar los tipos de bicicletas
    Electrica:'src/img/bicicleta-electrica.jpg',
    Montaña:'src/img/mountain-bike.jpg',
    Ruta:'src/img/road-bike.jpg',
    BMX:'src/img/bmx-bike.jpg'
  }


  return (
    <div>
      <Navbar />

      <ScrollButton />

      <div className="container">

        <div className="content">
          <div className="image-row">

            {Object.entries(Tipos).map(([tipo, imagen], index) => (
              //El objeto Tipos es un objeto con las imagenes de los tipos de bicicletas
              <div key={index}>
                <img src={imagen} alt={`Tipo ${tipo}`} />
                  <h2>{tipo}</h2>
              </div>
            ))}
          </div>
          <div>
            
          </div>
            <h1 style={{borderBottom:"solid 5px #8b0000",paddingBottom:10,paddingLeft:20}}>Bicicletas</h1>
            <div className="product-container">
              {productos.map((producto, index) => (
                //La constante productos es un array con los productos el cual con el map pasamos al componente casillasHorizontales
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

export default Bicicletas
