import {sequelize} from "./data/bd.js";
import { Categoria } from "./data/class/Categoria.js";
import { Cerveceria } from "./data/class/Cerveceria.js";
import { Cliente } from "./data/class/Cliente.js";
import { Estado } from "./data/class/Estado.js";
import { Item } from "./data/class/Inventario.js";
import { Rol } from "./data/class/Rol.js";
import { Usuario } from "./data/class/Usuario.js";
import { syncTables, getTablaJoinbyID, nuevoRol, nuevoEstado, nuevoUsuario, nuevaCerveceria, nuevaCateg, nuevoItem, getInventariobyID } from "./utils/class/DBHandler.js";


// await syncTables();

// await nuevoRol('master');
// await nuevoRol('admin');
// await nuevoRol('user');

// await nuevoEstado('Entregado');
// await nuevoEstado('Reservado');
// await nuevoEstado('Listo');
// await nuevoEstado('En Proceso');
// await nuevoEstado('Limpio');
// await nuevoEstado('Sucio');
// await nuevoEstado('Fuera de Servicio');

// await nuevaCerveceria('Cervecería Brígida','Brigida SPA','77889910-1','Calle Falsa 123','La Cisterna');
// await nuevaCerveceria('Cervecería Sibaros','Sibaros SPA','88991120-1','Calle Verdadera 123','Viña del Mar');
// await nuevaCerveceria('Cervecería Biuzt','Biuzt SPA','99112230-1','Calle Probable 123','Viña del Mar');

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

// await nuevaCateg('Vacio',1);
// await nuevaCateg('Otro',1);
// await nuevaCateg('Vacio',2);
// await nuevaCateg('Otro',2);
// await nuevaCateg('Vacio',3);
// await nuevaCateg('Otro',3);
// await nuevaCateg('Fruta Madre',1);
// await nuevaCateg('Toque de Stout',1);
// await nuevaCateg('Belgian Strong',1);
// await nuevaCateg('Tropical IPA',2);
// await nuevaCateg('Loica Red Ale',2);
// await nuevaCateg('Chocombuesa',2);
// await nuevaCateg('Golden Ale',3);
// await nuevaCateg('American Ambar',3);
// await nuevaCateg('Hazy APA',3);

//                  qr,     tipo,          capac, obs, clte,est,cat
// await nuevoItem('BRDA01','Barril Inox','30 Lts',null,null,2,7);
// await nuevoItem('BRDA02','Barril Inox','30 Lts',null,null,4,7);
// await nuevoItem('BRDA03','Barril Inox','30 Lts',null,null,3,9);
// await nuevoItem('BRDA04','Barril Inox','30 Lts',null,null,3,8);
// await nuevoItem('BRDA05','Barril Inox','30 Lts',null,null,3,8);
// await nuevoItem('BRDA06','Barril Inox','30 Lts',null,null,6,1);

// await nuevoItem('SIOS01','Barril Inox','30 Lts',null,null,4,11);
// await nuevoItem('SIOS02','Barril Inox','30 Lts',null,null,3,11);
// await nuevoItem('SIOS03','Barril Inox','30 Lts',null,null,3,10);
// await nuevoItem('SIOS04','Cilindro','9 Kg',null,null,3,4);
// await nuevoItem('SIOS05','Barril Inox','30 Lts',null,null,6,3);

// await nuevoItem('BIZT01','Barril Inox','30 Lts',null,null,3,13);
// await nuevoItem('BIZT02','Barril Inox','30 Lts',null,null,3,14);
// await nuevoItem('BIZT03','Barril Inox','30 Lts',null,null,4,15);
// await nuevoItem('BIZT04','Schopera','4 salidas',null,null,3,6);
// await nuevoItem('BIZT05','Barril Inox','30 Lts',null,null,6,5);


// await nuevoUsuario('Eme','RS','eme123','emerson.ramirez@gmail.com',1,1);


// let listaBarriles = await getInventarobyID(4);
// console.log(listaBarriles);



// const res = await clase1.findAll({
//     where:{
//         id_usuario : id
//     },
//     include:clase2,
// });



let arrItems = await getInventariobyID(2);
console.log(arrItems);
console.log(arrItems[3].categoria.descripcion);
    
// export async function getprueba(idcerv){
//         const data = await Item.findAll({
//             where:{

//             },
//             include: Categoria,
//         })
//         let res = JSON.stringify(data);
//         return JSON.parse(res);
// };

// let arrItems2 = await getprueba(2);
// console.log(arrItems2);

