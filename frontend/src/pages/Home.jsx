import React from 'react'
import Navbar from '../components/navbar'
import Carrusel from '../components/carrusel'
import "../styles/home.css"
import Casillas from './Casillas'
import { Grid,Link } from '@radix-ui/themes'

function Home() {
  return (
    <div style={{border:"solid 1px",borderColor:"white"}}>
      <Navbar />
      <Carrusel/>
      <div className='home'>
      <div style={{padding:50, margin:0}}>
      <h1 >Productos Destacados Bicicletas<Link style={{marginLeft:400,fontSize:20}}>Ver Todo</Link></h1>
      <Grid columns="4" width="auto" gap="4" p={"9"}>
        <Casillas />
        <Casillas />
        <Casillas />
        <Casillas />
      </Grid>
      </div>
      <div style={{padding:50, margin:0}}>
      <h1>Productos Destacados Piezas<Link style={{marginLeft:400,fontSize:20}}>Ver Todo</Link></h1>
      <Grid columns="4" width="auto" gap="4" p={"9"}>
        <Casillas />
        <Casillas />
        <Casillas />
        <Casillas />
      </Grid>
      </div>
      <div style={{padding:50, margin:0}}>
      <h1>Productos Destacados Ropa<Link style={{marginLeft:400,fontSize:20}}>Ver Todo</Link></h1>
      <Grid columns="4" width="auto" gap="4" p={"9"}>
        <Casillas />
        <Casillas />
        <Casillas />
        <Casillas />
      </Grid>
      </div>
      </div>
    </div>
  )
}

export default Home
