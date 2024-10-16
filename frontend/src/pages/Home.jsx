import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Carrusel from '../components/carrusel'
import "../styles/home.css"
import Casillas from '../components/Casillas'
import { Grid } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import ScrollButton from '../components/ScrollButton'
import { Get } from '../hooks/Get'

function Home() {
  const apiurl = 'http://127.0.0.1:8000/api/v3/producto/productos/';
  const [productos, setProductos] = useState({});

  const obtenerProductos = async () => {
    const data = await Get(apiurl);

    const categorias = ['Bicicletas', 'Nutrición', 'Ropa', 'Accesorios', 'Piezas'];
    const productosFiltrados = {};

    categorias.forEach(categoria => {
      productosFiltrados[categoria] = data.filter(producto => producto.categoria === categoria);
    });

    setProductos(productosFiltrados);
  };

  useEffect(() => {
    obtenerProductos();
  }, []); 

  return (
    <div style={{border:"solid 1px",borderColor:"white"}}>
      <Navbar />
      <Carrusel/>
      <ScrollButton />

      <div className='home'>
        <div style={{padding:50, margin:0}}>
          {Object.keys(productos).map((categoria) => (
            <div key={categoria}>

              <h1>{`Productos Destacados - ${categoria}`} <Link to={`/${categoria.toLowerCase()}`} style={{ marginLeft: 400, fontSize: 20 }}>Ver Todo</Link></h1>
              <Grid columns="4" width="auto" gap="4" p={"9"}>

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
