async function Get(apiUrl) {
    
    try {
        const response = await fetch(apiUrl)
        let listarTareas =await response.json()
        return listarTareas

    } catch (error) {
        console.log(error)
    }
}
async function GetByUser(apiUrl,userID){
    try {
        const response = await fetch(apiUrl+userID)
        let listarTareas =await response.json()
        return listarTareas

    } catch (error) {
        console.log(error)
    
}
}
export {Get,GetByUser}