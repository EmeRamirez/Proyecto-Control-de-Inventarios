import {sequelize} from "../../data/bd.js";
import { Categoria } from "../../data/class/Categoria.js";
import { Cerveceria } from "../../data/class/Cerveceria.js";
import { Cliente } from "../../data/class/Cliente.js";
import { Estado } from "../../data/class/Estado.js";
import { Item } from "../../data/class/Inventario.js";
import { Rol } from "../../data/class/Rol.js";
import { Usuario } from "../../data/class/Usuario.js";


//Función para obtener todo el inventario de una determinada Cerveceria incluyendo descripcion de categoría
export async function getInventariobyID(idcerv){
    const res = await Item.findAll({
        include: [{
            model: Categoria,
            required: true,
            attributes:['descripcion'],
            include:[{
                model: Cerveceria,
                required:true,
                attributes:[],
                where: {
                    id_cerveceria:idcerv
                }
            }]
        }]

    })
    let data = JSON.stringify(res)
    return JSON.parse(data);
};

let inven = await getInventariobyID(2);
// console.log(inven);

//Función para obtener todo el inventario de todas las cervecerias incluyendo los subcampos.
export async function getInventarioAll(){
    const res = await Item.findAll({
        include: [{ all:true}]
    })
    let data = JSON.stringify(res)
    return JSON.parse(data);
};

//Función para obtener todo el inventario una determinada cerveceria incluyendo los subcampos.
export async function getInventariobyID2(idcerv){
    const res = await Item.findAll({
        include: [Estado,{
            model: Categoria,
            required: true,
            attributes:['descripcion'],
            include:[{
                model: Cerveceria,
                required:true,
                attributes:[],
                where: {
                    id_cerveceria:idcerv
                }
            }], 
        }]

    })
    let data = JSON.stringify(res)
    return JSON.parse(data);
};


// let res = await getInventariobyID2(4);
// console.log(res.map(e => e.estado.descripcion));

//Función para insertar una nuevo usuario en la tabla 'usuarios'
export async function nuevoUsuario(nombre,apellido,pass,mail,idcerv,idrol){
    try {
        const user = await Usuario.create({
            nombre_usuario:nombre,
            apellido_usuario:apellido,
            password:pass,
            email:mail,
            id_cerveceria:idcerv,
            id_rol:idrol
        });
        console.log(`El nuevo usuario ha sido creado con éxito.`);
        return true;
    } catch (error) {
        console.error('Error al crear el nuevo usuario', error);
        return false;
    }
};

//Función para insertar una nueva cervecería en la tabla 'cervecerias'
export async function nuevaCerveceria(nombre,razs,rut,direc,cmna){
    try {
        const cerv = await Cerveceria.create({
            nombre_cerveceria:nombre,
            razonsocial:razs,
            rut_empresa:rut,
            direccion:direc,
            comuna:cmna
        });
        console.log(`La nueva cervecería ha sido creada con éxito.`);
        return true;
    } catch (error) {
        console.error('Error al crear cervecería', error);
        return false;
    };
};

//Funcion para contar los estados de la lista de items de determinada cervecería.
export async function contarEstados(idcerv){
    try {
        const res = await sequelize.query(`SELECT est.descripcion, COUNT(est.id_estado) AS Conteo_estado FROM inventario as i INNER JOIN estados as est ON i.id_estado = est.id_estado INNER JOIN categorias as cat ON i.id_categoria = cat.id_categoria INNER JOIN cervecerias as cer ON cer.id_cerveceria = cat.id_cerveceria WHERE cer.id_cerveceria = ${idcerv} GROUP BY est.descripcion`);
        return res[0];
    } catch (error) {
        console.error('Error al contar los estados del inventario.', error);
    }
};

// console.table(await contarEstados(4));
// console.log(await contarEstados(4));



//Funcion para obtener todos los datos de una tabla
export async function DBget(clase){
    const data = await clase.findAll({
        raw:true
    });
   
    return data;
};


//Función para obtener el resultado de un left join de un registro de la tabla1 por ID, incluyendo una tabla2
export async function getTablaJoinbyID(clase1,id,clase2){
    try {
        const res = await clase1.findAll({
            where:{
                id_usuario : id
            },
            include:clase2,
        });
        const data = JSON.stringify(res,null,2);
        const resp = JSON.parse(data);
        return(resp[0]);    
    } catch (error) {
        console.error('No se pudo encontrar el registro.',error)
    }
};

// const result = await getTablaJoinbyID(Usuario,2,Cerveceria);
// console.log(result.cerveceria.razonsocial);
// console.log(result);

// console.log(await DBget(Item));


//Función para añadir un nuevo estado a la tabla 'estados'
export async function nuevoEstado(desc){
    try {
        const estado = await Estado.create({
            descripcion:desc
        });
        console.log(`Estado ${desc} creado.`);
    } catch (error) {
        console.error('No se pudo crear el nuevo estado.',error);
    }
};

//Función para añadir un nuevo item a la tabla 'inventario'
export async function nuevoItem(qrcode,_tipo,capac,obs,idcliente,idestado,idcateg){
    try {
        const item = await Item.create({
            qr_code:qrcode,
            tipo:_tipo,
            capacidad:capac,
            observacion:obs,
            id_cliente:idcliente,
            id_estado:idestado,
            id_categoria:idcateg,
        });
        console.log(`Nuevo ${_tipo} registrado`);
    } catch (error) {
        console.error('No se pudo crear el nuevo item.',error); 
    }
}

//Función para añadir una nueva categoria a la tabla 'categorias'
export async function nuevaCateg(desc,idcerv){
    try {
        const cat = await Categoria.create({
            descripcion:desc,
            id_cerveceria:idcerv
        });
        console.log(`Categoria ${desc} creada.`);
    } catch (error) {
        console.error('No se pudo crear la nueva categoria.',error);
    }
};


//Función para añadir un nuevo rol a la tabla 'roles'
export async function nuevoRol(desc){
    try {
        const rol = await Rol.create({
            descripcion:desc
        });
        console.log(`Rol ${desc} creado.`);
    } catch (error) {
        console.error('No se pudo crear el nuevo rol.',error);
    }
};

//Función para sincronizar tablas
export async function syncTables(){
    try {
      await sequelize.sync();
      console.log('Las tablas fueron sincronizadas exitosamente.');
    } catch (error) {
      console.error('Error al sincronizar tablas:', error);
    }
};