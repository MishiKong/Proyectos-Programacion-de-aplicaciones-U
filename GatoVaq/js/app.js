// Espera a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar el modal de instrucciones al cargar la página
    document.getElementById('instructions').style.display = 'flex';

    // Manejar el clic en el botón para comenzar el juego
    document.getElementById('start-button').addEventListener('click', () => {
        document.getElementById('instructions').style.display = 'none';
        iniciarJuego(); // Iniciar el juego después de cerrar las instrucciones
    });
});

let Gato = document.querySelector('.Gato');
let body = document.querySelector('body');
let disparo = document.getElementById('disparo');
let explosion = document.getElementById('explosion');
let live = document.querySelector('i');
let times = document.getElementById('times');
let scoreDisplay = document.querySelector('#score i');

let lives = 5;
let score = 0;
let second = 60;

// Frecuencias de aparición de enemigos
const frecuenciaEnemigos = {
    enemigo1: 100,
    enemigo2: 99,
    enemigo3: 97,
    enemigo4: 95
};

// Velocidades de caída de enemigos
const velocidadEnemigos = {
    enemigo1: 9,
    enemigo2: 16,
    enemigo3: 25,
    enemigo4: 30
};

// Función para obtener el tipo de enemigo
function obtenerTipoEnemigo() {
    const tiposDeEnemigos = ['enemigo1', 'enemigo2', 'enemigo3', 'enemigo4'];
    let probabilidad = Math.random() * 100;
    if (second >= 20) {
        if (probabilidad < 80) return 'enemigo1';
        if (probabilidad < 90) return 'enemigo2';
        if (probabilidad < 95) return 'enemigo3';
        return 'enemigo4';
    } else {
        if (probabilidad < 90) return 'enemigo1';
        if (probabilidad < 95) return 'enemigo2';
        if (probabilidad < 100) return 'enemigo3';
        return 'enemigo4';
    }
}

// Función que inicia el juego
function iniciarJuego() {
    // Temporizador para el juego
    let gameInterval = setInterval(() => {
        second--;
        times.textContent = second;
        if (second == 0) {
            clearInterval(gameInterval);
            alert('You Win!');
            location.reload();
        }
    }, 1000);

    // Movimiento del Gato
    document.addEventListener('mousemove', (e) => {
        Gato.style.left = (e.clientX - 40) + 'px';
    });

    // Generar disparo
    document.addEventListener('click', () => {
        let bala = document.createElement('div');
        bala.classList.add('bala');
        bala.style.bottom = 70 + 'px';
        bala.style.left = (Gato.getBoundingClientRect().left + 30) + 'px';
        body.append(bala);
        disparo.currentTime = 0; // Reinicia el tiempo del sonido
        disparo.play(); // Reproduce el sonido del disparo
    });

    // Movimiento de disparo
    setInterval(() => {
        let balas = document.querySelectorAll('.bala');
        balas.forEach(bala => {
            bala.style.top = (bala.getBoundingClientRect().top - 15) + 'px'; // Ajusta la velocidad
            if (bala.getBoundingClientRect().top <= 0) {
                bala.remove();
            }

            // Detectar las colisiones
            let enemigos = document.querySelectorAll('.enemigo');
            enemigos.forEach(enemigo => {
                if (bala.getBoundingClientRect().top <= enemigo.getBoundingClientRect().top + 50) {
                    if (bala.getBoundingClientRect().left >= enemigo.getBoundingClientRect().left &&
                        bala.getBoundingClientRect().left <= enemigo.getBoundingClientRect().left + 80) {
                        
                        // Determinar puntos según el tipo de enemigo
                        let puntos = 0;
                        if (enemigo.classList.contains('enemigo1')) {
                            puntos = 1;
                        } else if (enemigo.classList.contains('enemigo2')) {
                            puntos = 2;
                        } else if (enemigo.classList.contains('enemigo3')) {
                            puntos = 3;
                        } else if (enemigo.classList.contains('enemigo4')) {
                            puntos = 4;
                        }

                        // Actualizar el puntaje
                        score += puntos;
                        scoreDisplay.textContent = score;

                        // Efecto de explosión
                        enemigo.style.backgroundImage = 'url("img/explosion.png")';
                        explosion.currentTime = 0;
                        explosion.play(); 
                        
                        setTimeout(() => {
                            enemigo.remove();
                        }, 100);
                    }
                }
            });
        });
    }, 100);

    // Generar enemigos
    let aparecer = 0;
    setInterval(() => {
        aparecer++;
        const tiempoRestante = Math.max(1, second);
        const frecuencia = Math.max(5, Math.floor((60 - tiempoRestante) / 5));

        if (aparecer % frecuencia === 0) {
            const tipoEnemigo = obtenerTipoEnemigo();
            let enemigo = document.createElement('div');
            enemigo.classList.add('enemigo', tipoEnemigo);
            body.append(enemigo);

            const posX = Math.random() * (window.innerWidth - 80);
            enemigo.style.left = posX + 'px';
            enemigo.style.top = '0px';
            enemigo.velocidad = velocidadEnemigos[tipoEnemigo];
        }

        // Mover enemigos
        let enemigos = document.querySelectorAll('.enemigo');
        enemigos.forEach(element => {
            element.style.top = (element.getBoundingClientRect().top + element.velocidad) + 'px';
            if (element.getBoundingClientRect().top > Gato.getBoundingClientRect().top) {
                lives--;
                live.textContent = lives;
                if (lives == -1) {
                    alert('Game Over');
                    location.reload();
                }
                element.remove();
            }
        });
    }, 100);
}
