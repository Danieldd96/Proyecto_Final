import React from 'react'
import { useState } from 'react'
import { Box,Card,Inset,Strong,Text,Button,Heading } from '@radix-ui/themes'
import '../styles/Casillas.css';

function Casillas() {
  const [Hover,setHover]=useState(false);
  return (
    <Box maxWidth="240px" className='caja-producto' onMouseEnter={()=>setHover(true)} onMouseLeave={()=> setHover(false)}>
      
  <Card size="2">
    <Inset clip="padding-box" side="top" pb="current">
      <img
        src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        alt="Bold typography"
        style={{
          display: 'block',
          objectFit: 'cover',
          width: '100%',
          height: 140,
          backgroundColor: 'var(--gray-5)',
        }}
      />
    </Inset>
    <Text as="p" size="3">
      <Strong>Nombre</Strong> - Precio
    </Text>
    <div className={`producto-modal ${Hover ? 'visible' : ''}`}>
      <Heading>Producto Nombre</Heading>
      <Text as='p'>Precio unidad:Precio</Text>
      <Text as='p'>Cantidad</Text>
      <input 
      type="number"
      // value=
      // onChange={}
      min="1"
      max="5"
      />
      <Text as='p' style={{marginTop:"10px"}}>Precio Total: Precio</Text>
      <Box>
        <Button>Agregar al carrito</Button>
      </Box>
    </div>
  </Card>
</Box>

  )
}

export default Casillas
