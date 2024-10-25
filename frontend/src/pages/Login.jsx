import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { crearCookie } from "../hooks/Cookies";
const Login = () => {
  const navegar = useNavigate();
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeTipo, setMensajeTipo] = useState("");

  const Guardar = async () => {
    setMensaje("");

    if (email.trim() === "" || clave.trim() === "") {
        setMensaje("Por favor, completa todos los campos.");
        setMensajeTipo("error");
        return;
    }

        const response = await fetch("http://127.0.0.1:8000/api/v2/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,  
                password: clave,  
            }),
        });

        if (response.ok) {
            const data = await response.json();
            crearCookie("token", data.access_token, 7);
            crearCookie("refresh", data.refresh_token, 7);
            crearCookie("email", data.email, 7); 
            crearCookie("idUsuario", data.id, 7);
            crearCookie("username", data.username, 7);

            setMensaje("Inicio de sesión exitoso.");
            setMensajeTipo("success");

            requestAnimationFrame(() => {
                setTimeout(() => {
                    navegar('/');
                }, 2000);
            });
        }
  };

  return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
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
        <img src="/src/img/115062.jpg" alt="Background" style={{position:'absolute',top:0,right:0,width:'65%',height:'100%',backgroundColor:'#16191C',zIndex:1,objectFit:'cover'}}/>
      </div>
    );
}

export default Login;
