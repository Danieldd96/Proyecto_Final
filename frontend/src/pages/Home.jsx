import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Carrusel from '../components/carrusel';
import "../styles/home.css";
import Casillas from '../components/Casillas';
import { Grid } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import ScrollButton from '../components/ScrollButton';
import { Get } from '../hooks/Get';

function Home() {
  const apiurl = 'http://127.0.0.1:8000/api/v3/producto/productos/';  // URL de la API para obtener productos
  const [productos, setProductos] = useState({});  // Estado para almacenar productos organizados por categoría

  // Función para obtener los productos de la API y organizarlos por categorías
  const obtenerProductos = async () => {
    const data = await Get(apiurl);  // Llama a la función Get para obtener los datos de la API

    const categorias = ['Bicicletas', 'Nutrición', 'Ropa', 'Accesorios', 'Piezas'];  // Define las categorías de productos
    const productosFiltrados = {};  // Objeto para almacenar los productos filtrados

    // Filtra los productos por cada categoría
    categorias.forEach(categoria => {
      productosFiltrados[categoria] = data.filter(producto => producto.categoria === categoria);
    });

    setProductos(productosFiltrados);  // Actualiza el estado con los productos organizados por categoría
  };

  // Hook que se ejecuta una vez para obtener los productos al cargar el componente
  useEffect(() => {
    obtenerProductos();
  }, []); 

  // Hook para hacer scroll al inicio de la página al cargar el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ border: "solid 1px", borderColor: "white" }}>
      <Navbar />
      <Carrusel />
      <ScrollButton />

      <div className='home'>
        <div style={{ padding: 50, margin: 0 }}>
          {/* Recorre las categorías y muestra los productos destacados de cada una */}
          {Object.keys(productos).map((categoria) => (
            <div key={categoria}>
              <h1>{`Productos Destacados - ${categoria}`} 
                <Link to={`/${categoria.toLowerCase()}`} style={{ marginLeft: 400, fontSize: 20 }}>Ver Todo</Link>
              </h1>
              <Grid columns="4" width="auto" gap="4" p={"9"}>
                {/* Muestra los productos dentro de cada categoría */}
                {productos[categoria].map((producto, index) => (
                  <Casillas key={index} producto={producto} />
                ))}
              </Grid>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
