import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Get } from "../hooks/Get";

const Login = () => {
  const navegar = useNavigate();
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [datos, setDatos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mensajeTipo, setMensajeTipo] = useState("");
  const apiUrl = "http://127.0.0.1:8000/api/v2/user/usuarios/";

  useEffect(() => {
    obtener();
  }, []);

  async function obtener() {
      const data = await Get(apiUrl);
      setDatos(data);
  }

  const Guardar = async () => {
      setMensaje("");

      if (email.trim() === "" || clave.trim() === "") {
          setMensaje("Por favor, completa todos los campos.");
          setMensajeTipo("error");
          return;
      }

      if (email === clave) {
          setMensaje("El correo y la contraseña no pueden ser iguales.");
          setMensajeTipo("error");
          return;
      }

      const user = datos.find((user) => user.mail_user === email);

      if (!user) {
          setMensaje("Usuario no encontrado.");
          setMensajeTipo("error");
          return;
      }

      if (user.contrasena !== clave) {
          setMensaje("Contraseña incorrecta.");
          setMensajeTipo("error");
          return;
      }
      localStorage.setItem("email", user.mail_user);
      localStorage.setItem("idUsuario", user.id);
      localStorage.setItem("usuario", user.user);
      setMensaje("Inicio de sesión exitoso.");
      setMensajeTipo("success");
      setTimeout(() => {
          navegar('/');
      }, 2000);
  };

  return (
      <div className="overlay">
          <div className="wrapper" id="menu2">
              <div className="login">
                  <form>
                    <h1>Login</h1>

                    {mensaje && (
                      <div className={`alert ${mensajeTipo}`}>
                          {mensaje}
                      </div>
                    )}
                    <div className="input-box">
                      <input type="text"placeholder="Correo Electrónico"onChange={(e) => setEmail(e.target.value)}name="email"/>
                    </div>

                    <div className="input-box">
                      <input type="password" placeholder="Contraseña" onChange={(e) => setClave(e.target.value)} name="password"/>
                    </div>

                    <div className="ChangePass">
                      <a href="#">Olvidaste tu contraseña?</a>
                    </div>

                    <div className="register-link">
                      <p>No tienes una cuenta? <Link to="/registro" className="registerBtn">Register</Link></p>
                    </div>

                    <button type="button" onClick={Guardar} className="btn">Login</button>
                  </form>
              </div>
          </div>
      </div>
    );
}

export default Login;
