import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { crearCookie } from "../hooks/Cookies";

const Login = () => {
  const navegar = useNavigate();  // Hook para redirigir al usuario
  const [email, setEmail] = useState("");  // Estado para el correo electrónico
  const [clave, setClave] = useState("");  // Estado para la contraseña
  const [mensaje, setMensaje] = useState("");  // Estado para mostrar mensajes
  const [mensajeTipo, setMensajeTipo] = useState("");  // Estado para el tipo de mensaje (error o éxito)

  // Función para manejar el inicio de sesión
  const Guardar = async () => {
    setMensaje("");  // Reinicia el mensaje al intentar iniciar sesión

    // Verifica que los campos no estén vacíos
    if (email.trim() === "" || clave.trim() === "") {
        setMensaje("Por favor, completa todos los campos.");  // Muestra un mensaje de error si falta algún campo
        setMensajeTipo("error");
        return;
    }

    // Realiza la solicitud de inicio de sesión a la API
    const response = await fetch("http://127.0.0.1:8000/api/v2/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,  // Asigna el email y clave ingresados
            password: clave,
        }),
    });

    // Si la respuesta es exitosa
    if (response.ok) {
        const data = await response.json();
        crearCookie("token", data.access_token, 7);  // Guarda el token de acceso en una cookie
        crearCookie("refresh", data.refresh_token, 7);  // Guarda el token de refresco en una cookie
        crearCookie("email", data.email, 7);  // Guarda el email en una cookie
        crearCookie("idUsuario", data.id, 7);  // Guarda el ID de usuario en una cookie
        crearCookie("username", data.username, 7);  // Guarda el nombre de usuario en una cookie

        setMensaje("Inicio de sesión exitoso.");  // Muestra un mensaje de éxito
        setMensajeTipo("success");

        // Redirige al usuario a la página principal después de 2 segundos
        requestAnimationFrame(() => {
            setTimeout(() => {
                navegar('/');
            }, 2000);
        });
    }
  };

  return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="wrapper" id="menu2">
              <div className="login">
                  <form>
                    <h1>Login</h1>

                    {/* Muestra el mensaje de error o éxito si existe */}
                    {mensaje && (
                      <div className={`alert ${mensajeTipo}`}>
                          {mensaje}
                      </div>
                    )}
                    
                    {/* Campo para ingresar el correo electrónico */}
                    <div className="input-box">
                      <input 
                        type="text" 
                        placeholder="Correo Electrónico" 
                        onChange={(e) => setEmail(e.target.value)} 
                        name="email" 
                      />
                    </div>

                    {/* Campo para ingresar la contraseña */}
                    <div className="input-box">
                      <input 
                        type="password" 
                        placeholder="Contraseña" 
                        onChange={(e) => setClave(e.target.value)} 
                        name="password" 
                      />
                    </div>

                    {/* Enlace para recuperar la contraseña */}
                    <div className="ChangePass">
                      <a href="#">Olvidaste tu contraseña?</a>
                    </div>

                    {/* Enlace para registrarse si no tiene cuenta */}
                    <div className="register-link">
                      <p>No tienes una cuenta? <Link to="/registro" className="registerBtn">Register</Link></p>
                    </div>

                    {/* Botón de inicio de sesión */}
                    <button type="button" onClick={Guardar} className="btn">Login</button>
                  </form>
              </div>
          </div>
          {/* Imagen de fondo de la página de inicio de sesión */}
          <img 
            src="/src/img/115062.jpg" 
            alt="Background" 
            style={{
              position: 'absolute', 
              top: 0, 
              right: 0, 
              width: '65%', 
              height: '100%', 
              backgroundColor: '#16191C', 
              zIndex: 1, 
              objectFit: 'cover'
            }}
          />
      </div>
  );
};

export default Login;
