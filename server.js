import express from "express";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import indexRoutes from "./routes/routes.js";
import * as helpers from "./utils/helpers/hbs.js";
import hbs from "hbs";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
hbs.registerPartials(join(__dirname,"/views/partials"));
app.use(indexRoutes);
app.set('view engine', 'hbs');
app.set('views' , './views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/sweetalert2/dist'))

try {
    app.listen(3000, ()=>{
        console.log('Server is listening in port 3000');
    });
} catch (error) {
    console.error('No se pudo levantar el servidor.',error);
};


