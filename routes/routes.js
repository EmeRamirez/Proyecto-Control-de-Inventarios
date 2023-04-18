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
import {sequelize} from "../data/bd.js";
import { Categoria } from "../data/class/Categoria.js";
import { Cerveceria } from "../data/class/Cerveceria.js";
import { Cliente } from "../data/class/Cliente.js";
import { Estado } from "../data/class/Estado.js";
import { Item } from "../data/class/Inventario.js";
import { Rol } from "../data/class/Rol.js";
import { Usuario } from "../data/class/Usuario.js";
import { DBget, getInventariobyID, nuevaCerveceria, contarEstados } from "../utils/class/DBHandler.js";
import { nuevoUsuario } from "../utils/class/DBHandler.js";


//Constantes
const router = Router();
const PassportLocal = passportLocal.Strategy
const userList = await DBget(Usuario);
const cervList = await DBget(Cerveceria);

//Variables
let usuarioLog;
let cerveceriaLog;
let inventarioCerv;
let conteoEstados;


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
passport.use(new PassportLocal(function(username,password,done){
    let validador = -1;
    // console.log(userList.map(e => e.email).indexOf(username));
    if(userList.map(e => e.email).indexOf(username) != -1){
        validador = userList.map(e => e.email).indexOf(username);
    } 
    
    if (validador != -1){
        let usuario = userList[validador];
        console.log(usuario);
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
    console.log(req.session);
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
    //Si el usuario aprueba la estrategia configurada en la línea 53
    successRedirect: "/app",
    failureRedirect: "/login",
    failureFlash: true
}));


//======================= APP ============================//

//===================GET===================//
//En esta ruta solo se puede entrar si el usuario está autenticado, para esto se añade el método isAuthenticated()
router.get('/app', (req,res,next) => {
    if(req.isAuthenticated()) return next();

    res.redirect("/login");
} , async(req,res) => {
    console.log(req.session);
    // console.log(`usuario:`,req.session.passport.user);
    usuarioLog = req.session.passport.user
    cerveceriaLog = cervList.find(e => e.id_cerveceria == usuarioLog.id_cerveceria);
    inventarioCerv = await getInventariobyID(cerveceriaLog.id_cerveceria);
    conteoEstados = await contarEstados(cerveceriaLog.id_cerveceria)
    usuarioLog.isMaster = false;
    usuarioLog.isAdmin = false;

    if (usuarioLog.rol == 2){
        usuarioLog.isAdmin = true;
    } else if (usuarioLog.rol == 1){
        usuarioLog.isMaster = true;
        usuarioLog.isAdmin = true;
    };


    res.render("app",{cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin})
})


//===================GET===================//

router.get('/logout', (req,res,next) => {
    req.logout((err) => {
        if (err) {return next(err)};
        res.redirect("login");
    })  
})


//===================GET===================//

router.get('/inventariomob', (req,res,next) => {
    if(req.isAuthenticated()) return next();

    res.redirect("/login");
} , async(req,res) => {
    
    if (usuarioLog.rol == 1){
        inventarioCerv= await DBget(Item);
    }


    res.render("inventariomob",{cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, inventario:inventarioCerv, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin})
})


//===================GET===================//

router.get('/register', (req,res,next) => {
    if(req.isAuthenticated()) return next();

    res.redirect("/login");
} , async(req,res) => {

    if(usuarioLog.rol == 3){
        res.redirect("/app");
    };

    res.render("register",{cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin, cervList:cervList})
})


//===================POST===================//

router.post('/register', async(req,res) => {

    let email     = req.body.email
    let password = req.body.password
    let name     = req.body.name
    let lastname = req.body.lastname
    let rolus    = req.body.rolus
    let cervus   = '';

    console.log(email);
    if (userList.map(e => e.email).indexOf(email) != -1){
        res.render("register",{error:'El correo electrónico ya se encuentra registrado',cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin, cervList:cervList})
    }else{
        if (req.body.password[0] != req.body.password[1]){
            res.render("register",{error:'Validacón de Password no válida',cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin, cervList:cervList})
        }else{
            if (usuarioLog.rol == 1){
                console.log(req.body);
                cervus = req.body.cervus;
            } else {
                cervus = usuarioLog.id_cerveceria;
            };

            const nuevousuario = await nuevoUsuario(name,lastname,password[0],email,cervus,parseInt(rolus));
            if (nuevousuario){
                res.send("<script>alert('Nuevo Usuario creado exitosamente.');window.location.href='/register'</script>")
            }else{
                res.send("<script>alert('Error al crear el usuario');window.location.href='/register'</script>")
            } 
        }   
}
});


//===================GET===================//

router.get('/regicerv', (req,res,next) => {
    if(req.isAuthenticated()) return next();

    res.redirect("/login");
} , async(req,res) => {

    if(usuarioLog.rol == 3){
        res.redirect("/app");
    };

    res.render("regicerv",{cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin})
});


//===================POST===================//

router.post('/regicerv', async(req,res,next) => {
    let nombre_cerv = req.body.name;
    let razons      = req.body.razonsocial;
    let rutcerv     = req.body.rut;
    let direcc      = req.body.direccion;
    let comna       = req.body.comuna;
    
    if (cervList.map(e => e.nombre_cerveceria).indexOf(nombre_cerv) != -1){
        res.render("regicerv",{error:'La cervecería ya se encuentra registrada',cerveceria:cerveceriaLog.nombre_cerveceria, nombre:usuarioLog.user, isMaster:usuarioLog.isMaster, isAdmin:usuarioLog.isAdmin, cervList:cervList})
    }else{
        const newcerv = await nuevaCerveceria(nombre_cerv,razons,rutcerv,direcc,comna);

        if (newcerv){
            res.send("<script>alert('Nueva cervecería creada exitosamente.');window.location.href='/regicerv'</script>")   
        } else {
            res.send("<script>alert('Error al crear la nueva cervecería.');window.location.href='/regicerv'</script>") 
        }    
    }
});


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