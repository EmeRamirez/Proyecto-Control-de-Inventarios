# Meet-My-Keg
Meet My Keg es una aplicación de gestión de inventarios, enfocada la solución logística y en el control de activos retornables de medianas y grandes cervecerías.

## Entorno de desarrollo
La aplicación y su respectiva página web estan desarrollada totalmente en Javascript, en un entorno de Node.JS, utilizando frameworks y librerías tales como Express y Handlebars. 

### Demo de la Aplicación
La aplicación se encuentra desplegada en entorno de prueba en el siguiente link: [Meet-My-Keg-Testing](https://mmk-production.up.railway.app/)

Es posible solicitar una cuenta de prueba clickeando en este ícono:

<p align="center">
  <img src="https://user-images.githubusercontent.com/115498370/236369729-a6fd83b3-7532-447e-9d4e-3bc5e6806ec1.PNG">
</p>

Se debe completar la información solicitada y automáticamente se enviará una nueva cuenta al correo registrado en el formulario.
Si decide probar la aplicación desplegada en línea, se recomienda visitar la sección: [**Manual de uso básico de la aplicación**](https://github.com/EmeRamirez/Proyecto-Control-de-Inventarios#manual-de-uso-b%C3%A1sico-de-la-aplicaci%C3%B3n)


### API y Base de Datos
La base de datos relacional opera sobre PostgreSQL y es manejada como ORM con Sequelize através de una API. Actualmente la API se encuentra servida en ``` Railway.app ``` , sin embargo se puede realizar una copia de dicho proyecto y servirlo de forma local con nuevas configuraciones: ``` git clone https://github.com/EmeRamirez/Api-MMK.git ```

## Instrucciones para configurar la API local
1. Run ``` npm i ``` 
2. Crear un archivo llamado ``` .env ``` en la raíz del proyecto y añadir las variables de entorno en el siguiente formato:

<p align="center">
  <img src="https://user-images.githubusercontent.com/115498370/235584371-69fa7391-25d4-48c9-be81-87b564b135ee.png"/>
</p>   
<p align="center">(JWT_KEY debe ser un string cualquiera)</p>

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
    
<p align="center"><img src="https://user-images.githubusercontent.com/115498370/235584917-b47288e4-94c8-4acf-9b27-e1150be4e969.png"></p>
    
+ Una vez creada una cervecería, podemos ingresar con alguno de los usuarios registrados en esta y **añadir un logo** para esta. Dicha imagen aparecerá cuando queramos imprimir etiquetas para nuestros items.

<p align="center"><img src="https://user-images.githubusercontent.com/115498370/235585313-e61592f9-eeb3-44d3-a6b4-277b674939f7.png"></p>

    

### Creación de Items para el inventario

+ Ya podemos pasar a ver el **inventario** ![inv-icon](https://user-images.githubusercontent.com/115498370/235585685-e92a2665-078b-4c7c-bf2e-36248711b35a.PNG)
. En esta sección nos encontraremos con un panel superior en el cual podemos: **Añadir un nuevo Item** o **Ver el inventario de producciones**. En la sección principal veremos la lista de items activos y vacíos con sus respectivos estados. Para comenzar, agregaremos algunos clickeando en el ícono de **Nuevo Item**. ![nvoitem](https://user-images.githubusercontent.com/115498370/235585769-aa40de59-a868-48cb-82bd-ec2b0a42f050.PNG)
Estos serán nuestros contenedores para almacenar nuestras producciones.

+ Al volver a la ventana principal de la sección **inventario** ya veremos nuestros barriles, y en la última columna (Desktop) o en el menú desplegable (Mobile), encontraremos un botón para modificar dicho item.  ![editicon](https://user-images.githubusercontent.com/115498370/235585904-7c700346-d177-4b03-b920-a84863b3ec4a.PNG)

En este menú podremos modificar los estados del contenedor vacío, el que denominaremos **Item**. 

+ En este menú se generará un código QR único para tu **Ítem**, el cual podemos visualizar al clickear en el enlace *Ver Etiqueta*. ¿Recuerdas que te dije que subieras una imagen para tu cervecería? Pues ya nos estamos entendiendo ;). 

<p align="center"><img src="https://user-images.githubusercontent.com/115498370/235586415-9c74a7c1-8be0-4d60-8750-ff59f6123116.PNG"></p>


+ En la parte inferior encontraras un enlace para **imprimir tu etiqueta personalizada**, la cual podras adherir a tu item físico y nunca más perderlo de vista, sobre todo cuando tenga tus suculentas producciones... hablando de esto *¡Vamos a llenarlo con cerveza fría!*


### Creación de Producciones

+ Para utilizar un Item como contenedor de una **Producción**, presionaremos el ícono de *editar* en cualquier Item que **no se encuentre En Uso** y luego presionaremos en el botón que dice **Llenar Barril** *¡Preparen esos vasos!*

+ Una vez creada una **Producción**, ya podemos visualizarla en el ícono que aparece en el panel de inventario ![produicon](https://user-images.githubusercontent.com/115498370/235586937-9b0e2659-5789-45a7-b831-5a8a94b62b14.PNG)
. En esta nueva sección nos encontraremos con un nuevo panel superior en el cual podremos: **Añadir nuevos Clientes** o **Ver el historial de Producciones** (Incluyendo producciones pasadas no vigentes... *si, esta herramienta suena útil al momento de querer generar informes y en un futuro le sacaremos más provecho, paciencia amigo mío*)

+ En esta sección tambien podremos cambiar los **Procesos** en los que se encuentran nuestras producciones, como mantenerlas: *En Proceso*, *Reservadas* o bien darlas por concluidas con el proceso *Devuelto*, esta última acción volverá el estado del Item a **Sucio**(Vacío) y esta producción pasará a la lista de **Producciones No Vigentes**, cuya lista encontrarás en la sección de **Historial de Producciones.**

<p align="center"><img src="https://user-images.githubusercontent.com/115498370/235587152-81df2d35-b306-4305-b9d6-869122be929d.png"></p>


### Informes (Beta)
Actualmente en la sección de **Informes** solo contaremos con 2 estadísticas 

+ La primera es un **gráfico dinámico** que nos mostrará el recuento de nuestros Items, para saber rápidamente cuantos items tenemos *En Uso* o *Disponibles* para nuevas producciones. Los otros gráficos se encuentran en desarrollo y estarán disponibles antes de que tu cerveza pierda el gas!

<p align="center"><img src="https://user-images.githubusercontent.com/115498370/235587242-4eceefdb-66e8-4143-a328-86637740ef24.PNG"></p>


+ La segunda, es una lista con los últimos Items modificados, con su respectiva fecha.

<p align="center"><img src="https://user-images.githubusercontent.com/115498370/235587331-d377235b-250c-44be-8cb8-1f586f661695.PNG"></p>


### Escaneo de códigos QR

+ La última sección restante y una indispensable, es el módulo para escaneo de códigos. Si bien es funcional y no tiene problemas, áun se encuentra en desarrollo la parte estética. Solo dale acceso a tu cámara, acerca tu lente al código y ve como automáticamente te redirecciona al respectivo enlace de edición. ¿Qué? ¿cómo? Ah si... algunos ítems son vacios y otros ya tienen contenido, pero relájate, la aplicación sabrá determinar si **escaneaste un item con producción vigente o un item vacío** y te llevará directamente al menú que corresponda, así que solo relájate y procura sacar tus cervezas bien frías, que ***Meet My Keg*** se encarga de tus inventarios :)



## Repositorio 
Aplicación:
[https://github.com/EmeRamirez/Proyecto-Control-de-Inventarios.git](https://github.com/EmeRamirez/Proyecto-Control-de-Inventarios.git)

Api:
[https://github.com/EmeRamirez/Api-MMK.git](https://github.com/EmeRamirez/Api-MMK.git)

## Rúbrica de Revisión de Portafolio
[https://docs.google.com/document/d/1dEDqXpSnXXfRzzCr3cL8X_B9FvaxKqhXFcDgdV5xLE8/edit?usp=sharing](https://docs.google.com/document/d/1dEDqXpSnXXfRzzCr3cL8X_B9FvaxKqhXFcDgdV5xLE8/edit?usp=sharing)

## Desarrollado por:
<li>Emerson Ramírez</li>
© Meet My Keg 2023

