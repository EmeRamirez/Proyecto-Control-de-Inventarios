import * as fs from 'fs';
    
export default class JsonHandler{
    #url;
    #urluser;
    #urlcervec;
    #urlinventario;
    #urlestado;
    constructor(){
        this.#url = './data';
        this.#urluser = `${this.#url}/usuarios.json`;
        this.#urlcervec = `${this.#url}/cervecerias.json`;
        this.#urlinventario = `${this.#url}/inventario.json`;
        this.#urlestado = `${this.#url}/estado.json`;
    }

    async getUsers(){
        const dataUsers = await leerArchivo(this.#urluser);
        return dataUsers.usuario;
    } 

    async getCerv(){
        const dataCerv = await leerArchivo(this.#urlcervec);
        return dataCerv.cerveceria;
    }

    async getInventario(){
        const dataInv = await leerArchivo(this.#urlinventario);
        return dataInv.item;
    }

    async getEstados(){
        const dataEstado = await leerArchivo(this.#urlestado);
        return dataEstado.estado;
    }
}

//Funcion para leer un archivo JSON
async function leerArchivo(url) {
    const data = await fs.promises.readFile(url, (err, data) => {
        if (err) throw err 
        return data
    });
    return await JSON.parse(data);
}


//Funcion para sobreescribir un archivo JSON
async function escribirArchivo(url,data) {
    fs.writeFile(url, JSON.stringify(data), err => {
        if (err) throw console.log('No se pudo guardar el JSON');
    });
}