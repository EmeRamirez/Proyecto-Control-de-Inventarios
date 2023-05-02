# Meet-My-Keg
Meet My Keg es una aplicación de gestión de inventarios, enfocada la solución logística y en el control de activos retornables de medianas y grandes cervecerías.

## Entorno de desarrollo
La aplicación y su respectiva página web estan desarrollada totalmente en Javascript, en un entorno de Node.JS, utilizando frameworks y librerías tales como Express y Handlebars. 

### API y Base de Datos
La base de datos relacional opera sobre PostgreSQL y es manejada como ORM con Sequelize através de una API. Actualmente la API se encuentra servida en ``` Railway.app ``` , sin embargo se recomienda realizar una copia de dicho proyecto y servirlo de forma local con nuevas configuraciones: ``` git clone https://github.com/EmeRamirez/Api-MMK.git ```

## Instrucciones para configurar la API local
1. Run ``` npm i ``` 
2. Crear un archivo llamado ``` .env ``` en la raíz del proyecto y añadir las variables de entorno en el siguiente formato:
    {imagen}
3. Para sincronizar las tablas realizar una solicitud GET a su API con la siguiente dirección: ``` http://localhost:PORT/mmkapi/sincronizar ```
4. Ejecutar el código SQL contenido en el archivo ``` query-inicial.sql ``` Cualquiera de los usuarios listados en este archivo puede ser utilizado para ingresar a la aplicación una vez realizada la inserción de datos.
5. Run ``` npm start ``` 

## Instrucciones para configurar la aplicación
1. Run ``` npm i ```
2. Para ingresar a la aplicación web, es necesario levantar la API REST, para administrar esta comunicación, se puede alternar el enlace de esta, pasando de la base de datos local a la API de prueba alojada en ``` Railway.App ```, para esto, se debe comentar/descomentar las líneas 2 y 5 respectivamente en el archivo ``` utils/controllers/apiHandler.js ```. 
> (Tomar en cuenta la configuración en el archivo ``` src/database/database.js ``` en la API, cuyo puerto debe ser modificado en la línea 13)
2. Run ``` npm start ```

## Manual de uso básico de la aplicación

### Creación de Cervecerías, Usuarios y Categorías

+ Es posible **crear y administrar** nuevas cervecerías, usuarios y categorías a través del menú desplegable en esquina superior derecha, sin embargo no todas estas opciones estarán disponibles para todos los usuarios. Por ejemplo, solo el usuario de rol **master** puede crear nuevas cervecerías y solo un usuario **admin** puede añadir nuevos usuarios en su cervecería. (Ver la imagen del *Modelo Entidad Relación* para mayor referencia).
    {imagen}
    
+ Una vez creada una cervecería, podemos ingresar con alguno de los usuarios registrados en esta y **añadir un logo** para esta. Dicha imagen aparecerá cuando queramos imprimir etiquetas para nuestros items.
    {imagen}

### Creación de Items para el inventario

+ Ya podemos pasar a ver el **inventario** {imagen}. En esta sección, nos encontraremos con un panel superior en el cual podemos: **Añadir un nuevo Item** o **Ver el inventario de producciones**. En la sección principal veremos la lista de items activos y vacíos con sus respectivos estados. Para comenzar, agregaremos algunos clickeando en el ícono de **Nuevo Item**. {imagen}
Estos serán nuestros contenedores para almacenar nuestras producciones.

+ Al volver a la ventana principal de la sección **inventario** ya veremos nuestros barriles, y en la última columna (Desktop) o en el menú desplegable (Mobile), encontraremos un botón para modificar dicho item. {imagen} 
En este menú podremos modificar los estados del contenedor vacío, el que denominaremos **Item**. 

+ En este menú se generará un código QR único para tu **Ítem**, el cual podemos visualizar al clickear en el enlace *Ver Etiqueta*. ¿Recuerdas que te dije que subieras una imagen para tu cervecería? Pues ya nos estamos entendiendo ;). 

{imagen}

+ En la parte inferior encontraras un enlace para **imprimir tu etiqueta personalizada**, la cual podras adherir a tu item físico y nunca más perderlo de vista, sobre todo cuando tenga tus suculentas producciones... hablando de esto *¡Vamos a llenarlo con cerveza fría!*


### Creación de Producciones

+ Para llenar utilizar un Item como contenedor de una **Producción**, presionaremos el ícono de *editar* {imagen} en cualquier Item **no se encuentre En Uso** y luego presionaremos en el botón que dice **Llenar Barril** *¡Preparen esos vasos!*

+ Una vez creada una **Producción**, ya podemos visualizarla en el ícono que aparece en el panel de inventario {imagen}. En esta nueva sección nos encontraremos con un nuevo panel superior en el cual podremos: **Añadir nuevos Clientes** o **Ver el historial de Producciones** (Incluyendo producciones pasadas no vigentes... *si, esta herramienta suena útil al momento de querer generar informes y en un futuro le sacaremos más provecho, paciencia amigo mío*)

+ En esta sección tambien podremos cambiar los **Procesos** en los que se encuentran nuestras producciones {imagen}, como mantenerlas: *En Proceso*, *Reservadas* o bien darlas por concluidas con el proceso *Devuelto*, esta última acción volverá el estado del Item a **Sucio**(Vacío) y esta producción pasará a la lista de **Producciones No Vigentes**, cuya lista encontrarás en la sección de **Historial de Producciones.**

### Informes (Beta)
Actualmente en la sección de **Informes** solo contaremos con 2 estadísticas 

+ La primera es un **gráfico dinámico** que nos mostrará el recuento de nuestros Items, para saber rápidamente cuantos items tenemos *En Uso* o *Disponibles* para nuevas producciones. Los otros gráficos se encuentran en desarrollo y estarán disponibles antes de que tu cerveza pierda el gas!

    {imagen}

+ La segunda, es una lista con los últimos Items modificados, con su respectiva fecha.

    {imagen}

### Escaneo de códigos QR

+ La última sección restante y una indispensable, es el módulo para escaneo de códigos. Si bien es funcional y no tiene problemas, áun se encuentra en desarrollo la parte estética. Solo dale acceso a tu cámara, acerca tu lente al código y ve como automáticamente te redirecciona al respectivo enlace de edición. ¿Qué? ¿cómo? Ah si... algunos ítems son vacios y otros ya tienen contenido, pero relájate, la aplicación sabrá determinar si **escaneaste un item con producción vigente o un item vacío** y te llevará directamente al menú que corresponda.



### Repositorio 
[https://github.com/EmeRamirez/Proyecto-Control-de-Inventarios.git](https://github.com/EmeRamirez/Proyecto-Control-de-Inventarios.git)

### Rúbrica de Revisión de Portafolio
[https://docs.google.com/document/d/1dEDqXpSnXXfRzzCr3cL8X_B9FvaxKqhXFcDgdV5xLE8/edit?usp=sharing](https://docs.google.com/document/d/1dEDqXpSnXXfRzzCr3cL8X_B9FvaxKqhXFcDgdV5xLE8/edit?usp=sharing)

### Desarrollado por:
<li>Emerson Ramírez</li>