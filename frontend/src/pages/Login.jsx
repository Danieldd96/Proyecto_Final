import { useState } from "react"
import validation from "../utils/LoginValidation"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { Get } from "../hooks/Get"
import { AuthContext } from "../contexts/AuthProvider"

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
        setEmail(e.target.value)
        setClave(e.target.value)
        setErrors(validation(values))
    }

    const navegar = useNavigate();                 ///navegar sera el que se utilizara para pasar a otra pagina al completar una funcion
    const [email, setEmail] = useState("");        ///Con este UseState obtendre el contenido del input en el cual se obtendra el email
    const [clave, setClave] = useState("");        ///Con este UseState obtendre el contenido del input en el cual se obtendra el la contraseña
    const {login} = useContext(AuthContext);       ///Con este UseContext verificare cuales rutas seran privadas
    const [datos,setDatos]= useState("")
    let apiUrl="http://127.0.0.1:8000/api/v2/user/usuarios/"      ///Api que contendra los datos de los usuarios que se hayan registrado previamente
    useEffect(()=>{
      obtener()
    },[])
    async function obtener() {
      const data= await Get(apiUrl)
       setDatos(data)
    }
    console.log(datos)
    const Guardar = async () => {
      if (!email==""&&!clave=="") {
        const user=datos.find((user)=>user.mail_user==email)
        console.log("Usuario encontrado",user)
        if (user.contrasena==clave) {
         localStorage.setItem("email",user.mail_user)
         localStorage.setItem("idUsuario",user.id)
         localStorage.setItem("usuario",user.user)
         navegar('/home')
         login()
        }
      } else {
        alert('Usuario o contraseña incorrectos')
      }
    };  

    return(
    <div className="overlay" >
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

                        <button type="submit" onClick={Guardar} className="btn">Login</button>
                </form>
            </div>
        </div>
    </div>      
    )
}
export default Login