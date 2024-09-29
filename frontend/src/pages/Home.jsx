import React from 'react'
import Navbar from '../components/navbar'
import Carrusel from '../components/carrusel'
import "../styles/home.css"
import Casillas from './Casillas'
import { Grid,Link } from '@radix-ui/themes'

function Home() {
  const productosBicicletas = [
    { nombre: 'Bicicleta Eléctrica', precio: 1500, imagen: 'src/img/bicycle-1839005_1920.jpg' },
    { nombre: 'Bicicleta de Montaña', precio: 1200, imagen: '' },
    { nombre: 'Bicicleta de Ruta', precio: 900, imagen: '' },
    { nombre: 'Bicicleta BMX', precio: 800, imagen: '' },
  ];

  return (
    <div style={{border:"solid 1px",borderColor:"white"}}>
      <Navbar />
      <Carrusel/>
      <div className='home'>
      <div style={{padding:50, margin:0}}>
      <h1 >Productos Destacados Bicicletas<Link style={{marginLeft:400,fontSize:20}}>Ver Todo</Link></h1>
      <Grid columns="4" width="auto" gap="4" p={"9"}>

        {productosBicicletas.map((producto, index) => (
          <Casillas key={index} producto={producto} />
        ))}
        
      </Grid>
      </div>
      </div>
    </div>
  )
}

export default Home
