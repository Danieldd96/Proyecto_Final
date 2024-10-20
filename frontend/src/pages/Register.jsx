import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { darDatos } from "../hooks/Post";

const Register = () => {
    const navegar = useNavigate();
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [mensajeTipo, setMensajeTipo] = useState("");
    const [aceptarTerminos, setAceptarTerminos] = useState(false);
    const apiUrl = "http://127.0.0.1:8000/api/v2/registro/";

    const Guardar = async () => {
        setMensaje("");

        if (!aceptarTerminos) {
            setMensaje("Debes aceptar los términos y condiciones.");
            setMensajeTipo("error");
            return;
        }

        if (user.trim() === "" || email.trim() === "" || pass.trim() === "") {
            setMensaje("Inserte texto por favor");
            setMensajeTipo("error");
            return;
        }

        let usuarios = {
            username: user,
            email: email,
            password: pass, 
            direccion: "Mi dirección",
            edad: 25,
            telefono: "123456789"
        };
        try {
            await darDatos(usuarios, apiUrl);
            setMensaje("Registro exitoso. Redirigiendo...");
            setMensajeTipo("success");
            requestAnimationFrame(() => {
                setTimeout(() => {
                    navegar('/login');
                }, 2000); 
            });
        } catch (error) {
            setMensaje("Error al registrar el usuario");
            setMensajeTipo("error");
        }
    };

    return (
        <div className="register" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="wrapper">
                <form id="registerForm">
                    <h1>Registro</h1>

                    {mensaje && (
                        <div className={`alert ${mensajeTipo}`}>
                            {mensaje}
                        </div>
                    )}

                    <div className="input-box">
                        <input
                            type="text"
                            id="name"
                            placeholder="Usuario"
                            required
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="email"
                            id="email"
                            placeholder="Correo Electrónico"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            required
                            id="password"
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>

                    <div className="register-link">
                        <p>
                            <input 
                                type="checkbox" 
                                name="check" 
                                id="check" 
                                onChange={(e) => setAceptarTerminos(e.target.checked)} 
                            />
                            Estoy de acuerdo con los términos y condiciones
                        </p>
                    </div>

                    <div className="register-link">
                        <p>
                            Ya tienes una cuenta? <Link to="/login" className="registerBtn">Login</Link>
                        </p>
                    </div>
                    <button type="button" onClick={Guardar} className="btn">Registrar</button>
                </form>
            </div>
            <img src="/src/img/bicycle-1839005_1920.jpg" alt="Background" style={{position:'absolute', top: 0, right: 605, width: '180%', height: '100%', backgroundColor: '#16191C', zIndex: 1, objectFit: 'cover' }} />

        </div>
    );
}

export default Register;
