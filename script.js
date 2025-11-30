// ---- CONTADOR ----
const fechaEvento = new Date("2026-02-28T21:00:00").getTime();

function actualizarContador() {
  const ahora = new Date().getTime();
  const distancia = fechaEvento - ahora;

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  document.getElementById("dias").textContent = isFinite(dias) ? dias : 0;
  document.getElementById("horas").textContent = isFinite(horas) ? horas : 0;
  document.getElementById("minutos").textContent = isFinite(minutos) ? minutos : 0;
  document.getElementById("segundos").textContent = isFinite(segundos) ? segundos : 0;
}

setInterval(actualizarContador, 1000);
actualizarContador();

// ---- SLIDER ----
let indice = 0;
const imagenes = document.querySelectorAll(".slides img");

function cambiarSlide() {
  if (!imagenes || imagenes.length === 0) return;
  imagenes[indice].classList.remove("active");
  indice = (indice + 1) % imagenes.length;
  imagenes[indice].classList.add("active");
}

setInterval(cambiarSlide, 2000);

// ---- FORMULARIO GOOGLE SHEETS (ASISTENCIA) ----
const scriptURL = "https://script.google.com/macros/s/AKfycbzytIvk58hHswyogUHy5BOEgozFJuNuY8_aB4JxH9FHkuoboN7bDQuVXy6fcVzEvoOL/exec"; // reemplazá con tu URL real

const form = document.getElementById("formAsistencia");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const asistira = document.querySelector("input[name='asistira']:checked").value;
    const data = new FormData(form);
    const mensaje = document.getElementById("mensaje");

    fetch(scriptURL, { method: "POST", body: data })
      .then(() => {
        // Mensaje según opción
        if (asistira === "Sí") {
          mensaje.textContent = "¡Qué alegría que vengas! 💕💫 Gracias por confirmar.";
        } else {
          mensaje.textContent = "¡Gracias por avisarme 🤗💕!";
        }

        form.reset();

        // 🔥 Ocultar mensaje después de 15 segundos
        setTimeout(() => {
          mensaje.textContent = "";
        }, 10000);
      })
      .catch(() => {
        mensaje.textContent = "Error al enviar. Intenta más tarde.";

        // 🔥 También desaparecerlo después de 15s en caso de error
        setTimeout(() => {
          mensaje.textContent = "";
        }, 15000);
      });
  });
}


// ---- MODAL DRESS CODE ----
const dressModal = document.getElementById("modal");
const openDressBtn = document.getElementById("openDressModal");
const closeDressBtn = document.getElementById("closeModal");

if (openDressBtn && dressModal) {
  openDressBtn.onclick = () => dressModal.style.display = "flex";
}

if (closeDressBtn && dressModal) {
  closeDressBtn.onclick = () => dressModal.style.display = "none";
}

// ---- MODAL CUENTA ----
const cuentaModal = document.getElementById("cuentaModal");
const openCuentaBtn = document.getElementById("openCuentaModal");
const closeCuentaBtn = cuentaModal ? cuentaModal.querySelector(".close") : null;

if (openCuentaBtn && cuentaModal) {
  openCuentaBtn.onclick = () => cuentaModal.style.display = "flex";
}

if (closeCuentaBtn && cuentaModal) {
  closeCuentaBtn.onclick = () => cuentaModal.style.display = "none";
}

// Cerrar al hacer clic fuera
window.addEventListener("click", (event) => {
  if (event.target === dressModal) dressModal.style.display = "none";
  if (event.target === cuentaModal) cuentaModal.style.display = "none";
});

// ---- AUDIO REPRODUCTOR ----
const playButtons = document.querySelectorAll(".play-btn");

playButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const audio = btn.nextElementSibling;

    // Pausar otros audios
    document.querySelectorAll(".card-audio").forEach((a) => {
      if (a !== audio) a.pause();
    });

    // Reproducir / pausar
    if (audio.paused) {
      audio.play();
      btn.textContent = "⏸️ Pausar";
    } else {
      audio.pause();
      btn.textContent = "🎵 Reproducir";
    }

    // Al terminar vuelve al texto original
    audio.onended = () => {
      btn.textContent = "🎵 Reproducir";
    };
  });
});

function copiarTexto(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    mostrarToast("¡Copiado!");
  });
}

function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000); // desaparece en 2 segundos
}