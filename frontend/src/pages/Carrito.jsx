import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import '../styles/Carrito.css';
import { GetByUser } from '../hooks/Get';
import { BiTrash } from 'react-icons/bi';

const Carrito = () => {
    const ids = JSON.parse(localStorage.getItem("ids")) || [];
    const [Datos, setDatos] = useState([]);
    const [cantidadPorProducto, setCantidadPorProducto] = useState({});
    const [precioTotal, setPrecioTotal] = useState(0);
    const apiUrl = `http://127.0.0.1:8000/api/v3/producto/productos/`;

    const Obtener = async () => {
        let productos = []
        for (let index = 0; index < ids.length; index++) {
            const aggProd = await GetByUser(apiUrl,ids[index])
            productos.push(aggProd)
        }        
        setDatos(productos);
        const cantidadesIniciales = productos.reduce((cant, producto) => {
            cant[producto.id] = 1;
            return cant;
        }, {});
        setCantidadPorProducto(cantidadesIniciales);
    }

    useEffect(() => {
        Obtener();
    }, []);

    useEffect(() => {
        const nuevoTotal = Datos.reduce((total, producto) => {
            const cantidad = cantidadPorProducto[producto.id] || 1;
            return total + (producto.precio * cantidad);
        }, 0);
        setPrecioTotal(nuevoTotal);
    }, [Datos, cantidadPorProducto]);

    const incrementarCantidad = (id) => {
        setCantidadPorProducto(prevCantidades => ({
            ...prevCantidades,
            [id]: prevCantidades[id] + 1
        }));
    };

    const disminuirCantidad = (id) => {
        setCantidadPorProducto(prevCantidades => ({
            ...prevCantidades,
            [id]: prevCantidades[id] > 1 ? prevCantidades[id] - 1 : 1
        }));
    };

    const eliminarProducto = (id) => {
        const nuevosIds = ids.filter(itemId => itemId !== id);
        localStorage.setItem('ids', JSON.stringify(nuevosIds));
        setDatos(Datos.filter(producto => producto.id !== id));
    };

    const limpiarCarrito = () => {
        localStorage.removeItem('ids');
        setDatos([]);
    };

    return (
        <div>
            <Navbar />
            <div className="carrito-container">
                <div className="product-list">
                    {Datos.map((producto, index) => (
                        <div key={index}>
                            <div className="car-container">
                                <div className="car-header">
                                    <h1>{producto.nombre}</h1>
                                    <div className="car-details">
                                        <img src={producto.imagen} alt="Vista previa" className="car-image" />
                                        <div className="more-info">
                                            <h2>Descripcion</h2>
                                            <p>{producto.descripcion}</p>
                                        </div>
                                        <div className="quantity-controls">
                                            <p className="car-price">Total: ₡{producto.precio * cantidadPorProducto[producto.id]}</p>
                                            <button onClick={() => disminuirCantidad(producto.id)}>-</button>
                                            <span>{cantidadPorProducto[producto.id]}</span>
                                            <button onClick={() => incrementarCantidad(producto.id)}>+</button>
                                        </div>
                                        <button className="delete-product" onClick={() => eliminarProducto(producto.id)}>
                                            <BiTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="total-container">
                    <h2>Total del carrito: ₡{precioTotal}</h2>
                    <button className="buy-all">Comprar Todo</button>
                    <hr />
                    <button className="clear-cart" onClick={limpiarCarrito}>Limpiar Carrito</button>
                </div>
            </div>
        </div>
    );
};

export default Carrito;
