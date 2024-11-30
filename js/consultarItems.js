// Obtener Items
const plantillaItem = document.querySelector(".ContenedorItem");
const contenedorItems = document.querySelector("#ColeccionItems");

// Pantalla Edicion
var arregloPanelesCreacion;

fetch("http://localhost:3001").then(recurso => recurso.json()).then(archivo => {

    for(i = 0; i < archivo.length; i++){
        var clon = plantillaItem.cloneNode(true);
        contenedorItems.appendChild(clon);
    }

    const arregloItems = document.querySelectorAll(".ContenedorItem");
    console.log(arregloItems.length);

    console.log(archivo.length);
    for(i = 0; i < archivo.length; i++){

        // Cambiar los valores del Item
        const titulo = arregloItems[i].querySelector(".Titulo");
        titulo.innerHTML = archivo[i].titulo;
        const descripcion = arregloItems[i].querySelector(".Descripcion");
        descripcion.innerHTML = archivo[i].descripcion;
        const imagen = arregloItems[i].querySelector(".Imagen");

        imagen.style.backgroundImage = "url(" + archivo[i].imagen + ")";

        // Funcionalidad modificar
        const botonEditar = arregloItems[i].querySelector(".Icono_Editar");
        botonEditar.tag = i;
        botonEditar.addEventListener("click", function(evento){
            mostrarPanelEditar(evento.currentTarget.tag);
            
        });

        const botonActualizar = arregloItems[i].querySelector("button");
        botonActualizar.tag = i;
        botonActualizar.addEventListener("click", function(evento){
            guardarCambios(evento.currentTarget.tag);
        })
        const imagenActualizar = arregloItems[i].querySelector("img");

        // Funcionalidad borrar Item
        const botonEliminar = arregloItems[i].querySelector(".Icono_Borrar");
        botonEliminar.tag = i;
        botonEliminar.addEventListener("click", function(evento){
            borrarItem(evento.currentTarget.tag);
        });

    }
    arregloPanelesCreacion = document.querySelectorAll(".PanelCreacionItem");
    arregloItems[arregloItems.length - 1].style.display = "none";

    arregloItems[arregloItems.length - 1].querySelector(".PanelCreacionItem").style.display = "flex";

    // Poner la pantalla de creación hasta el final
    const pantallaCreacion = document.querySelector(".PantallaAgregarItem");
    //var clon = pantallaCreacion.cloneNode(true);
    contenedorItems.appendChild(pantallaCreacion);
})

function crearNuevoItem(){
    const objetoNuevoItem = {
        "id": -1,
        "titulo": "...",
        "descripcion": "...",
        "imagen": "https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
    }
    fetch("http://localhost:3001/", {method: "POST", body: JSON.stringify(objetoNuevoItem)}).then(archivo => archivo.text()).then(texto => {
        location.reload();
    });
}

function guardarCambios(numeroBoton){
    var input = arregloPanelesCreacion[numeroBoton].querySelector(".input_imagen")
    //var imagen = arregloPanelesCreacion[numeroBoton].querySelector(".PanelCreacionItem img");

    const campoTitulo = arregloPanelesCreacion[numeroBoton].querySelector("input");
    const campoDescripcion = arregloPanelesCreacion[numeroBoton].querySelector("textarea");
    
    var archivo = input.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = function(){
        //imagen.src = reader.result;

        const objetoNuevoItem = {
            "id": numeroBoton,
            "titulo": campoTitulo.value,
            "descripcion": campoDescripcion.value,
            "imagen": reader.result
        }
        console.log(objetoNuevoItem);

        fetch("http://localhost:3001/", {method: "PUT", body: JSON.stringify(objetoNuevoItem)}).then(archivo => archivo.text()).then(texto => {
            location.reload();
        });
    }
}

function mostrarPanelEditar(numeroBoton){
    console.log(arregloPanelesCreacion[numeroBoton]);
    arregloPanelesCreacion[numeroBoton].style.display = "flex";
}

var inputPrueba = document.querySelector(".input_prueba");
inputPrueba.addEventListener("change", function (){
    alert("hola");

    var archivo = inputPrueba.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = function(){
        fetch("http://localhost:3001/prueba", {method: "POST", body: reader.result}).then(archivo => archivo.text()).then(texto => {
            location.reload();
        });
    }    
});

function borrarItem(numeroBoton){
    var objetoBorrarItem = {
        "id": numeroBoton
    }
    fetch("http://localhost:3001/", {method: "DELETE", body: JSON.stringify(objetoBorrarItem)}).then(archivo => archivo.text()).then(texto => {
        location.reload();
    });
}