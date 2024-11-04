import React , { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import ScrollButton from '../components/ScrollButton';
import '../styles/Bicicletas.css';
import { Get } from '../hooks/Get';
import CasillasHorizontales from '../components/CasillasHorizontales';


const Accesorios = () => {
    const [productos, setProductos] = useState([]);     /// Este estado se usa para mostrar los productos en la página
    const api = 'http://127.0.0.1:8000/api/v3/producto/productos/';     /// Esta es la url de la api de la que se obtendran los productos
  
    const obtenerProductos = async () => {    /// Esta función se encarga de obtener los productos de la api
        const data = await Get(api);
        const productosFiltrados = data.filter(producto => producto.categoria === 'Partes' || producto.categoria === 'Ropa' || producto.categoria === 'Nutrición');
        //// Esta línea se encarga de filtrar los productos de acuerdo a la categoria que se seleccione
        setProductos(productosFiltrados);
    };
    
    useEffect(() => {      /// Esta función se encarga de llamar a la función de obtener productos
      obtenerProductos();
    }, []);
  
    const Tipos = {      /// Esta es la variable que se utiliza para mostrar los diferentes tipos de productos
      Partes:'src/img/bicicleta-electrica.jpg',
      Ropa:'src/img/mountain-bike.jpg',
      Nutricion:'src/img/road-bike.jpg',
    }
  
  return (
    <div>
        <Navbar />
        <ScrollButton />
        {/* El scroll button se encarga de desplazarse a la página de acuerdo a donde se esté scrollando */}
        <div className="container">

            <div className="content">
                <div className="image-row">
                    {/* Esta es la imagen que se muestra en la parte superior de la página */}
                    {Object.entries(Tipos).map(([tipo, imagen], index) => (
                        // El object entries se utiliza para iterar sobre el objeto Tipos
                        <div key={index}>
                            <img src={imagen} alt={`Tipo ${tipo}`} />
                            <h2>{tipo}</h2>
                        </div>
                    ))}
                </div>

                <h1 style={{borderBottom:"solid 5px #8b0000",paddingBottom:10,paddingLeft:20}}>Productos</h1>

                <div className="product-container">
                    {/* Esta es la sección que se encarga de mostrar los diferentes productos por medio del map */}
                    {productos.map((producto, index) => (
                        <div key={index} className="product-card">
                            <CasillasHorizontales producto={producto} />
                            {/* CasillasHorizontales es el componente que se encarga de mostrar las diferentes opciones de cada producto */}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    </div>
  )
}

export default Accesorios
