const botonesAgregar = document.querySelectorAll(".btn-agregar");

// Agrega un evento de clic a cada botón
botonesAgregar.forEach(boton => {
  boton.addEventListener("click", () => {
    const container = boton.closest(".lista-container"); // Encuentra el contenedor más cercano
    const input = container.querySelector(".input-item"); // Encuentra el input dentro del contenedor
    const lista = container.querySelector(".lista"); // Encuentra la lista dentro del contenedor
    
    if (input.value.trim() !== "") {
      const nuevoItem = document.createElement("li");
      nuevoItem.textContent = input.value;

      // Botón de eliminar para cada elemento de la lista
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "❌";
      botonEliminar.onclick = function() {
        lista.removeChild(nuevoItem);
      };

      nuevoItem.appendChild(botonEliminar); // Añade el botón al nuevo elemento
      lista.appendChild(nuevoItem); // Añade el nuevo elemento a la lista
      input.value = ""; // Limpia el campo de entrada
    }
  });
});
function eliminarItem(boton) {
    const item = boton.parentNode;
    item.parentNode.removeChild(item);
  }
//Boton FORMULARIO
function abrirSeccion(seccion) {
    // Selecciona el formulario y actualiza su id
    const formulario = document.querySelector("[id^='agregarProducto-']");
    formulario.id = `agregarProducto-${seccion}`;

  }

  //BOTON ARRIBA
  window.onscroll = function() {
    const btnSubir = document.getElementById("btnSubir");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      btnSubir.style.display = "block";
    } else {
      btnSubir.style.display = "none";
    }
  };
  
  // Función para subir al principio de la página
  function subirPagina() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Desplazamiento suave
    });
  }


//CARRUSEL
const carSld = document.getElementById("carrusel-slides");
const carSlds = document.querySelector("#carrusel-slides .slide");
const carRight = document.querySelector(".btn-next");
const carLeft = document.querySelector(".btn-prev");
let direction;

carRight.onclick = function () {
  carSld.scrollLeft += 220;  
};

carLeft.onclick = function () {
  carSld.scrollLeft -= 220;
};



const scrollContainer = document.querySelector('.drag-scroll');

let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  scrollContainer.classList.add('active');
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('mouseleave', () => {
  isDown = false;
  scrollContainer.classList.remove('active');
});

scrollContainer.addEventListener('mouseup', () => {
  isDown = false;
  scrollContainer.classList.remove('active');
});

scrollContainer.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 3; // Ajusta la velocidad de desplazamiento
  scrollContainer.scrollLeft = scrollLeft - walk;
});


function animar(){
  
  const elemento = document.getElementById("carrito");

  if (elemento.classList.contains("animacion")) {
    document.getElementById("carrito").classList.remove("animacion")
  } else {
    document.getElementById("carrito").classList.add("animacion")
  }
}

function activarCategoria(elemento){
  if(elemento === 'pasteles'){
    document.getElementById("pasteles").classList.remove("desactivado")
    document.getElementById("galletas").classList.add("desactivado")
    document.getElementById("roles").classList.add("desactivado")
    document.getElementById("roles").classList.add("desactivado")
  }
  if(elemento === 'galletas'){
    document.getElementById("pasteles").classList.add("desactivado")
    document.getElementById("galletas").classList.remove("desactivado")
    document.getElementById("roles").classList.add("desactivado")
  }

  
}