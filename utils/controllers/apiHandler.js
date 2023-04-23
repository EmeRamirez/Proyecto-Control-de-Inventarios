//Dirección API local
const ApiURL = 'http://localhost:4000/mmkapi';

//Direccion API Railway
// const ApiURL = 'https://api-mmk-production.up.railway.app/mmkapi';


//Solicitar token a la API
export async function getToken(usuario){
    const res = await fetch(`${ApiURL}/auth/${usuario}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
    });
    return res.json();
};

//Autenticar Token
export async function authToken(token){
    try {
        const res = await fetch(`${ApiURL}/verauth/${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
    });
    return res.json();
    } catch (error) {
        console.log('Error al comunicarse con la Api',error);
    }
    
};


//Enviar solicitud a la API para obtener el registro de todos los usuarios creados.
export async function getUsuarios(token){
    try {
        const data = await fetch(`${ApiURL}/usuarios`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return data.json();
    } catch (error) {
        console.error('No se pudo obtener la lista de usuarios',error);
    }
};

export async function setUsuario(data,token){
    try {
        const response = await fetch(`${ApiURL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        return response.ok; //esta propiedad devuelve un booleano que indica si se realizó la acción solicitada en el fetch
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false;
    }
};

//Enviar solicitud a la API para eliminar un Usuario
export async function delUsuario(id,token){
    try {
        const response = await fetch(`${ApiURL}/usuario/del/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return response.ok;
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false;
    }
}

//Enviar solicitud a la API para obtener el resgistro de todas las cervecerias creadas.
export async function getCervecerias(token){
    try {
        const data = await fetch(`${ApiURL}/cervecerias`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        return data.json();
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false;
    }
};

//Enviar solicitud a la API para agregar una nueva Cerveceria
export async function setCerveceria(data,token){
    try {
        const response = await fetch(`${ApiURL}/cervecerias`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        return response.ok; //esta propiedad devuelve un booleando que indica si se realizó la acción solicitada en el fetch
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false;
    }
};

//Enviar solicitud a la API para eliminar una Cerveceria
export async function delCerveceria(id,token){
    try {
        const response = await fetch(`${ApiURL}/cerveceria/del/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return response.ok;
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false;
    }
};

//====== INNER JOIN ========
//Enviar solicitud a la API para obtener el registro de todas las CATEGORIAS de una respectiva CERVECERIA.
export async function getCatsByCervID(id,token){
    try {
        const data = await fetch(`${ApiURL}/categorias/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return data.json();
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false;
    }
};


//Enviar solicitud a la API para agregar una nueva CATEGORÍA de una respectiva CERVECERÍA
export async function setCategoriaByCervID(id,desc,token){
    try {
        const response = await fetch(`${ApiURL}/categorias/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({desc})
        });
        return response.ok;
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false; 
    }
};


//Enviar solicitud a la API para eliminar una CATEGORÍA
export async function delCategoria(id,token){
    try {
        const response = await fetch(`${ApiURL}/categoria/del/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return response.ok;
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false;
    }
};