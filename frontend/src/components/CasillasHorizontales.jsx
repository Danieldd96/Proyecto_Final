import React, { useState, useEffect } from 'react';
import { Box, Card, Inset, Strong, Text, Button, Heading } from '@radix-ui/themes';
import '../styles/CasillasHorizontales.css';
import { useNavigate } from 'react-router-dom';
import {crearCookie, traerCookie} from '../hooks/Cookies'

function CasillasHorizontales({ producto }) {
  const [hover, setHover] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [precioTotal, setPrecioTotal] = useState(producto.precio);
  const navegar = useNavigate();

  const manejarCantidad = (e) => {
    const nuevaCantidad = parseInt(e.target.value, 10);
    if (nuevaCantidad > 0) {
      setCantidad(nuevaCantidad);
    }
  };

  useEffect(() => {
    setPrecioTotal(cantidad * producto.precio);
  }, [cantidad, producto.precio]);

  const informacionProducto = () => {
    crearCookie("IdInfoProducto", producto.id);
    navegar(`/producto/${producto.nombre}`);
  };

  const agregarAlCarrito = () => {
    let itemsCarrito = JSON.parse(traerCookie("ids")) || [];
    itemsCarrito.push(producto.id);
    crearCookie("ids", JSON.stringify(itemsCarrito));
    crearCookie("usuarioCarrito", traerCookie("idUsuario"));
    navegar(`/carrito`);
  };

  return (
    <Box className='caja-producto-horizontal' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Card size="2" style={{ display: 'flex', flexDirection: 'row' }}>
        <Inset clip="padding-box" >
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{
              display: 'block',
              objectFit: 'cover',
              width: '700px',
              height: '210px',
              marginRight:'150px',
            }}
          />
        </Inset>
        <Box>
          <div className={`producto-modal ${hover ? 'visible' : ''}`}>
            <Heading>{producto.nombre}</Heading>
            <Text as='p'>Precio unidad: ₡{producto.precio}</Text>
            <Text as='p'>Cantidad</Text>
            <input 
              type="number"
              value={cantidad}
              onChange={manejarCantidad}
              min="1"
              max="5"
            />
            <Text as='p' style={{ marginTop: "35px" }}>Precio Total: ₡{precioTotal}</Text>
            <Box>
              <Button onClick={informacionProducto}>Más Información</Button>
              <Button onClick={agregarAlCarrito}>Agregar al carrito</Button>
            </Box>
          </div>
        </Box>
      </Card>
    </Box>
  );
}

export default CasillasHorizontales;
