import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Carrito.css';
import { GetByUser } from '../hooks/Get';
import { BiTrash } from 'react-icons/bi';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import FormularioPago from '../components/FormularioPago';
import { traerCookie,crearCookie } from '../hooks/Cookies';
// Carga la clave pública de Stripe
const stripePromise = loadStripe('pk_test_51Q7jepP8ALRaQMZcJ5FvztYBTtsOlLmIBZGV8tk7r9eEmPDAl83whOHJipMzeT6b7oGOxJ5R6Apt2Rjx3gFiOahP00OjoiEWl0');

const Carrito = () => {
    const ids = JSON.parse(traerCookie("ids")) || [];
    const [Datos, setDatos] = useState([]);
    const [cantidadPorProducto, setCantidadPorProducto] = useState({});
    const [precioTotal, setPrecioTotal] = useState(0);
    const [isCheckout, setIsCheckout] = useState(false);
    const navigate = useNavigate();
    const apiUrl = `http://127.0.0.1:8000/api/v3/producto/productos/`;

    const Obtener = async () => {
        const productos = await Promise.all(ids.map(id => GetByUser(apiUrl, id)));
        setDatos(productos);
        const cantidadesIniciales = productos.reduce((cant, producto) => {
            cant[producto.id] = 1;
            return cant;
        }, {});
        setCantidadPorProducto(cantidadesIniciales);
    };

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
            [id]: (prevCantidades[id] || 1) + 1
        }));
    };

    const disminuirCantidad = (id) => {
        setCantidadPorProducto(prevCantidades => ({
            ...prevCantidades,
            [id]: Math.max((prevCantidades[id] || 1) - 1, 1)
        }));
    };

    const eliminarProducto = (id) => {
        const nuevosIds = ids.filter(itemId => itemId !== id);
        crearCookie('ids', JSON.stringify(nuevosIds), 7); 
        setDatos(Datos.filter(producto => producto.id !== id));
        setCantidadPorProducto(prevCantidades => {
            const { [id]: _, ...rest } = prevCantidades;
            return rest;
        });
    };

    const limpiarCarrito = () => {
        crearCookie('ids', JSON.stringify([]), 7);
        setDatos([]);
        setCantidadPorProducto({});
    };

    const iniciarCheckout = () => {
        setIsCheckout(true);
    };

    const handlePaymentSuccess = () => {
        const usuarioId = traerCookie("idUsuario");
        const compraData = { productos: ids, usuario: usuarioId };
        
        crearCookie('compraExitosa', JSON.stringify(compraData), 7);
        limpiarCarrito();
        setTimeout(() => {
            navigate('/mis-productos');
        }, 2000);
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
                    {isCheckout ? (
                        <Elements stripe={stripePromise}>
                            <FormularioPago total={precioTotal} onSuccess={handlePaymentSuccess} />
                        </Elements>
                    ) : (
                        <>
                            <button className="buy-all" onClick={iniciarCheckout}>Comprar Todo</button>
                            <hr />
                            <button className="clear-cart" onClick={limpiarCarrito}>Limpiar Carrito</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Carrito;
