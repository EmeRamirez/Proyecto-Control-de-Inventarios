//Función para mapeo de imagen de página principal
let clickMap = (opcion) => {
    switch (opcion) {
        case 0: 
            $("#foto-modal").attr('src', "../src/img/barril-filling-res78-difu.png");
            $("#txt-modal-titulo").html("No pierdas más Barriles");
            $("#txt-modal-parrafo").html("Organiza tus despachos y retiros, minimiza las pérdidas.");        
        break;
        case 1: console.log('se selecciono el cod-barra');
            $("#foto-modal").attr('src', "../src/img/en-constru.png");
            $("#txt-modal-titulo").html("En construcción"); 
            $("#txt-modal-parrafo").html("Estamos maullando para usted.");
        break;
        case 2: 
            $("#foto-modal").attr('src', "../src/img/camion-ajus.png");
            $("#txt-modal-titulo").html("Localiza todos tus barriles.");
            $("#txt-modal-parrafo").html("Monitorea la ubicación de tus activos y organiza tu ruta de la forma más óptima.");
        break; 
        case 3: console.log('se selecciono el tiempo'); 
            $("#foto-modal").attr('src', "../src/img/en-constru.png");
            $("#txt-modal-titulo").html("En construcción"); 
            $("#txt-modal-parrafo").html("Estamos maullando para usted.");

        break;
        case 4: console.log('se selecciono el graficos');
            $("#foto-modal").attr('src', "../src/img/en-constru.png");
            $("#txt-modal-titulo").html("En construcción");  
            $("#txt-modal-parrafo").html("Estamos maullando para usted.");
        break;
        case 5: console.log('se selecciono el barril2'); 
            $("#foto-modal").attr('src', "../src/img/en-constru.png");
            $("#txt-modal-titulo").html("En construcción"); 
            $("#txt-modal-parrafo").html("Estamos maullando para usted.");
        break;
        case 6:
            $("#foto-modal").attr('src', "../src/img/bagazo-ajustado.png");
            $("#txt-modal-titulo").html("Automatiza tareas de inventario");
            $("#txt-modal-parrafo").html("Despreocúpate de tu logística y prioriza otros procesos de tu cervecería.");
        break;
        case 7: console.log('se selecciono el beershop');
            $("#foto-modal").attr('src', "../src/img/en-constru.png");
            $("#txt-modal-titulo").html("En construcción");
            $("#txt-modal-parrafo").html("Estamos maullando para usted.");  
        break;      
    }
}


//Funcion para validar formulario
function validarForm(){
    const forms = document.querySelectorAll('.needs-validation');

    let estado = false; 

    forms.forEach(form => {
        if (form.checkValidity()) { 
            estado = true;
        };

        form.classList.add('was-validated');
    });

    return estado;
};  

function enviarMail() {
    if (validarForm()){
        var params = {
            from_name : "Contacto Meet My Keg",
            email_id : "contacto.meetmykeg@gmail.com",
            user_name : document.querySelector('#firstName').value,
            user_lastname : document.querySelector('#lastName').value,
            user_email : document.querySelector('#email').value,
            user_empresa : document.querySelector('#empresa').value,
            message : document.querySelector('#textarea').value,
        }
        emailjs.send("service_m33t", "template_if9akze", params).then(function (res) {
            document.querySelector('#notificacion-contacto').classList.remove('d-none');
        });
    };
}

function cerrarMsjSuccess(){
    document.querySelector('#notificacion-contacto').classList.add('d-none');
}

if(document.getElementById('btn-login')){
    let boton = document.getElementById('btn-login');

    // boton.addEventListener('click',()=>{
    //     validarForm()
    // })


    let inte = 0;
    boton.addEventListener('mouseover',function achicar(){
        boton.style.width = ('40%');

        setTimeout(() => {
            boton.innerHTML=('<i class="fa-solid fa-check" style="color: #ffffff;"></i>')
            boton.style.borderRadius=('50px');
        }, 350);   
               
        // boton.removeEventListener('mouseover',achicar)
    })

    boton.addEventListener('mouseout',function agrandar(){
        boton.style.width = ('100%');

        setTimeout(() => {
           boton.innerHTML=('INGRESAR')
        }, 350);   
        
    })  
}

if (document.querySelector('#mensaje-login')){
   let mensajeError = document.querySelector('#mensaje-login')
    setTimeout(() => {
        mensajeError.classList.add('d-none');
    }, 3000);
}





