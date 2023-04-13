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
import JsonHandler from "../utils/class/JsonHandler.js";
const jsonHandler = new JsonHandler(); 


//Constantes
const router = Router();
const PassportLocal = passportLocal.Strategy
const userList = await jsonHandler.getUsers();
const cervList = await jsonHandler.getCerv();

//Variables
let usuarioLog;
let cerveceriaLog;


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
    saveUninitialized: true
}));

//passport
router.use(passport.initialize());
router.use(passport.session());

//passport-local - configuración de estrategia de login
passport.use(new PassportLocal(function(username,password,done){
    let validador = -1;
    if(userList.map(e => e.user).indexOf(username) == -1){
        validador = userList.map(e => e.email).indexOf(username);
        } else {validador = userList.map(e => e.user).indexOf(username);
    }
    
    if (validador != -1){
        let usuario = userList[validador];
        if (usuario.pass == password){
            return done(null,{id:usuario.id , user:usuario.user , pass:usuario.pass , email:usuario.email , id_cerveceria:usuario.id_cerveceria})
        } else { 
            return done(null,false,{message: 'Contraseña Incorrecta'})
        }    
    } else {
        return done(null,false,{message: 'El usuario no existe'})
    }
}))

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
} , (req,res) => {
    usuarioLog = req.session.passport.user
    cerveceriaLog = cervList.find(e => e.id == usuarioLog.id_cerveceria);
    let isMaster = false;
    let isAdmin = false;

    res.render("app",{cerveceria:cerveceriaLog.nombre, nombre:usuarioLog.user, isMaster:isMaster, isAdmin:isAdmin})
})

router.get('/logout', (req,res,next) => {
    req.logout((err) => {
        if (err) {return next(err)};
        res.redirect("login");
    })  
})


router.get('/inventariomob', (req,res,next) => {
    if(req.isAuthenticated()) return next();

    res.redirect("/login");
} , async(req,res) => {
    let dataInventario = await jsonHandler.getInventario();
    let arrInventario = [];
    dataInventario.forEach(e => {
        if (e.id_cerveceria == cerveceriaLog.id){
            arrInventario.push(e);
        }
    })

    res.render("inventariomob",{cerveceria:cerveceriaLog.nombre, inventario:arrInventario})
})


//===================TESTING===================//
router.get('/testing',async (req,res)=>{
    

})


export default router;