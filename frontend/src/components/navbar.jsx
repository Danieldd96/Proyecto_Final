import React, { useState } from 'react';
import '../styles/navbar.css';

const Navbar = () => {
    const [consulta, setConsulta] = useState('');
    const [mostrarbusqueda, setmostrarbusqueda] = useState(false); // Estado para mostrar y ocultar input de búsqueda

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
    return (
        <nav className="navbar">
            <div className="navbarIzquierdo">
                <a href="#" className="nav-link">Accesorios</a>
                <a href="#" className="nav-link">Servicios</a>
                <a href="#" className="nav-link">Bicicletas</a>
            </div>

            <div className="navbarCentro">
                <a href="#" className="logo">LOGO</a>
            </div>

            <div className="navbarDerecho">
                <div className="search-container">
                    <i className='bx bx-search search-icon' onClick={Mostrarbuscador}></i>
                    {mostrarbusqueda && (
                        <input
                            type="text"
                            className="search-input"
                            value={consulta}
                            onChange={(e) => setConsulta(e.target.value)}
                            onKeyDown={inputEnter}
                        />
                    )}
                </div>

                <a href="#" className="cart-icon"><i className='bx bx-cart-alt' ></i></a>
                <a href="#" className="face"><box-icon  type='logo' name='facebook-circle' color="rgb(55, 55, 203)"></box-icon></a>
                <a href="#" className="insta"><box-icon type='logo' name='instagram-alt' color="#fff"></box-icon></a>
                <a href="#" className="what"><box-icon type='logo' name='whatsapp' color="#00ff00"></box-icon></a>
                <a href="#" className="login-btn">Iniciar Sesión</a>
                <a href="#" className="register-btn">Registrarse</a>
            </div>
        </nav>
    );
};

export default Navbar;
