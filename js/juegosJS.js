document.addEventListener("DOMContentLoaded", () => {  //Con esta linea se carga todo el documento antes de iniciar el script
    
    //Variables y constantes
    const botonCargar = document.getElementById("cargarjuegos");
    const barraBusqueda = document.getElementById("buscador");
    const botonFiltro = document.getElementById("filtro-genero");
    const tablaContenido = document.getElementById("tabla-contenido");

    //CARGAR DATOS
    function cargarTabla(){
    botonCargar.addEventListener("click", () => {
        // fetch (conseguir) el xml
        fetch("xml/juegos.xml")
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
                const listaJuegos = xmlDoc.getElementsByTagName("juego"); // Lista de juegos
                tablaContenido.innerHTML = ""; // Limpiar tabla

                // Recorrer juegos
                for (let i = 0; i < listaJuegos.length; i++) {
                    const juego = listaJuegos[i];
                    const id = juego.getAttribute("id");
                    // Extraer los datos
                    const titulo = juego.getElementsByTagName("titulo")[0].textContent;
                    const anio = juego.getElementsByTagName("anio")[0].textContent;
                    const genero = juego.getElementsByTagName("genero")[0].textContent;
                    const dev = juego.getElementsByTagName("dev")[0].textContent;
                    const descripcion = juego.getElementsByTagName("descripcion")[0].textContent;
                    
                    // Llenar tabla
                    const fila = document.createElement("tr");
                    fila.setAttribute("data-id", id); //para buscar y filtrar despues                    
                    fila.innerHTML = `
                        <td>${titulo}</td>
                        <td>${anio}</td>
                        <td>${genero}</td>
                        <td>${dev}</td>
                        <td>${descripcion}</td>
                    `;
                    tablaContenido.appendChild(fila);
                }

                // Activar barras de filtrado
                document.getElementById("buscador").disabled = false;
                document.getElementById("filtro-genero").disabled = false;
            })
            .catch(error => { //Excepcion
                console.error("Error al procesar el catálogo:", error);
                alert("XML no encontrado");
            });
    });
    }

    //FILTRADO Y BUSQUEDA
    function filtrarTabla() {
        const textoBusqueda = barraBusqueda.value.toLowerCase();
        const generoSeleccionado = botonFiltro.value;
        
        // Obtener las filas generadas y recorremos para filtrar
        const filas = tablaContenido.getElementsByTagName("tr");
        for (let i = 0; i < filas.length; i++) {
            const fila = filas[i];
            const celdas = fila.getElementsByTagName("td");

            if (celdas.length > 0) {
                // Recuperamos los textos 
                const titulo = celdas[0].textContent.toLowerCase();
                const genero = celdas[2].textContent; // Género 
                const desarrollador = celdas[3].textContent.toLowerCase();
                const id = fila.getAttribute("data-id").toLowerCase(); // Usamos el id de la carga
                // Evaluamos los criterios para filtrar
                const coincideTexto = titulo.includes(textoBusqueda) ||desarrollador.includes(textoBusqueda) || id.includes(textoBusqueda);                                     
                const coincideGenero = (generoSeleccionado === "todos") || (genero === generoSeleccionado);
                // Solo si cumple las condiciones se muestra
                if (coincideTexto && coincideGenero) {
                    fila.style.display = "";
                } else {
                    fila.style.display = "none";
                }
            }
        }
    }

    // Listeners de los botones 
    barraBusqueda.addEventListener("input", filtrarTabla);
    botonFiltro.addEventListener("change", filtrarTabla);
    botonCargar.addEventListener("click", cargarTabla)
});