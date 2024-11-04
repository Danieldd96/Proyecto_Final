import {traerCookie} from "../hooks/Cookies"
const Cookie = traerCookie('token')
async function actualizardatos(apiUrl, objeto) {
    try {
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${Cookie}`
            },
            body: JSON.stringify(objeto)
        });

        if (!response.ok) {
            const errorData = await response.json(); // Obtener datos de error
            console.error('Error de actualización:', errorData);
            throw new Error('Error en la actualización'); // Lanza un error si la respuesta no es OK
        }

        let data = await response.json();
        console.log('Datos actualizados exitosamente:', data);
    } catch (error) {
        console.log('Error en actualizar datos:', error);
    }
}

export {actualizardatos}
