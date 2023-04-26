//Importaciones
import * as fs from "fs";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import flash from "express-flash";
import session from "express-session";
import bodyParser from 'body-parser';
import { Router } from "express";

//Handlers
import * as aHd from "../utils/controllers/apiHandler.js";

//Constantes
const router = Router();
const PassportLocal = passportLocal.Strategy


//Variables
let userList;
let cervList;
let usuarioLog;
let cerveceriaLog;
let inventarioCerv;
let conteoEstados;
let cervUsers;
let cervCats;
let token;


// ========== Configuración de Middleware ========== //

//body-parser
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//cookie-parser (dependencia para express-session)
router.use(cookieParser('secretString')); //Puede ser cualquier string el argumento

//express-flash
router.use(flash())

//express-session
router.use(session({
    secret: 'secretString',
    resave: true,
    saveUninitialized: false
}));

//passport
router.use(passport.initialize());
router.use(passport.session());

//passport-local - configuración de estrategia de login
passport.use(new PassportLocal(async function(username,password,done){
    token = await aHd.getToken(username);
    console.log('=============== TOKEN 1 ===============');
    console.log(token);
    userList = await aHd.getUsuarios(token);
    token = '';
    
    let validador = -1;
    if(userList.map(e => e.email).indexOf(username) != -1){
        validador = userList.map(e => e.email).indexOf(username);
    } 
    
    if (validador != -1){
        let usuario = userList[validador];

        if (usuario.password == password){
            return done(null,{id:usuario.id_usuario , user:usuario.nombre_usuario , email:usuario.email , id_cerveceria:usuario.id_cerveceria, rol:usuario.id_rol})
        } else { 
            return done(null,false,{message: 'Contraseña Incorrecta'})
        }    
    } else {
        return done(null,false,{message: 'Correo no registrado'})
    }
}));

//Se configura la serialización, para almacenar la id del usuario logueado
passport.serializeUser(function(user,done){
    // done(null,user.id);
    done(null,user);
})

//Deserialización
passport.deserializeUser(function(user,done){
    done(null,user)
})




// ====================== RUTAS ====================== //

//===================GET===================//

router.get('/', (req,res) => {
    res.render("home")
})


//===================GET===================//

router.get('/contacto', (req,res) => {
    res.render("contacto")
})


//===================GET===================//

router.get('/login', (req,res) => {
    // console.log(req.session);
        if (req.session.flash){
            if (req.session.flash.error){
            let msjError = req.session.flash.error[0].toString()
            res.render("login",{error:msjError})  
            }  else {
                res.render("login")
            }
        } else {
            res.render("login")
        } 
})


//===================POST===================//

router.post('/login', passport.authenticate('local',{
    //Si el usuario aprueba la estrategia configurada en la línea 55
    successRedirect: "/app",
    failureRedirect: "/login",
    failureFlash: true
}));


//================================>>APP<<================================//

//===================GET===================//
//En esta ruta solo se puede entrar si el usuario está autenticado, para esto se añade el método isAuthenticated()
router.get('/app', (req,res,next) => {
    if(req.isAuthenticated()) return next();

    res.redirect("/login");
} , async(req,res) => {
    //Se asigna a la variable global el usuario que se encuentra en la sesión
    usuarioLog = req.session.passport.user;
 
    //Al iniciar sesión se le asigna un token al usuario
    token = await aHd.getToken(usuarioLog.email);
    
    let auth = await aHd.authToken(token);
    if(!auth){
        res.send("<script>alert('Su sesión ha caducado. Ingrese nuevamente.');window.location.href='/login'</script>");
    } else {

        //Se asigna a la variable global la lista de cervecerías traidas desde la API
        cervList = await aHd.getCervecerias(token);
        // console.log(cervList);
        
        //Se busca la cervecería perteneciente al usuario en sesión y se asigna a la variable global
        cerveceriaLog = cervList.find(e => e.id_cerveceria == usuarioLog.id_cerveceria);
        let idcerv = usuarioLog.id_cerveceria;
        inventarioCerv = await aHd.getItemsByCervID(idcerv,token);
        usuarioLog.isMaster = false;
        usuarioLog.isAdmin = false;

        if (usuarioLog.rol == 2){
            usuarioLog.isAdmin = true;
        } else if (usuarioLog.rol == 1){
            usuarioLog.isMaster = true;
            usuarioLog.isAdmin = true;
        };


        res.render("app",{cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin})
    }
    }
);

//================================>>LOGOUT<<================================//

//===================GET===================//

router.get('/logout', (req,res,next) => {
    req.logout((err) => {
        if (err) {return next(err)};
        token = '';
        res.redirect("login");
    })  
})


//================================>>REGISTRO DE USUARIO<<================================//

//===================GET===================//
router.get('/register', async(req,res,next) => {
    if(req.isAuthenticated() && await aHd.authToken(token) != null) return next();

    res.send("<script>alert('Su sesión ha caducado. Ingrese nuevamente.');window.location.href='/login'</script>");
} , async(req,res) => {

    //Se almacena la lista de usuarios de la cervecería correspondiente al usuario y su rol para renderizar selectivamente.
    cervUsers = [];
    if(usuarioLog.rol == 3){ //Caso USER (No puede insertar ni eliminar usuarios)
        res.redirect("/app");
    } else if (usuarioLog.rol == 2){ //Caso ADMIN (Solo puede insertar y eliminar usuarios de su cervecería)
        userList.forEach(e =>{
            if (e.id_cerveceria == usuarioLog.id_cerveceria && e.email != usuarioLog.email){cervUsers.push(e)};
        });
    } else if (usuarioLog.rol == 1){ //Caso MASTER (tiene acceso a todos los usuarios, exceptuando a sí mismo)
        cervUsers = userList;
        cervUsers = cervUsers.slice(1);
    };


    res.render("register",{cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin, cervList:cervList, listaus:cervUsers})
});


//===================POST===================//

router.post('/register', async(req,res) => {

    let email    = req.body.email
    let password = req.body.password
    let name     = req.body.name
    let lastname = req.body.lastname
    let rolus    = parseInt(req.body.rolus)
    let cervus   = '';

    if (userList.map(e => e.email).indexOf(email) != -1){
        res.render("register",{error:'El correo electrónico ya se encuentra registrado',cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin, cervList:cervList})
    }else{
        if (req.body.password[0] != req.body.password[1]){
            res.render("register",{error:'Validacón de Password no válida',cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin, cervList:cervList})
        }else{
            if (usuarioLog.rol == 1){
                cervus = req.body.cervus;
            } else {
                cervus = usuarioLog.id_cerveceria;
            };

            password = password[0];

            const data = {
                name,
                lastname,        
                password,
                email,
                rolus,
                cervus
            };

            let nuevous = await aHd.setUsuario(data,token);
            console.log(`Fetch Status: ${nuevous}`);  //Esta variable almacena un booleano como valor del response.ok del fetch a la API, indicando si se realizó o no la acción

            if (nuevous){
                userList = await aHd.getUsuarios(token);
                res.send("<script>alert('Nuevo Usuario creado exitosamente.');window.location.href='/register'</script>");
            } else {
                res.send("<script>alert('No se pudo crear el usuario');window.location.href='/register'</script>")
            };
        }   
}
});

//===================POST===================//

router.post('/delusuario', async(req,res) => {
    let user = req.body.uslist;
    const elimin = await aHd.delUsuario(user,token);
    console.log(`Fetch status: ${elimin}`);

    if (elimin){
        userList = await aHd.getUsuarios(token);
        res.send("<script>alert('Usuario eliminado.');window.location.href='/register'</script>");
    } else {
        res.send("<script>alert('No se pudo eliminar al usuario.');window.location.href='/register'</script>");
    }

});


//================================>>REGISTRO DE CERVECERÍA<<================================//

//===================GET===================//
router.get('/regicerv', async(req,res,next) => {
    if(req.isAuthenticated() && await aHd.authToken(token) != null) return next();

    res.send("<script>alert('Su sesión ha caducado. Ingrese nuevamente.');window.location.href='/login'</script>");

}, async(req,res) => {
    //A esta ruta solo puede acceder el usuario con rol MASTER
    if(usuarioLog.rol == 3 || usuarioLog.rol == 2){
        res.redirect("/app");
    };


    let selectCerv = cervList.slice(1);
    console.log(selectCerv);

    res.render("regicerv",{cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin, cervlist:selectCerv})
});


//===================POST===================//

router.post('/regicerv', async(req,res,next) => {
    console.log(req.body);
    const nombre_cerv = req.body.name;
    const razons = req.body.razonsocial;
    const rutcerv = req.body.rut;
    const direcc = req.body.direccion;
    const comna = req.body.comuna;
    
    if (cervList.map(e => e.nombre_cerveceria).indexOf(nombre_cerv) != -1){
        res.render("regicerv",{error:'La cervecería ya se encuentra registrada',cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin, cervList:cervList})
    }else{
       
        const data = {
            nombre_cerv,
            razons,        
            rutcerv,
            direcc,
            comna
        };

        let newcerv = await aHd.setCerveceria(data,token);
        console.log(`Fetch Status: ${newcerv}`);  //Esta variable almacena un booleano como valor del response.ok del fetch a la API, indicando si se realizó o no la acción

        if (newcerv){
            cervList = await aHd.getCervecerias(token);
            res.send("<script>alert('Nueva cervecería creada exitosamente.');window.location.href='/regicerv'</script>");
        } else {
            res.send("<script>alert('Error al crear la nueva cervecería.');window.location.href='/regicerv'</script>")
        };

    }
});


//===================POST===================//

router.post('/delcerv', async(req,res,next) => {
    let id = req.body.cervlist;
    const elimin = await aHd.delCerveceria(id,token);
    console.log(`Fetch status: ${elimin}`);

    if (elimin){
        cervList = await aHd.getCervecerias(token);
        res.send("<script>alert('Cervecería eliminada.');window.location.href='/regicerv'</script>");
    } else {
        res.send("<script>alert('No se puso eliminar la cervecería.');window.location.href='/regicerv'</script>");
    }

});


//================================>>REGISTRO DE CATEGORÍA<<================================//

//===================GET===================//
router.get('/regicat', async(req,res,next) => {
    if(req.isAuthenticated() && await aHd.authToken(token) != null) return next();

    res.send("<script>alert('Su sesión ha caducado. Ingrese nuevamente.');window.location.href='/login'</script>");
} , async(req,res) => {
    if(usuarioLog.rol == 3){ //Caso USER (No puede insertar ni eliminar categorías)
        res.redirect("/app");
    };
    //Se almacena la lista de categorías de la cervecería correspondiente para renderizar selectivamente.
    let data = await aHd.getCatsByCervID(usuarioLog.id_cerveceria, token);
    cervCats = data;


    res.render("regicat",{cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin, catlist:cervCats})
});


//===================POST===================//

router.post('/regicat', async(req,res,next) => {
    if(req.isAuthenticated() && await aHd.authToken(token) != null) return next();

    res.send("<script>alert('Su sesión ha caducado. Ingrese nuevamente.');window.location.href='/login'</script>");
} , async(req,res) => {
    const descr = req.body.name;
    
        if (cervCats.map(e => e.descripcion.toLowerCase()).indexOf(descr.toLowerCase()) != -1){
            res.render("regicat",{error:'La categoría ya se encuentra registrada',cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin, catlist:cervCats})
        }else{
           
            let newcat = await aHd.setCategoriaByCervID(usuarioLog.id_cerveceria, descr, token);
            console.log(`Fetch Status: ${newcat}`);  
    
            if (newcat){
                cervCats = await aHd.getCatsByCervID(usuarioLog.id_cerveceria, token);
                console.log(`NUEVAS CATEGORIAS: ${cervCats}`);
                res.send("<script>alert('Nueva categoría creada exitosamente.');window.location.href='/regicat'</script>");
            } else {
                res.send("<script>alert('Error al crear la nueva categoría.');window.location.href='/regicat'</script>")
            };
        }     
    }
);

//===================POST===================//

router.post('/delcat', async(req,res,next) => {
    let id = req.body.catlist;
    const elimin = await aHd.delCategoria(id,token);
    console.log(`Fetch status: ${elimin}`);

    if (elimin){
        cervList = await aHd.getCervecerias(token);
        res.send("<script>alert('Categoría eliminada.');window.location.href='/regicerv'</script>");
    } else {
        res.send("<script>alert('No se pudo eliminar la categoría.');window.location.href='/regicerv'</script>");
    }

});


//================================>>INVENTARIO<<================================//

//===================GET===================//

router.get('/inventario', async(req,res,next) => {
    if(req.isAuthenticated() && await aHd.authToken(token) != null) return next();

    res.send("<script>alert('Su sesión ha caducado. Ingrese nuevamente.');window.location.href='/login'</script>");
} , async(req,res) => {
    inventarioCerv = await aHd.getItemsByCervID(usuarioLog.id_cerveceria,token);
    
    res.render("inventario",{inventariorender: true, cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, listaitems:inventarioCerv, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin})
});

//================================>>NUEVO ITEM<<================================//

//===================GET===================//
router.get('/nvoitem', async(req,res,next) => {
    if(req.isAuthenticated() && await aHd.authToken(token) != null) return next();

    res.send("<script>alert('Su sesión ha caducado. Ingrese nuevamente.');window.location.href='/login'</script>");
} , async(req,res) => {
    res.render("nvoitem",{inventariorender: true, cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, listaitems:inventarioCerv, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin})
});


//===================POST===================//
router.post('/nvoitem', async(req,res,next) => {
    if(req.isAuthenticated() && await aHd.authToken(token) != null) return next();

    res.send("<script>alert('Su sesión ha caducado. Ingrese nuevamente.');window.location.href='/login'</script>");
} , async(req,res) => {
    let {tipo,capacidad,obs, estado} = req.body;
    estado = parseInt(estado);
    let idcerv = usuarioLog.id_cerveceria;
    let codname = aHd.codifNombre(cerveceriaLog.nombre_cerveceria);
    
    let obj = {
        tipo,
        capacidad,
        obs,
        estado,
        idcerv,
        codname
    };

    const data = await aHd.nuevoItem(obj,idcerv,token);
    console.log(`FETCH STATUS:${data}`);

    let alert = false;
    let msj = '';
    if (data){
        alert = true;
        msj = "'Se ha creado un nuevo Item'";
    };

    inventarioCerv = await aHd.getItemsByCervID(usuarioLog.id_cerveceria,token);

    res.render("nvoitem",{alert:alert, msj:msj, inventariorender: true, cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, listaitems:inventarioCerv, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin})
});

//===================POST===================//

router.post('/delitem', async(req,res,next) => {
    if(req.isAuthenticated() && await aHd.authToken(token) != null) return next();

    res.send("<script>alert('Su sesión ha caducado. Ingrese nuevamente.');window.location.href='/login'</script>");
} , async(req,res) => {
    let id = req.body.itemlist;
    const elimin = await aHd.delItem(id,token);
    console.log(`Fetch status: ${elimin}`);

    if (elimin){
        inventarioCerv = await aHd.getItemsByCervID(usuarioLog.id_cerveceria,token);
        res.send("<script>alert('Item eliminado.');window.location.href='/inventario'</script>");
    } else {
        res.send("<script>alert('No se pudo eliminar el ítem.');window.location.href='/inventario'</script>");
    };

});

//===================GET===================//
router.get('/edicionitem/:id', async(req,res,next) => {
    if(req.isAuthenticated() && await aHd.authToken(token) != null) return next();

    res.send("<script>alert('Su sesión ha caducado. Ingrese nuevamente.');window.location.href='/login'</script>");
} , async(req,res) => {
    let id = req.params.id;
    let item;
    let invRestante = [];
    inventarioCerv.forEach(e => {
        if (e.id_item == id){
            item = e;
        } else {
            invRestante.push(e);
        };
    })
    let qrcode = `"'${item.qr_code}'"`
    res.render('edicionitem',{itemrender: true, item:item, codigoQR:qrcode, cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin, invrest:invRestante});
});

router.post('/edicionitem', async(req,res) => {

    let {itemsel,estado,tipo,capacidad,obs} = req.body;
    itemsel = parseInt(itemsel);
    estado = parseInt(estado)

    const obj = {
        estado,
        tipo,
        capacidad,
        obs,
    };
    
    const data = await aHd.updItem(obj,itemsel,token);
   
    if (data){
        res.send("<script>alert('El registro ha sido modificado con éxito');window.location.href='/inventario'</script>")
    } else {
        res.send("<script>alert('No se ha podido modificar el registro. Intente nuevamente.');window.location.href='/inventario'</script>")   
    };

});







//================================>>INFORME<<================================//

//===================GET===================//
router.get('/informe', (req,res,next) => {
    if(req.isAuthenticated()) return next();

    res.redirect("/login");
} , async(req,res) => {

    let arrlabels=[];
    let arrconteo=[];

    conteoEstados.forEach(e => {
        arrlabels.push(`"${e.descripcion}"`);
        arrconteo.push(parseInt(e.conteo_estado));
    });

    console.log(arrlabels);
    console.log(arrconteo);


    // let grafBarriles = {
    //     type: 'pie',
    //     data: {
    //       labels: ['Wena','Oe','Que','Sucede'],
    //       datasets: [{
    //         label: 'Estado de Barriles',
    //         data: [5,4,8,2],
    //         borderWidth: 0.5,
    //       }]
    //     },
    //     options: {
    //       plugins: {
    //       datalabels: {
    //         color: 'red'
    //       }
    //       }
    //     }
    // };

    // console.log(grafBarriles);
    // console.log(grafBarriles.data.datasets);
    res.render("informe",{cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin, arrLabels:arrlabels, arrDatos:arrconteo})
});



//===================TESTING===================//
router.get('/testing',async (req,res)=>{
    
});


export default router;