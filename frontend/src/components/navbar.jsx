import React from 'react';
import '../styles/navbar.css';

const Navbar = () => {
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
