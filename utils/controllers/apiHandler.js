//Dirección API local
// const ApiURL = 'http://localhost:4000/mmkapi';

//Direccion API Railway
const ApiURL = 'https://api-mmk-production.up.railway.app/mmkapi';


//================================>>TOKEN FETCH<<================================//

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


//================================>>USUARIOS<<================================//

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



//================================>>CERVECERÍAS<<================================//

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

export async function updImgCerv(id,rutaimg,token){
    try {
        const response = await fetch(`${ApiURL}/cervecerias/updimg/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({rutaimg})
        });
        return response.ok;
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false; 
    }
};


//================================>>CATEGORÍAS<<================================//

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


//================================>>INVENTARIO<<================================//
//Enviar solicitud a la API para obtener el registro de todos los ITEMS de una respectiva CERVECERIA.
export async function getItemsByCervID(id,token){
    try {
        const data = await fetch(`${ApiURL}/inventario/${id}`,{
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



//Enviar solicitud a la API para registrar un nuevo ITEM a una respectiva CERVECERIA
export async function nuevoItem(obj,id,token){
    try {
        const response = await fetch(`${ApiURL}/inventario/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(obj)
        });
        return response.ok;
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false; 
    }
};

//Función para generar un nombre código para un nuevo Item
export function codifNombre(string){
    let str = string.split(' ');
    let str2 = str[str.length-1].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let codname;
    if (str2.length < 2){
        codname = str2+str2+str2+str2;
    } else {
        codname = (str2[0]+str2[1]+str2[str2.length-2]+str2[str2.length-1]).toUpperCase();
    };
    return codname;
};

//Enviar solicitud a la API para eliminar un ITEM
export async function delItem(id,token){
    try {
        const response = await fetch(`${ApiURL}/inventario/del/${id}`,{
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

//Enviar solicitud a la API para actualizar el registro de un ITEM(id)
export async function updItem(obj,id,token){
    try {
        const response = await fetch(`${ApiURL}/inventario/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(obj)
        });
        return response.ok;
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false; 
    }
};

//Enviar solicitud a la API para obtener la sumatoria de cada uno de los ESTADOS de los ITEMS de una respectiva CERVECERIA(id)
export async function contarEstados(id,token){
    try {
        const data = await fetch(`${ApiURL}/inventario/conteo/${id}`,{
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

//================================>>CLIENTES<<================================//
//Enviar solicitud a la API para obtener el registro de todas las CATEGORIAS de una respectiva CERVECERIA.
export async function getClientesByCervID(id,token){
    try {
        const data = await fetch(`${ApiURL}/clientes/${id}`,{
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


//Enviar una solicitud a la API para añadir un nuevo CLIENTE
export async function setClienteByCervID(id,obj,token){
    try {
        const response = await fetch(`${ApiURL}/clientes/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(obj)
        });
        return response.ok;
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false; 
    }
};


//Enviar solicitud a la API para eliminar un CLIENTE
export async function delCliente(id,token){
    try {
        const response = await fetch(`${ApiURL}/clientes/del/${id}`,{
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


//================================>>PRODUCCIONES<<================================//
//Enviar solicitud a la API para obtener el registro de todas las PRODUCCIONES VIGENTES (exceptuando Devueltos) de una respectiva CERVECERIA .
export async function getProduccionesVigByID(id,token){
    try {
        const data = await fetch(`${ApiURL}/produccion/${id}`,{
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

//Enviar solicitud a la API para obtener el historial de todas las PRODUCCIONES de una respectiva CERVECERIA.
export async function getProduccionesHistByID(id,token){
    try {
        const data = await fetch(`${ApiURL}/produccion/historial/${id}`,{
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

//Enviar una solicitud a la API para crear un nuevo registro en la tabla PRODUCCIONES
export async function setNewProduccion(id,obj,token){
    try {
        const response = await fetch(`${ApiURL}/produccion/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(obj)
        });
        return response.ok;
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false; 
    }
}

//Enviar solicitud a la API para actualizar el registro de una PRODUCCION(id)
export async function updProdbyID(id,obj,token){
    try {
        const response = await fetch(`${ApiURL}/produccion/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(obj)
        });
        return response.ok;
    } catch (error) {
        console.log('Error al comunicarse con la API', error);
        return false; 
    }
};

