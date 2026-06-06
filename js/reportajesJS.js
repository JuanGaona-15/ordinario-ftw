//No uso el metodo de cargar antes, debe cargar de inmediato
let tablaReportajes = document.getElementsByClassName("reportajes");
let tablaTitulares = document.getElementsByClassName("titulo-noticia");
let tablaInformacion = document.getElementsByClassName("contenido-noticia");

// fetch (conseguir) el xml
fetch("xml/reportajes.xml")
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
        const listaNoticias = xmlDoc.getElementsByTagName("noticia"); // Lista de noticias
        // Recorrer noticias
        for (let i = 0; i < 4; i++) {
            const noticia = listaNoticias[i];
            const titulo = noticia.getElementsByTagName("titulo")[0].textContent;
            const informacion = noticia.getElementsByTagName("informacion")[0].textContent;
            tablaTitulares[i].textContent = titulo;
            tablaInformacion[i].innerHTML = `<p>${informacion}</p>`;
        }
    })
    .catch(error => { //Excepcion
        console.error("Error al procesar las noticias:", error);
        alert("XML no encontrado");
    });