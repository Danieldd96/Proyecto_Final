
async function actualizarJuego(apiUrl,id,objeto) {///En este metodo cambiaremos el estado de la tarea actualizando la ap
    try {
        const response = await fetch (apiUrl+id,{
            method:"PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify(objeto)
        })
        let data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
    
}

export {actualizarJuego}
