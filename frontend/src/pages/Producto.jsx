import React, { useState, useEffect } from 'react';
import Casillas from '../components/Casillas';
import Navbar from '../components/Navbar';
import '../styles/Producto.css';
const Producto = () => {
    const nombre = localStorage.getItem("nombre");
    const precioBase = parseFloat(localStorage.getItem("precio"));
    const descripcion = localStorage.getItem("descripcion");
    const imagen = localStorage.getItem("imagen");
    const [cantidad, setCantidad] = useState(1);
    const [precioTotal, setPrecioTotal] = useState(precioBase);

    useEffect(() => {
        setPrecioTotal(precioBase * cantidad);
    }, [cantidad, precioBase]);

    const incrementarCantidad = () => {
        setCantidad(prevCantidad => prevCantidad + 1);
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(prevCantidad => prevCantidad - 1);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="product-container">
                <div className="product-header">
                        <h1>{nombre}</h1>
                    <div className="product-details">

                        <div className="more-info">
                            <h2>MÁS INFORMACIÓN</h2>
                            <p>{descripcion}</p>
                        </div>
                        <img src={imagen} alt="Vista previa" className="product-image" />


                        <div className="quantity-controls" style={{justifyContent:"space-between",margin:"10px"}}>
                        <p className="product-price">₡{precioTotal.toFixed(2)}</p>
                            <button onClick={disminuirCantidad}>-</button>
                            <span>{cantidad}</span>
                            <button onClick={incrementarCantidad}>+</button><br />
                        <button className="add-to-cart">Añadir al carrito</button>
                        </div>
                    </div>
                </div>


                <div className="related-products-container">
                    <div className="related-products-header">
                        Productos Relacionados
                    </div>
                    <div className="related-products-grid">
                        <Casillas producto={{nombre:"Producto 1",precio:100,imagen:"https://i.imgur.com/9o9r5kG.jpg"}}/>
                        <Casillas producto={{nombre:"Producto 2",precio:200,imagen:"https://i.imgur.com/9o9r5kG.jpg"}}/>
                        <Casillas producto={{nombre:"Producto 3",precio:300,imagen:"https://i.imgur.com/9o9r5kG.jpg"}}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Producto;
