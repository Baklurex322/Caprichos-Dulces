var arregloPanelesEdicion;

fetch("http://localhost:3001/").then(recursos => recursos.json()).then(archivo => {
    console.log(archivo);

    const platillaItem = document.querySelector(".ContenedorItem");
    const contenedorItems = document.querySelector("#ColeccionItems");

    for(i = 0; i < archivo.length -1; i++){
        var clon = platillaItem.cloneNode(true);
        contenedorItems.appendChild(clon);
    }

    var arregloItems = document.querySelectorAll(".ContenedorItem");
    arregloPanelesEdicion = document.querySelectorAll(".PanelCreacionItem");

    for(i = 0; i < arregloItems.length; i++){

        //Obtener Campos items
        const titulo = arregloItems[i].querySelector(".nombreProducto");
        titulo.innerHTML = archivo[i].titulo;

        const descripcion = arregloItems[i].querySelector(".Descripcion");
        descripcion.innerHTML = archivo[i].descripcion;

        const imagen = arregloItems[i].querySelector(".img-producto");
        imagen.style.backgroundImage = "url(" + archivo[i].imagen + ")";

        const precio = arregloItems[i].querySelector(".costo");
        precio.innerHTML = archivo[i].precio;

        const cantidad = arregloItems[i].querySelector(".costo");
        cantidad.innerHTML = archivo[i].cantidad;



        //PANTALLAS DE EDICION
        //ArregloPanelesEdicion[i].style.display = "flex";
        //console.log(arregloPanelesEdicion);
        const botonEditar = arregloItems[i].querySelector(".Icono_Editar");
        botonEditar.tag = i; //tag es una variable cualquiera, solo que aqui se llamó tag
        botonEditar.addEventListener("click", function(evento){
            //arregloPanelesEdicion[i].style.display = "flex"; 
            //console.log(evento.currentTarget.tag);
            arregloPanelesEdicion[evento.currentTarget.tag].style.display = "flex";
        })

        
         //boton de actualizar
        const botonActualizarCambios = arregloPanelesEdicion[i].querySelector("button");
        botonActualizarCambios.tag2 = i;
        botonActualizarCambios.addEventListener("click", function(evento)
        {

            botonGuardarCambiosPress(evento.currentTarget.tag2);

        })

        //botonde borrar
        const BorrarBtn = arregloItems[i].querySelector(".Icono_Borrar");
        BorrarBtn.tag = i;
        BorrarBtn.addEventListener("click", function(evento)
        {
        alert("Borrar el producto:  " + evento.currentTarget.tag); //con evento.currentTarget.tag te dice el elemento actual
        fetch("http://localhost:3001", {
            method: "DELETE",
            body: JSON.stringify(objdel)
            }).then(respuesta => 
                {
            alert("Elemento eliminado");
            location.reload();

            });

        })
        
        


    }

    //agregar el botón de agregar item hasta el final de la lista
    const botonAgregarItem = document.querySelector(".PantallaAgregarItem");
    contenedorItems.appendChild(botonAgregarItem);


});

function botonGuardarCambiosPress(numero)
{

    //titulo
    const campTitulo = arregloPanelesEdicion[numero].querySelector(".inputTitulo");
    //campTitulo.value = "texto Generico";  //value se peude usar en etiquetas que no requieren cerrarse, como <img>
    //console.log(campTitulo);

    //descripcion
    const campDescripcion = arregloPanelesEdicion[numero].querySelector("textarea");
    console.log(campDescripcion.value);
    //campDescripcion.innerHTML = "a chiquita"; //Inner.HTML sirve para insertar info en etiqeutas que se abren y cierran como <div></div> 

    //img
    const campImg = arregloPanelesEdicion[numero].querySelector(".input_imagen");
    var archivo = campImg.files[0];
    var reader = new FileReader();//aqui es para meter archivo
    reader.readAsDataURL(archivo);
    reader.onload =  function(){
        console.log(reader.result);

        //trasnformar toda la info en JaSon
        const nuevoItem = {
            "titulo": campTitulo.value,
            "descripcion" : campDescripcion.value,
            "imagen" : reader.result
        }

        //Aqui modificamos info
        //Para mandar info se debe convertir a texto, y para recibir informacion se debe trnasformar a Json
        fetch("http://localhost:3001", {
            method: "PUT",
            body : JSON.stringify(nuevoItem)


        });

        location.reload(); //esta linea recarga el sitio cada que se guarde un cambio
        //console.log(nuevoItem);
    }

   
    

    /*alert("Haz guardado un cambio en la tarjeta no: " + evento.currentTarget.tag2);
    //alert(campTitulo.value); con este imprimimos el valor que ingresa el usuario en el campod designado
    alert(campDescripcion.innerHTML);*/


}
 //aqui usamos un boton conectado con el htlm
 function ClickAgregarItm()
 {

     //aqui vamos a insertar info
     var newItem2 = {
         "id" : -1,
         "titulo": "...",
         "descripcion" : "...",
         "img" : "https://preview.redd.it/no-hace-nada-v0-dil3g2kfdbid1.png?auto=webp&s=86576347e637f0772c1f768bcf1f4a2fc893ce9a"

     }

     fetch("http://localhost:3001", {
         method: "POST",
         body : JSON.stringify(newItem2)


     }).then(respuesta => { //este .then se realiza una vez que toda la funcion terminó, es como una funcion que se realiza a continuacion de la pasada solo si lo hizo de manera correcta
            alert("pche cosa inutil, ahi ta");
            location.reload();
     });
     

 }