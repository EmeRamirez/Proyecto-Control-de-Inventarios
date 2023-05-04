import express from "express";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import indexRoutes from "./routes/routes.js";
import * as helpers from "./utils/helpers/hbs.js";
import hbs from "hbs";
import fileUpload from "express-fileupload";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(fileUpload());
export const __dirname = dirname(fileURLToPath(import.meta.url));
hbs.registerPartials(join(__dirname,"/views/partials"));
app.use(indexRoutes);
app.set('view engine', 'hbs');
app.set('views' , './views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/sweetalert2/dist'))


try {
    app.listen(PORT, ()=>{
        console.log(`Server is listening in port ${PORT}`);
    });
} catch (error) {
    console.error('No se pudo levantar el servidor.',error);
};


