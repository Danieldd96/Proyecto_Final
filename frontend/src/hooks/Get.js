async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error al obtener los datos: ${error.message}`);
        return null; 
    }
}

async function Get(apiUrl) {
    return await fetchData(apiUrl);
}

async function GetByUser(apiUrl, userID) {
    return await fetchData(apiUrl + userID);
}

export { Get, GetByUser };
