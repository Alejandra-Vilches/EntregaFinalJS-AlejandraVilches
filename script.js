

/* Había usado "productos.json" como API y lo había puesto dentro de then data para que se ejecutarán después de leer el json y usara desde ahí los valores de los productos, pero me apreció este mensaje: 

El acceso para buscar en 'file:///Users/avilchesv/Documents/JavaScript/00.Entregas/05.entrega-final/productos.json' desde el origen 'null' ha sido bloqueado por la política CORS: solo se admiten solicitudes de origen cruzado para esquemas de protocolo: http, datos, aplicación aislada, extensión de cromo, cromo, https, cromo no confiable.

Así que tuve que poner nuevamente el array acá y usar la API del clima.

*/

const productos = [
    { producto: "01", categoria: "colors", precio: 11900 },
    { producto: "02", categoria: "fluors", precio: 12900 },
    { producto: "03", categoria: "diamonds", precio: 14900 }
];

document.addEventListener("DOMContentLoaded", () => {
    let promoForm = document.getElementById("promoForm");
    let calcularBtn = document.getElementById("calcularBtn");
    let totalAPagar = document.getElementById("totalAPagar");
    
    promoForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });


calcularBtn.addEventListener("click", () => {
        Toastify({
          text: "Datos ingresados.",
          duration: 2000,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "gray",
            color: "white"
          }
        }).showToast();
        
        let codigoCliente = document.getElementById("codigoCliente").value;
        let categoriaUnas = document.getElementById("categoriaUnas").value;
        let cantidadUnas = parseInt(document.getElementById("cantidadUnas").value);
        
        let precioUnas = productos.find((p) => p.categoria === categoriaUnas)?.precio || 0;
        
        let descuento = 0;
        if (cantidadUnas >= 9) {
          descuento = 0.2;
        } else if (cantidadUnas >= 6) {
          descuento = 0.15;
        } else if (cantidadUnas >= 3) {
          descuento = 0.1;
        }
        
        let totalPagar = (precioUnas * cantidadUnas * (1 - descuento));
        
        totalAPagar.textContent = `Total a pagar: $${totalPagar}`;
        totalAPagar.style.display = "block";


      // Guardar valores en localStorage
      localStorage.setItem("codigoCliente", codigoCliente);
      localStorage.setItem("categoriaUnas", categoriaUnas);
      localStorage.setItem("cantidadUnas", cantidadUnas);
    });
    
    // Recuperar valores de localStorage
    document.getElementById("codigoCliente").value = localStorage.getItem("codigoCliente");
    document.getElementById("categoriaUnas").value = localStorage.getItem("categoriaUnas");
    document.getElementById("cantidadUnas").value = localStorage.getItem("cantidadUnas");
 });


function mostrar_tiempo(posicion){

    let lat = posicion.coords.latitude;
    let long = posicion.coords.longitude;
    let key= "672c4f180fec9c4ec673a3814e50a138";

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data =>{
                    document.body.innerHTML = `<p>Lugar: ${data.name}</p>
                                                <p>Tiempo: ${data.main.temp}</p>
                                                <p>Clima: ${data.weather[0].description}</p>`
        })
}


navigator.geolocation.getCurrentPosition(mostrar_tiempo);

