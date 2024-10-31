import React, { useState,useEffect } from 'react';
import '../styles/navbar.css';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Link, useNavigate } from 'react-router-dom';
import { traerCookie,crearCookie } from '../hooks/Cookies';

const Navbar = () => {
    const [consulta, setConsulta] = useState(''); // Estado de consulta de búsqueda
    const [mostrarbusqueda, setMostrarBusqueda] = useState(false); // Estado para mostrar u ocultar el input de búsqueda
    const [resultados, setResultados] = useState({}); // Estado para guardar los resultados de la búsqueda
    const [user, setUser] = useState(null);
    const [placeholder, setPlaceholder] = useState(0);
    const navigate = useNavigate();

    const placeholders = [
        "Buscar bicicletas",
        "Buscar piezas",
        "Buscar herramientas",
        "Buscar nutrición",
        "Buscar ropa",
        "Buscar partes"
    ];

    // Mostrar u ocultar el input de búsqueda
    const Mostrarbuscador = () => {
        setMostrarBusqueda(!mostrarbusqueda);
    };

    // Función para buscar productos cada vez que el input cambie
    const buscarProductos = async (query) => {
        if (query.trim()) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v3/busqueda/?q=${query}`);
                const data = await response.json();
                setResultados(data); // Guardar resultados en el estado
            } catch (error) {
                console.error("Error al buscar productos:", error);
            }
        } else {
            setResultados({}); // Limpiar resultados si no hay consulta
        }
    };

    // Cada vez que el input cambie, se realiza la búsqueda
    const cambioInput = (e) => {
        const value = e.target.value;
        setConsulta(value);
        buscarProductos(value);
    };

    // Función para cambiar el placeholder dinámicamente
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholder((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Verificar si el usuario ha iniciado sesión
    useEffect(() => {
        const idUsuario = traerCookie('idUsuario');
        const email = traerCookie('email');
        if (idUsuario && email) {
            setUser({ idUsuario, email });
        }
    }, []);

    // Cerrar sesión y limpiar cookies
    const cerrarSesion = () => {
        crearCookie('idUsuario', '', 7);
        crearCookie('email', '', 7);
        crearCookie('usuario', '', 7);
        window.location.reload();
    };

    // Redirigir al producto seleccionado
    const ProductoInfo = (idProducto) => {
        crearCookie('IdInfoProducto', idProducto, 7);
        navigate(`/producto`); 
    };

    return (
        <nav className="navbar">
            <div className="navbarIzquierdo">
                <Link to="/accesorios" className="nav-link" data-text="Accesorios">Accesorios</Link>
                <Link to='/servicios' className="nav-link" data-text="Servicios">Servicios</Link>
                <Link to='/bicicletas' className="nav-link" data-text="Bicicletas">Bicicletas</Link>
            </div>

            <div className="navbarCentro">
                <Link className="logo" to="/">LOGO</Link>
            </div>

            <div className="navbarDerecho">
                <div className="search-container">
                    <i className='bx bx-search search-icon' onClick={Mostrarbuscador}></i>
                    {mostrarbusqueda && (
                        <div className="search-dropdown">
                            <input
                                type="text"
                                className="search-input"
                                value={consulta}
                                placeholder={placeholders[placeholder]}
                                onChange={cambioInput}
                            />
                            {Object.keys(resultados).length > 0 && (
                                <div className="resultados-busqueda">
                                    {Object.keys(resultados).map((categoria) => (
                                        <div key={categoria}>
                                            <h4>{categoria}</h4>
                                            <ul>
                                                {resultados[categoria].map((producto) => (
                                                    <li key={producto.id}>
                                                        <button
                                                            className="product-link"
                                                            onClick={() => ProductoInfo(producto.id)}
                                                        >
                                                            <img 
                                                                src={producto.imagen} 
                                                                alt={producto.nombre} 
                                                                className="product-thumbnail" 
                                                            />
                                                            {producto.nombre} - ${producto.precio}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <Link to="/carrito" className="cart-icon"><i className='bx bx-cart-alt' ></i></Link>
                <Link className="face"><box-icon  type='logo' name='facebook-circle' color="rgb(55, 55, 203)"></box-icon></Link>
                <a href="#" className="insta"><box-icon type='logo' name='instagram-alt' color="#fff"></box-icon></a>
                <a href="#" className="what"><box-icon type='logo' name='whatsapp' color="#00ff00"></box-icon></a>

                {user ? (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <Avatar className="avatar">
                                <AvatarImage src="src/img/marzo.png" alt="User Avatar" />
                                <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content className="dropdown-content">
                            <div className="user-info">
                                <Avatar className="avatar">
                                    <AvatarImage src="src/img/marzo.png" alt="User Avatar" />
                                    <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <p>{user.email}</p>
                            </div>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item>Datos de usuario</DropdownMenu.Item>
                            <DropdownMenu.Item>Mi calendario</DropdownMenu.Item>
                            <DropdownMenu.Item>Historial mantenimiento</DropdownMenu.Item>
                            <DropdownMenu.Item>Historial facturas</DropdownMenu.Item>
                            <DropdownMenu.Item><Link to='/publicados'>Productos publicados</Link></DropdownMenu.Item>
                            <DropdownMenu.Item><Link to="/mis-productos">Mis productos</Link></DropdownMenu.Item>
                            <DropdownMenu.Item ><Link to="/publicar">Publicar Producto</Link></DropdownMenu.Item>
                            <DropdownMenu.Item ><Link to="/info">Acerca de</Link></DropdownMenu.Item>
                            <DropdownMenu.Item ><Link to="/contacto">Contacto</Link></DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item onClick={cerrarSesion} className="logout-item">
                                Cerrar sesión
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                ) : (
                    <>
                        <a href="/login" className="login-btn">Iniciar Sesión</a>
                        <a href="/registro" className="register-btn">Registrarse</a>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
