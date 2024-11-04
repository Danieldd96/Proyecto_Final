import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import '../styles/Carrito.css';
import { GetByUser } from '../hooks/Get';  // Función para obtener productos por usuario desde el backend
import { BiTrash } from 'react-icons/bi';  // Icono de basura para eliminar producto
import { loadStripe } from '@stripe/stripe-js';  // Carga la biblioteca de Stripe
import { Elements } from '@stripe/react-stripe-js';  // Componente de Stripe para el checkout
import FormularioPago from '../components/FormularioPago';
import { traerCookie, crearCookie } from '../hooks/Cookies';  // Funciones para manipular cookies
import generarFacturaPDF from '../utils/generarFacturaPDF';  // Función para generar una factura PDF

// Carga la clave pública de Stripe
const stripePromise = loadStripe('pk_test_51Q7jepP8ALRaQMZcJ5FvztYBTtsOlLmIBZGV8tk7r9eEmPDAl83whOHJipMzeT6b7oGOxJ5R6Apt2Rjx3gFiOahP00OjoiEWl0');

const Carrito = () => {
    const ids = JSON.parse(traerCookie("ids")) || [];  // Obtiene los IDs de productos almacenados en las cookies
    const [Datos, setDatos] = useState([]);  // Estado para almacenar datos de productos
    const [cantidadPorProducto, setCantidadPorProducto] = useState({});  // Estado para almacenar cantidades por producto
    const [precioTotal, setPrecioTotal] = useState(0);  // Estado para almacenar el precio total del carrito
    const [isCheckout, setIsCheckout] = useState(false);  // Estado para saber si está en modo checkout
    const navigate = useNavigate();  // Hook para redirigir a otras rutas
    const apiUrl = `http://127.0.0.1:8000/api/v3/producto/productos/`;  // URL de la API para obtener productos

    // Función para obtener datos de productos a partir de los IDs almacenados
    const Obtener = async () => {
        const productos = await Promise.all(ids.map(id => GetByUser(apiUrl, id)));  // Obtiene todos los productos usando los IDs
        setDatos(productos);  // Actualiza el estado con los datos de los productos
        const cantidadesIniciales = productos.reduce((cant, producto) => {  // Inicializa la cantidad de cada producto en 1
            cant[producto.id] = 1;
            return cant;
        }, {});
        setCantidadPorProducto(cantidadesIniciales);  // Actualiza el estado de cantidad por producto
    };

    //Se ejecuta al cargar el componente para obtener los productos
    useEffect(() => {
        Obtener();
    }, []);

    // Hook que calcula el precio total del carrito cuando cambian los datos o cantidades de productos
    useEffect(() => {
        const nuevoTotal = Datos.reduce((total, producto) => {
            const cantidad = cantidadPorProducto[producto.id] || 1;  // Si no se encuentra la cantidad, se toma 1 por defecto
            return total + (producto.precio * cantidad);  // Suma el precio del producto multiplicado por su cantidad
        }, 0);
        setPrecioTotal(nuevoTotal);  // Actualiza el estado con el precio total calculado
    }, [Datos, cantidadPorProducto]);

    // Incrementa la cantidad de un producto específico
    const incrementarCantidad = (id) => {
        setCantidadPorProducto(prevCantidades => ({
            ...prevCantidades,
            [id]: (prevCantidades[id] || 1) + 1  // Aumenta la cantidad del producto en 1
        }));
    };

    // Disminuye la cantidad de un producto específico, hasta un mínimo de 1
    const disminuirCantidad = (id) => {
        setCantidadPorProducto(prevCantidades => ({
            ...prevCantidades,
            [id]: Math.max((prevCantidades[id] || 1) - 1, 1)  // Reduce la cantidad, pero no menor a 1
        }));
    };

    // Elimina un producto del carrito y actualiza el cookie de IDs
    const eliminarProducto = (id) => {
        const nuevosIds = ids.filter(itemId => itemId !== id);  // Filtra los IDs para excluir el eliminado
        crearCookie('ids', JSON.stringify(nuevosIds), 7);  // Actualiza el cookie con los nuevos IDs
        setDatos(Datos.filter(producto => producto.id !== id));  // Actualiza el estado para excluir el producto
        setCantidadPorProducto(prevCantidades => {  // Elimina la cantidad correspondiente en el estado
            const { [id]: _, ...rest } = prevCantidades;
            return rest;
        });
    };

    // Limpia el carrito de todos los productos y actualiza el cookie
    const limpiarCarrito = () => {
        crearCookie('ids', JSON.stringify([]), 7);  // Limpia el cookie de IDs
        setDatos([]);  // Borra los datos de productos en el estado
        setCantidadPorProducto({});  // Resetea las cantidades de productos
    };

    // Cambia el estado para mostrar el formulario de checkout
    const iniciarCheckout = () => {
        setIsCheckout(true);
    };

    // Maneja la lógica después de un pago exitoso
    const handlePaymentSuccess = () => {
        const usuarioId = traerCookie("idUsuario");  // Obtiene el ID del usuario de las cookies
        const name = traerCookie("username");  // Obtiene el nombre del usuario de las cookies
        const compraData = { productos: ids, usuario: usuarioId, nombre: name };  // Crea los datos de la compra
        
        // Genera y descarga la factura PDF
        generarFacturaPDF(Datos.map(producto => ({
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidadPorProducto[producto.id],
            tienda: 'LOGO',
        })), precioTotal);
    
        crearCookie('compraExitosa', JSON.stringify(compraData), 7);  // Guarda la compra exitosa en un cookie
        limpiarCarrito();  // Limpia el carrito tras el pago
        setTimeout(() => {
            navigate('/mis-productos');  // Redirige a la página de productos del usuario después de 2 segundos
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
