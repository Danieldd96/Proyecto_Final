import React from 'react'
import Navbar from '../components/navbar'
import Carrusel from '../components/carrusel'
import "../styles/home.css"
import Casillas from './Casillas'
import { Grid } from '@radix-ui/themes'

function Home() {
  return (
    <div style={{border:"solid 1px",borderColor:"white"}}>
      <Navbar />
      <Carrusel/>
      <div className='home'>
      <h1 style={{marginBottom:50,padding:20, borderBottomWidth:50}}>Productos Destacados</h1>
      <Grid columns="4" width="auto" gap="4">
        <Casillas />
        <Casillas />
        <Casillas />
        <Casillas />
      </Grid>
      </div>
    </div>
  )
}

export default Home
