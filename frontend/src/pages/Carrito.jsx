import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import '../styles/Carrito.css';
import { Get, GetByUser } from '../hooks/Get';

const Carrito = () => {
    const ids = JSON.parse(localStorage.getItem("ids")) || [];
    const [Datos, setDatos] = useState([]);
    const [cantidad, setCantidad] = useState(1);
    const [precioBase, setPrecioBase] = useState(0);
    const [precioTotal, setPrecioTotal] = useState(0);
    const apiUrl = `http://127.0.0.1:8000/api/v3/producto/productos/`;

    
    const Obtener = async () => {
        let productos = []
        for (let index = 0; index < ids.length; index++) {
            const aggProd = await GetByUser(apiUrl,ids[index])
            productos.push(aggProd)
        }        
        setDatos(productos);

    }

    useEffect(() => {
        Obtener();
    }, []);

    useEffect(() => {
        setPrecioTotal(precioBase * cantidad); // Cálculo simple del precio total
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
            {Datos.map((producto, index) => (
                <div key={index}>
                    <div className="car-container">
                        <div className="car-header">
                            <h1>{producto.nombre}</h1>
                            <div className="car-details">
                                <img src={producto.imagen} alt="Vista previa" className="car-image" />
                                <div className="more-info">
                                    <h2>MÁS INFORMACIÓN</h2>
                                    <p>{producto.descripcion}</p>
                                </div>
    
                                <div className="quantity-controls" style={{ justifyContent: "space-between", margin: "10px" }}>
                                    <p className="car-price">Total: ₡{producto.precio}</p>
                                    <button onClick={() => disminuirCantidad(index)}>-</button>
                                    <span>{cantidad}</span>
                                    <button onClick={() => incrementarCantidad(index)}>+</button>
                                    <br />
                                    <button className="add-to-cart">Añadir al carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
      
        </div>
    );
};

export default Carrito;
