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

//Alert sesión expirada
function sesionExp(){
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Su sesión ha expirado. Ingrese nuevamente',
        showConfirmButton: false,
        timer: 1000,
        background: '#3A3A49',
        color: '#fff',
      })
      .then(()=>{
        window.location.href='/login';
      });
};


//Confirmar delete
async function confDel(form){
    Swal.fire({
        title: '¿Estás seguro que quieres eliminar un registro?',
        text: "Este cambio no puede ser revertido",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Si, bórralo!',
        background: '#3A3A49',
        color: '#fff'
      }).then((result) => {
        if(result.isConfirmed){
           form.submit()
        } 
      })
};

//Confirmar cambio
async function confChg(form){
    Swal.fire({
        title: '¿Estás seguro que quieres modificar el registro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Si, modifícalo!',
        background: '#3A3A49',
        color: '#fff'
      }).then((result) => {
        if(result.isConfirmed){
           form.submit()
        } 
      })
};

//Alert success
function confSucc(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Operación exitosa.',
        showConfirmButton: false,
        background: '#3A3A49',
        color: '#fff',
        timer: 1500
      })
};

//Alert success con redireccion
function confSuccRedir(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Operación exitosa.',
        showConfirmButton: false,
        background: '#3A3A49',
        color: '#fff',
        timer: 1500
    })
    .then(()=>{
        window.location.href='/app';
    })
};

//Alert fail
function failAlert(){
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Operación fallida, intente nuevamente.',
        showConfirmButton: false,
        background: '#3A3A49',
        color: '#fff',
        timer: 1500
    })
};

//Alert fail con redireccion
function failAlertRedir(){
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Operación fallida, intente nuevamente.',
        showConfirmButton: false,
        background: '#3A3A49',
        color: '#fff',
        timer: 500
    })
    .then(()=>{
        window.location.href='/app';
    })
};



async function itCuenta(e){
    let num = parseInt(e.getAttribute('data-target'));
    console.log(num);
    let interval = 200;

    for (let i=0;i<=num;i++){
        setTimeout(() => {
            console.log(i);
            e.firstChild.textContent = i;
        }, interval);
        interval = interval + 60;
        if (i > num-5){
        interval = interval + 120;
        }
    }
};


if (document.getElementById('ver-mas-btn')){
    let btnvm = document.getElementById('ver-mas-btn');
    let alternador = false;
    btnvm.addEventListener('click',()=>{
        if (!alternador){
            document.querySelector('.card-subcont-edicion').classList.remove('d-none');
            btnvm.innerText=('- Ver menos')
            alternador = true;
        } else {
            document.querySelector('.card-subcont-edicion').classList.add('d-none');
            btnvm.innerText=('+ Ver más')
            alternador = false;
        }   
    }); 
};

async function confirmarProduccion(form){
    let seleccat = document.getElementById('selectorcat');

    Swal.fire({
        title: `Se creará una nueva producción de ${seleccat.options[seleccat.selectedIndex].text}`,
        text: 'La selección de esta categoría no puede ser revertida.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, crear!'
      }).then((result) => {
        if (result.isConfirmed) {
          form.submit();
        }
      })
};

/* <script>
  let formupd = document.getElementById('editem');
  formupd.addEventListener('submit', e => {
      e.preventDefault();
      confChg(formupd);
  })
</script> */