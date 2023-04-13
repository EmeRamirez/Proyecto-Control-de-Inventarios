import {sequelize} from "./data/bd.js";
import { Categoria } from "./data/class/Categoria.js";
import { Cerveceria } from "./data/class/Cerveceria.js";
import { Cliente } from "./data/class/Cliente.js";
import { Estado } from "./data/class/Estado.js";
import { Item } from "./data/class/Inventario.js";
import { Rol } from "./data/class/Rol.js";
import { Usuario } from "./data/class/Usuario.js";


// await syncTables();

// await nuevoRol('master');
// await nuevoRol('admin');
// await nuevoRol('user');

// await nuevoEstado('En Uso');
// await nuevoEstado('En Proceso');
// await nuevoEstado('Limpio');
// await nuevoEstado('Sucio');
// await nuevoEstado('Fuera de Servicio');

// await nuevaCateg('Vacío');








export async function getUsers(){
    
}

async function nuevoRol(desc){
    try {
        const rol = await Rol.create({
            descripcion:desc
        });
        console.log(`Rol ${desc} creado.`);
    } catch (error) {
        console.log('No se pudo crear el nuevo rol.');
    }
};

async function nuevoEstado(desc){
    try {
        const estado = await Estado.create({
            descripcion:desc
        });
        console.log(`Estado ${desc} creado.`);
    } catch (error) {
        console.log('No se pudo crear el nuevo estado.');
    }
};

async function nuevaCateg(desc){
    try {
        const cat = await Categoria.create({
            descripcion:desc
        });
        console.log(`Categoria ${desc} creada.`);
    } catch (error) {
        console.log('No se pudo crear la nueva categoria.');
    }
};

export async function syncTables(){
    try {
      await sequelize.sync();
      console.log('Las tablas fueron sincronizadas exitosamente.');
    } catch (error) {
      console.error('Error al sincronizar tablas:', error);
    }
};
