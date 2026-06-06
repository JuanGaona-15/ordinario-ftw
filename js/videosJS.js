document.addEventListener("DOMContentLoaded", () => {//Misma instruccion de carga
    
    // Constantes
    const reproductor = document.querySelector(".reproductor");
    const botonAnterior = document.getElementById("anterior");
    const botonSiguiente = document.getElementById("siguiente"); 

    // Videos (con embed para que se puedan incrustar)
    const misVideos = [
        {
            titulo: "Shin Megami Tensei III: Nocturne - Gameplay PS2",
            url: "https://www.youtube.com/embed/qhxOkH1F8CU?si=x6_P9JwXlJGBjFAy"
        },

        {
            titulo: "Radirgy - Gameplay Arcade",
            url: "https://www.youtube.com/embed/0reiugo0Z9E?si=NVCe3vZsHDmz2oRk"
        },

        {
            titulo: "Tokyo Xtreme Racer Zero - Gameplay PS2",
            url: "https://www.youtube.com/embed/XhSaYD8NOLg?si=B51KEv4ByaUkcqXx"
        },

        {
            titulo: "Halo Reach - Gameplay Xbox 360",
            url: "https://www.youtube.com/embed/XwfLJmCcmts?si=Q25Yp0iIzIeFWHco"
        },

        {
            titulo: "The King of Fighters 2002 UM - Gameplay",
            url: "https://www.youtube.com/embed/3IhFxQQsVLI?si=dRQDkDLosLYyVxPy"
        }
    ];

    let indiceActual = 0; // Indice del video
    //Usar formato para los links de video con un elemento iframe
    function actualizarVideo() {
        const video = misVideos[indiceActual];
        reproductor.innerHTML = `
            <iframe 
                src="${video.url}" 
                title="${video.titulo}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;
    }

    //LISTENERS
    // Boton siguiente
    botonSiguiente.addEventListener("click", () => {
        indiceActual++; 
        if (indiceActual >= misVideos.length) {
            indiceActual = 0;
        }
        actualizarVideo();
    });

    // boton anterior
    botonAnterior.addEventListener("click", () => {
        indiceActual--; 
        if (indiceActual < 0) {
            indiceActual = misVideos.length - 1;
        }
        actualizarVideo();
    });

    // Cargar el primer video en automatico
    actualizarVideo();
});