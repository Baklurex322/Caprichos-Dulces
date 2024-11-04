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
  }
  if(elemento === 'galletas'){
    document.getElementById("pasteles").classList.add("desactivado")
    document.getElementById("galletas").classList.remove("desactivado")
    document.getElementById("roles").classList.add("desactivado")
  }

  
}