import React from 'react'
import Navbar from '../components/navbar'
import Carrusel from '../components/carrusel'
import "../styles/home.css"

function Home() {
  return (
    <div>
      <Navbar />
      <Carrusel/>
      <div className='home'>
      <h1>Hola world </h1>
      <div>

      </div>
      </div>
    </div>
  )
}

export default Home
