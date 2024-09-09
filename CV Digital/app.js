// Menu lateral
var menu_visible = false;
let menu = document.getElementById("nav");

function mostrarOcultarMenu() {
    menu.classList.toggle('visible');
    menu_visible = !menu_visible;
}

// Oculto el menu una vez que selecciono una opción
let links = document.querySelectorAll("nav a");
for (var x = 0; x < links.length; x++) {
    links[x].onclick = function() {
        menu.classList.remove('visible');
        menu_visible = false;
    }
}

// Creo las barritas de una barra particular identificada por su id
function crearBarra(id_barra) {
    for (let i = 0; i <= 16; i++) {
        let div = document.createElement("div");
        div.className = "e";
        id_barra.appendChild(div);
    }
}

// Selecciono todas las barras generales para luego manipularlas
let html = document.getElementById("html");
crearBarra(html);
let javascript = document.getElementById("javascript");
crearBarra(javascript);
let wordpress = document.getElementById("wordpress");
crearBarra(wordpress);
let photoshop = document.getElementById("photoshop");
crearBarra(photoshop);
let php = document.getElementById("php");
crearBarra(php);
let ilustrator = document.getElementById("ilustrator");
crearBarra(ilustrator);

// Ahora voy a guardar la cantidad de barritas que se van a ir pintando por cada barra
// para eso utilizo un arreglo, cada posición pertenece a un elemento
// comienzan en -1 porque no tiene ninguna pintada al iniciarse
let contadores = [-1, -1, -1, -1, -1, -1];
// Esta variable la voy a utilizar de bandera para saber si ya ejecutó la animación
let entro = false;

// Función que aplica las animaciones de las habilidades
function efectoHabilidades() {
    var habilidades = document.getElementById("habilidades");
    var distancia_skills = window.innerHeight - habilidades.getBoundingClientRect().top;
    if (distancia_skills >= 300 && !entro) {
        entro = true;
        const barras = [
            { id: "html", cantidad: 16 },
            { id: "javascript", cantidad: 11 },
            { id: "wordpress", cantidad: 11 },
            { id: "photoshop", cantidad: 15 },
            { id: "php", cantidad: 16 },
            { id: "ilustrator", cantidad: 11 }
        ];

        barras.forEach((barra, index) => {
            const interval = setInterval(() => {
                pintarBarra(document.getElementById(barra.id), barra.cantidad, index, interval);
            }, 100);
        });
    }
}

// Llena una barra particular con la cantidad indicada
function pintarBarra(id_barra, cantidad, indice, interval) {
    contadores[indice]++;
    let x = contadores[indice];
    if (x < cantidad) {
        let elementos = id_barra.getElementsByClassName("e");
        elementos[x].style.backgroundColor = "#940253";
    } else {
        clearInterval(interval);
    }
}

// Detecto el scrolling del mouse para aplicar la animación de la barra
const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        efectoHabilidades();
    }
}, { threshold: 0.5 });

observer.observe(document.getElementById("habilidades"));

// Inicializa EmailJS con la clave pública correcta
emailjs.init('Oqm8_UcGLJzDiH473'); // Reemplaza con tu clave pública real

// Función para enviar el formulario a través de EmailJS
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Previene el envío del formulario de manera tradicional

    // Enviar formulario con EmailJS
    emailjs.sendForm('POA', 'template_ri13r15', this)
    .then(function(response) {
        alert('¡Mensaje enviado con éxito!');
        console.log('Éxito:', response);
        window.location.reload(); // Recarga la página después de enviar el formulario
    }, function(error) {
        console.error('Error:', error);
        alert('Ocurrió un error: ' + JSON.stringify(error));
    });
});