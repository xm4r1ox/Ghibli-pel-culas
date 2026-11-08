const url = "https://ghibliapi.dev/films";
let todasLasPeliculas = [];

function mostrarPeliculas(lista) {
    const contenedor = document.getElementById("peliculas");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "No se encontraron películas.";
        return;
    }

    lista.forEach(pelicula => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("pelicula");
        tarjeta.innerHTML = `
            <h3>${pelicula.title}</h3>
            <p><strong>Director:</strong> ${pelicula.director}</p>
            <p><strong>Año:</strong> ${pelicula.release_date}</p>
            <p>${pelicula.description}</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}

async function obtenerPeliculas() {
    const contenedor = document.getElementById("peliculas");
    try {
        const respuesta = await fetch(url);
        todasLasPeliculas = await respuesta.json();
        mostrarPeliculas(todasLasPeliculas);
    } catch (error) {
        contenedor.innerHTML = "No se pudieron cargar las películas.";
        console.error("Error:", error);
    }
}

// EVENTO: filtra mientras el usuario escribe
document.getElementById("buscador").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const filtradas = todasLasPeliculas.filter(p =>
        p.title.toLowerCase().includes(texto)
    );
    mostrarPeliculas(filtradas);
});

obtenerPeliculas();