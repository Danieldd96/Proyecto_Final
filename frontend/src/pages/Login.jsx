import { Link, Navigate } from "react-router-dom"



const Login = ()=>{
    return(
    <div className="register" >
        <div className="wrapper" id="menu2">
            <div className="login" >
                <form id="loginForm">
                    <h1>Login</h1>

                        <div className="input-box">
                            <input type="text" placeholder="Correo Electronico" 
                            required id="email" />      
                        </div>

                        <div className="input-box">
                            <input type="password" 
                            placeholder="Contraseña" 
                            required id="pass" />
                        </div>

                        <div className="ChangePass">
                            <a href="#">Olvidaste tu contraseña?</a>
                        </div>


                        <div className="register-link">
                            <p>No tienes una cuenta? <Link to="/registro" className="registerBtn">Register</Link></p>
                        </div>

                        <button type="button"  className="btn">Login</button>
                </form>
            </div>
        </div>
    </div>      
    )
}
export default Login