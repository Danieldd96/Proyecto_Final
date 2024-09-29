import React from 'react'
import { useState,useEffect } from 'react'
import { Box,Card,Inset,Strong,Text,Button,Heading } from '@radix-ui/themes'
import '../styles/Casillas.css';

function Casillas({ producto }) {
  const [Hover,setHover]=useState(false);
  const [Cantidad, setCantidad] = useState(1);
  const [precioTotal, setPrecioTotal] = useState(producto.precio);

  const Cantidades = (e) => {
    const nuevaCantidad = parseInt(e.target.value, 6);
    if (nuevaCantidad > 0) {
      setCantidad(nuevaCantidad);
    }
  };
  
  useEffect(() => {
    setPrecioTotal(Cantidad * producto.precio);
  }, [Cantidad, producto.precio]);


  return (
    <Box maxWidth="240px" className='caja-producto' onMouseEnter={()=>setHover(true)} onMouseLeave={()=> setHover(false)}>
      
  <Card size="2">
    <Inset clip="padding-box" side="top" pb="current">
      <img
        src={producto.imagen}
        alt={producto.nombre}
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
      <Strong>{producto.nombre}</Strong> - ${producto.precio}
    </Text>
    <div className={`producto-modal ${Hover ? 'visible' : ''}`}>
      <Heading>{producto.nombre}</Heading>
      <Text as='p'>Precio unidad:${producto.precio}</Text>
      <Text as='p'>Cantidad</Text>
      <input 
      type="number"
      value={Cantidad}
      onChange={Cantidades}
      min="1"
      max="5"
      />
      <Text as='p' style={{marginTop:"10px"}}>Precio Total: ${precioTotal}</Text>
      <Box>
        <Button>Agregar al carrito</Button>
      </Box>
    </div>
  </Card>
</Box>

  )
}

export default Casillas
