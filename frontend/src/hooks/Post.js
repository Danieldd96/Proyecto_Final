async function darDatos(objeto,productsUrl){
    try {
        const respuesta = await fetch(productsUrl,{
           method: "POST",
           headers: {
            "Content-type": "application/json;"
          },
          body: JSON.stringify(objeto)
        })
        const datos = await respuesta.json()
        console.log(datos)
        return datos
    } catch (error) {
        console.error(error);
    }
}
export{darDatos}