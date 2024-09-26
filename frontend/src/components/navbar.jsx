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
                <a href="#" className="cart-icon"><i class='bx bx-cart-alt' ></i></a>
                <a href="#" className="face"><i class='bx bxl-facebook-circle' ></i></a>
                <a href="#" className="redes-icon"><i class='bx bxl-instagram-alt' ></i></a>
                <a href="#" className="redes-icon"><i class='bx bxl-whatsapp' ></i></a>
                <a href="#" className="login-btn">Iniciar Sesión</a>
                <a href="#" className="register-btn">Registrarse</a>
            </div>
        </nav>
    );
};

export default Navbar;
