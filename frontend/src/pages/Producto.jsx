import React, { useState, useEffect } from 'react';
import Casillas from '../components/Casillas';
import Navbar from '../components/Navbar';
import '../styles/Producto.css';
import { Get } from '../hooks/Get';
import { traerCookie } from '../hooks/Cookies';

const Producto = () => {
    const id = traerCookie('IdInfoProducto');
    const [cantidad, setCantidad] = useState(1);
    const [precioBase, setPrecioBase] = useState(0);
    const [precioTotal, setPrecioTotal] = useState(precioBase);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");
    const apiUrl = `http://127.0.0.1:8000/api/v3/producto/productos/${id}`;
    
    const Obtener = async () => {
        const data = await Get(apiUrl);
        console.log(data);
        setNombre(data.nombre);
        setDescripcion(data.descripcion);
        setPrecioBase(data.precio);
        setImagen(data.imagen);
    }
    useEffect(()=>{
        Obtener();
    },[]);

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
