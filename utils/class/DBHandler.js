import {sequelize} from "../../data/bd.js";
import { Categoria } from "../../data/class/Categoria.js";
import { Cerveceria } from "../../data/class/Cerveceria.js";
import { Cliente } from "../../data/class/Cliente.js";
import { Estado } from "../../data/class/Estado.js";
import { Item } from "../../data/class/Inventario.js";
import { Rol } from "../../data/class/Rol.js";
import { Usuario } from "../../data/class/Usuario.js";



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
    } catch (error) {
        console.error('Error al crear el nuevo usuario', error);
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
    } catch (error) {
        console.error('Error al crear cervecería', error);
    }
};


//Funcion para obtener todos los datos de una tabla
export async function DBget(clase){
    const data = await clase.findAll({
        raw:true
    });
   
    return data;
};

// sequelize.sync();


//Función para obtener el resultado de un left join de un registro de la tabla1 por ID, incluyendo una tabla2
export async function getTablaJoinbyID(clase1,clase2,id){
    const res = await clase1.findAll({
        where:{
            id_usuario : id
        },
        include:clase2,
    });
    const data = JSON.stringify(res,null,2);
    const resp = JSON.parse(data);
    return(resp[0]);
};

console.log(await getTablaJoinbyID(Usuario,Cerveceria,5)); 


// await nuevoUsuario('Matias','Aguirre','matias123','matias@gmail.com',1,2);
// await nuevoUsuario('Misael','Leyton','misael123','misael@gmail.com',1,2);
// await nuevoUsuario('Oscar','Chavez','oscar123','oscar@gmail.com',1,2);

// await nuevoUsuario('Tuku','A','tuku123','tuku@gmail.com',2,2);
// await nuevoUsuario('Mauricio','B','mauricio123','mauricio@gmail.com',2,2);
// await nuevoUsuario('Pablo','C','pablo123','pablo@gmail.com',2,2);
// await nuevoUsuario('Eder','D','eder123','eder@gmail.com',2,3);

// await nuevoUsuario('Francisco','Mono','mono123','mono@gmail.com',3,2);
// await nuevoUsuario('Marcos','Galdames','marcos123','marcos@gmail.com',3,2);
// await nuevoUsuario('Balú','Balu','balu123','balu@gmail.com',3,3);



// await nuevaCerveceria('Cervecería Brígida','Brigida SPA','77889910-1','Calle Falsa 123','La Cisterna');
// await nuevaCerveceria('Cervecería Sibaros','Sibaros SPA','88991120-1','Calle Verdadera 123','Viña del Mar');
// await nuevaCerveceria('Cervecería Biuzt','Biuzt SPA','99112230-1','Calle Probable 123','Viña del Mar');