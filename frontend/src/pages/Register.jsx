import { Link, Navigate } from "react-router-dom"

const Register = ()=>{
   
    return(
    <div className="register" >
        <div className="wrapper">
            <form id="registerForm">
                <h1>Registro</h1>

                <div className="input-box">
                    <input type="text" id="name" placeholder="Usuario" 
                    required onChange={(e)=>setUser(e.target.value)}/>
                </div>

                <div className="input-box">
                    <input type="email" id="email" placeholder="Correo Electronico" 
                    required />
                </div>

                <div className="input-box">
                    <input type="password" 
                    placeholder="Contraseña" 
                    required id="password" />
                </div>
                

                <div className="register-link">
                    <p><input type="checkbox" name="check" id="check" />Estoy de acuerdo con los terminos y condiciones</p>
                </div>
                
                <div className="register-link">
                    <p>Ya tienes una cuenta? <Link to="/" className="registerBtn">Login</Link></p>
                </div>
                <button type="button"  className="btn" >Registrar</button>
            </form>
        </div>
    </div>
    )
}
export default Register