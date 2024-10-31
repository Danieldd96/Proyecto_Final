import {traerCookie} from "../hooks/Cookies"
const Cookie = traerCookie('token')
async function actualizarJuego(apiUrl,id,objeto) {///En este metodo cambiaremos el estado de la tarea actualizando la ap
    try {
        const response = await fetch (apiUrl+id,{
            method:"PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${Cookie}`

            },
            body:JSON.stringify(objeto)
        })
        let data = await response.json()
        console.log(data)
        console.log('Datos actualizados exitosamente')
    } catch (error) {
        console.log(error)
    }
    
}

export {actualizarJuego}
