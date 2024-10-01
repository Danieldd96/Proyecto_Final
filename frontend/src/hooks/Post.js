async function darDatos(objeto,productsUrl){
    try {
        const respuesta = await fetch(productsUrl,{
           method: "POST",
           headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify(objeto)
        })
        const datos = await respuesta.json()
        console.log(datos)
        console.log(`Producto ${objeto.nombre} publicado exitosamente`)
    } catch (error) {
        console.error(error);
    }
}
export{darDatos}