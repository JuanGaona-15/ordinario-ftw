//No uso el metodo de cargar antes, debe cargar de inmediato
let tablaPlataformas = document.getElementsByClassName("plataformas");
let tablaTitulo = document.getElementsByClassName("titulo-plataforma");
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
        for (let i = 0; i < 5; i++) {
            const plataforma = listaPlataformas[i];
            const titulo = plataforma.getElementsByTagName("titulo")[0].textContent;
            const informacion = plataforma.getElementsByTagName("informacion")[0].textContent;
            tablaTitulo[i].textContent = titulo;
            tablaInformacion[i].innerHTML = `<p>${informacion}</p>`;
        }
    })
    .catch(error => { //Excepcion
        console.error("Error al procesar las noticias:", error);
        alert("XML no encontrado");
    });