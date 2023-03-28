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
app.use(express.static("public"));

app.listen(3000);