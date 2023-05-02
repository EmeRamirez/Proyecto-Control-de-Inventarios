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
    switch (num){
        case 1:
            return 'Entregado';
        case 2:
            return 'Reservado';
        case 3:
            return 'Listo';
        case 4:
            return 'En Proceso';
        case 5:
            return 'Limpio';
        case 6:
            return 'Sucio';
        case 7:
            return 'Fuera de Servicio'
        default:
            return 'Sin estado asignado'
    }   
});

hbs.registerHelper('normfecha', function (str) {
    let date = new Date(str);  
    let dia = new Date(date).getDate()
    let mes = new Date(date).getMonth()+1
    let anio = new Date(date).getFullYear()
    let fecha = `${dia}/${mes}/${anio}`

    return fecha;
});

