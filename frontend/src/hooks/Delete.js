import {traerCookie} from "../hooks/Cookies"
const Cookie = traerCookie('token')
async function deleteData(url,id) {
    try {
        const response = await fetch(url+id,{
            method:"DELETE",
            headers: {
                "Content-type": "application/json;",
                'Authorization': `Bearer ${Cookie}`
            }
        })
       const Datos = await response.json()
       console.log(Datos)
       console.log(`Se elimino`);
   } catch (error) {
       console.error(error);
       return alert("Error")
   }
}
export {deleteData}