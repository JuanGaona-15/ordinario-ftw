//No uso el metodo de cargar antes, debe cargar de inmediato
let tablaPlataformas = document.getElementsByClassName("plataformas");
let tablaTitulo = document.getElementsByClassName("titulo-plataforma");
let tablaLogo = document.getElementsByClassName("imagen-plataforma");
let tablaInformacion = document.getElementsByClassName("info-plataforma");

// fetch (conseguir) el xml
fetch("xml/plataformas.xml")
    .then(response => {
        // Si no funciona
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo XML");
        }
        // Si funciona
        return response.text();
    })
    .then(dataText => {
        // Convertimos el texto plano en un documento XML para trabajarlo
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(dataText, "text/xml");           
        const listaPlataformas = xmlDoc.getElementsByTagName("plataforma"); // Lista de plataformas
        // Recorrer plataformas
        for (let i = 0; i < 6 ; i++) {
            const plataforma = listaPlataformas[i];
            const titulo = plataforma.getElementsByTagName("titulo")[0].textContent;
            const informacion = plataforma.getElementsByTagName("informacion")[0].textContent;
            const logo = plataforma.getElementsByTagName("logo")[0].textContent;
            tablaTitulo[i].textContent = titulo;
            tablaLogo[i].innerHTML  = `<img class="logos" width = "200px" height = "200px" src="${logo}" alt="logo">`;
            tablaInformacion[i].innerHTML = `<p>${informacion}</p>`;
        }

        // Buscador
        const inputBusqueda = document.getElementById("input-busqueda");
        inputBusqueda.addEventListener("input", () => {
            const textoBuscado = inputBusqueda.value.toLowerCase();
            for (let i = 0; i < 6; i++) {
                const filaActual = tablaTitulo[i].parentNode;
                const contenidoTitulo = tablaTitulo[i].textContent.toLowerCase();
                if (contenidoTitulo.includes(textoBuscado)) {
                    filaActual.style.display = ""; //Si encuentra
                } else {
                    filaActual.style.display = "none"; //No encuentra
                }
            }
        });

    })
    .catch(error => { //Excepcion
        console.error("Error al procesar las noticias:", error);
        alert("XML no encontrado");
    });