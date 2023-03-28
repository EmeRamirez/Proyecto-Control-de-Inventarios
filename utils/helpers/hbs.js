import hbs from 'hbs';

hbs.registerHelper('capitalizar', function (str) {
    let arr = str.split(" ");

    for (let i=0; i < arr.length; i++){
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");

    return str2;
})

hbs.registerHelper('nombrarEstado', function (num) {
    if (num == 1){
        return "En uso";
    } else if (num == 2){
        return "Listo para usar";
    } else if (num == 3){
        return "Sucio";
    } else if (num == 4){
        return "Fuera de Servicio";
    }
})