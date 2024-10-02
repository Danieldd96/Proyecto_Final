import React, { useState,useEffect } from 'react';
import '../styles/navbar.css';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [consulta, setConsulta] = useState('');
    const [mostrarbusqueda, setmostrarbusqueda] = useState(false); // Estado para mostrar y ocultar input de búsqueda
    const [placeholder, setPlaceholder] = useState(0);
    const [user, setUser] = useState(null);



    const placeholders = [
        "Buscar bicicletas",
        "Buscar piezas",
        "Buscar herramientas",
        "Buscar nutrición",
        "Buscar ropa",
        "Buscar partes"
    ];

    const Mostrarbuscador = () => {
        setmostrarbusqueda(!mostrarbusqueda);
    };

    const inputEnter = (event) => {
        if (event.key === 'Enter') {
            buscador();
        }
    };
    const buscador = () => {
        if (consulta.trim()) {
            alert(`Buscando: ${consulta}`); 
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholder((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const idUsuario = localStorage.getItem('idUsuario');
        const email = localStorage.getItem('email');
        if (idUsuario && email) {
            setUser({ idUsuario, email });
        }
    }, []);

    const cerrarSesion = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbarIzquierdo">
                <a href="#" className="nav-link">Accesorios</a>
                <a href="#" className="nav-link">Servicios</a>
                <a href="#" className="nav-link">Bicicletas</a>
            </div>

            <div className="navbarCentro">
                <Link className="logo" to="/">LOGO</Link>
            </div>

            <div className="navbarDerecho">
                <div className="search-container">
                    <i className='bx bx-search search-icon' onClick={Mostrarbuscador}></i>
                    {mostrarbusqueda && (
                        <input
                            type="text"
                            className="search-input"
                            value={consulta}
                            placeholder={placeholders[placeholder]}
                            onChange={(e) => setConsulta(e.target.value)}
                            onKeyDown={inputEnter}
                        />
                    )}
                </div>

                <a href="#" className="cart-icon"><i className='bx bx-cart-alt' ></i></a>
                <a href="#" className="face"><box-icon  type='logo' name='facebook-circle' color="rgb(55, 55, 203)"></box-icon></a>
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
                            <DropdownMenu.Item>Ajustes</DropdownMenu.Item>
                            <DropdownMenu.Item ><Link to="/publicar">Publicar Producto</Link></DropdownMenu.Item>
                            <DropdownMenu.Item ><Link to="/info">acerca de</Link></DropdownMenu.Item>
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
