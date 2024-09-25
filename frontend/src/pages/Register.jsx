import { Link, useNavigate } from "react-router-dom"
import { useState,useEffect } from "react";
import { darDatos } from "../hooks/Post";
import { Get } from "../hooks/Get";


const Register = ()=>{
   
    const navegar = useNavigate('')   ///Este navegar me permitira trasladarme a otra pagina
    ///Estos estados se utilizaran para contener los valores de sus respectivos inputs
    const [user,setUser] = useState(""); 
    const [email,setEmail] = useState(""); 
    const [pass,setPass] = useState("");
    const [datos,setDatos]= useState("")
    ///Esta url es el api en el cual guardaremos los usuarios
    let apiUrl="http://127.0.0.1:8000/api/v2/user/usuarios/"
    useEffect(()=>{
        obtener()
      },[])
      async function obtener() {
        const data= await Get(apiUrl)
         setDatos(data)
      }
    const Guardar = async()=>{     ///Esta funcion Guardar sera la que mandara el objetos al metodo Post
       
        const userExist=datos.find((acUser)=>acUser.email===email)
        if (userExist) {
            alert("Email ya registrado")
        }else{
        if (user.trim()===""||email.trim()===""||pass.trim()==="") { ///Este if verificara si los estados contienen vacios y si los contiene manda un alert que pedira que se coloque texto
            //obtiene los datos del usuario
            // valida si ya existe 
            alert("Inserte texto por favor")
          }else {                         ///Si no esta vacio se mandara el objeto let usuarios que tendra los estados especificos
            console.log("Entrando");
            let usuarios={
                user:user,
                mail_user:email,
                contrasena:pass,
            }
            await darDatos(usuarios,apiUrl)    ///aqui se mandara el objeto al metodo post como parametro junto con el url de la api
            setTimeout(() => {      ///Y se usara un setTimeout de un segundo que con el navegar me llevara a la pagina de /login
                navegar('/')
            }, 1000);
          }
        }
    }

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
                    required onChange={(e)=>setEmail(e.target.value)} />
                </div>

                <div className="input-box">
                    <input type="password" 
                    placeholder="Contraseña" 
                    required id="password" onChange={(e)=>setPass(e.target.value)}/>
                </div>
                

                <div className="register-link">
                    <p><input type="checkbox" name="check" id="check" />Estoy de acuerdo con los terminos y condiciones</p>
                </div>
                
                <div className="register-link">
                    <p>Ya tienes una cuenta? <Link to="/" className="registerBtn">Login</Link></p>
                </div>
                <button type="button" onClick={Guardar} className="btn" >Registrar</button>
            </form>
        </div>
    </div>
    )
}
export default Register