import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { darDatos } from "../hooks/Post";
import { Get } from "../hooks/Get";

const Register = () => {
    const navegar = useNavigate();
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [datos, setDatos] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [mensajeTipo, setMensajeTipo] = useState("");
    const [aceptarTerminos, setAceptarTerminos] = useState(false);
    const apiUrl = "http://127.0.0.1:8000/api/v2/user/usuarios/";

    useEffect(() => {
        obtener();
    }, []);

    async function obtener() {
        try {
            const data = await Get(apiUrl);
            
            // Verificar si 'data' es un array, si no lo es, convertirlo a un array vacío
            if (Array.isArray(data)) {
                setDatos(data);
            } else {
                console.error("La respuesta no es un array:", data);
                setDatos([]); // Asegurar que datos siempre sea un array
            }
        } catch (error) {
            console.error("Error obteniendo datos:", error);
            setDatos([]); // Asegurarse de que 'datos' no sea undefined si hay un error
        }
    }

    const Guardar = async () => {
        setMensaje("");
        
        if (!aceptarTerminos) {
            setMensaje("Debes aceptar los términos y condiciones.");
            setMensajeTipo("error");
            return;
        }

        // Asegurarse que 'datos' es un array antes de usar '.find'
        const userExist = Array.isArray(datos) ? datos.find((acUser) => acUser.mail_user === email) : null;
        if (userExist) {
            setMensaje("Email ya registrado");
            setMensajeTipo("error");
            return;
        }

        if (user.trim() === "" || email.trim() === "" || pass.trim() === "") {
            setMensaje("Inserte texto por favor");
            setMensajeTipo("error");
            return;
        }

        let usuarios = {
            user: user,
            mail_user: email,
            contrasena: pass,
        };

        await darDatos(usuarios, apiUrl);
        setMensaje("Registro exitoso. Redirigiendo...");
        setMensajeTipo("success");
        requestAnimationFrame(() => {
            setTimeout(() => {
                navegar('/login');
            }, 2000); 
        });
    };

    return (
        <div className="register" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
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
            <img src="/src/img/bicycle-1839005_1920.jpg" alt="Background" style={{position:'absolute',top:0,right:605,width:'180%',height:'100%',backgroundColor:'#16191C',zIndex:1,objectFit:'cover'}}/>

        </div>
    );
}

export default Register;
