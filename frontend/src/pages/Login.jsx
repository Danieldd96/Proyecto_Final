import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import validation from "../utils/LoginValidation"


const Login = ()=>{
    const [values,setValues]=useState({
        email:'',
        password:''
    })
    const [errors,setErrors]=useState({})
    const handleInput=(e)=>{
        setValues(prev =>({...prev,[e.target.name]:[e.target.value]}))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setErrors(validation(values))
    }

    return(
    <div className="register" >
        <div className="wrapper" id="menu2">
            <div className="login" >
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>

                        <div className="input-box">
                            <input type="text" placeholder="Correo Electronico" 
                            onChange={handleInput} name="email" />
                            {errors.email && <span className="textoError">{errors.email} </span>}  
                        </div>

                        <div className="input-box">
                            <input type="password" 
                            placeholder="Contraseña" 
                            onChange={handleInput} name="password" />
                            {errors.password && <span className="textoError">{errors.password} </span>}
                        </div>

                        <div className="ChangePass">
                            <a href="#">Olvidaste tu contraseña?</a>
                        </div>


                        <div className="register-link">
                            <p>No tienes una cuenta? <Link to="/registro" className="registerBtn">Register</Link></p>
                        </div>

                        <button type="submit"  className="btn">Login</button>
                </form>
            </div>
        </div>
    </div>      
    )
}
export default Login