import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Text } from '@radix-ui/themes'
import '../styles/CasillasHorizontales.css';
import { useNavigate } from 'react-router-dom';
import {crearCookie, traerCookie} from '../hooks/Cookies'

function CasillasHorizontales({ producto }) {
  const [cantidad, setCantidad] = useState(1);
  const [precioTotal, setPrecioTotal] = useState(producto.precio);
  const navigate = useNavigate();

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
    navigate("/producto");
  };

  const agregarAlCarrito = () => {
    let itemsCarrito = JSON.parse(traerCookie("ids")) || [];
    itemsCarrito.push(producto.id);
    crearCookie("ids", JSON.stringify(itemsCarrito));
    crearCookie("usuarioCarrito", traerCookie("idUsuario"));
    navigate(`/carrito`);
  };

  return (
    <Box
      className='card'    >
      <div className="imgBx">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <div className="details">
        <Heading as="h3">
          {producto.nombre} <br />
          <span>{producto.tipo}</span>
        </Heading>
        <h4>Descripción</h4>
        <p>{producto.descripcion}</p>
        <h4>Cantidad</h4>
        <input
          type="number"
          value={cantidad}
          onChange={manejarCantidad}
          min="1"
          max="5"
          className="cantidad-input"
        />
          <h2>
            ₡{precioTotal.toFixed(2)}
          </h2>
        <div className="group">
          <Button onClick={informacionProducto} className="buy-now-btn">
            Más Información
          </Button>
          <Button onClick={agregarAlCarrito} className="buy-now-btn">
            Agregar al carrito
          </Button>
        </div>
      </div>
    </Box>
  );
}

export default CasillasHorizontales;
