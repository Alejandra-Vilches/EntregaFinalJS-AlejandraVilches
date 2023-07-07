const productos = [
    { producto: "01", categoria: "colors", precio: 11900 },
    { producto: "02", categoria: "fluors", precio: 12900 },
    { producto: "03", categoria: "diamonds", precio: 14900 }
  ];




fetch("productos.json")
  .then(response => response.json())
  .then(data => {
    let productos = data; // El resultado de response.json() es un objeto o un array
    
    // Utiliza el array de productos para realizar las operaciones necesarias
    console.log(productos);
  })
  


  
  document.addEventListener("DOMContentLoaded", () => {
    let promoForm = document.getElementById("promoForm");
    let calcularBtn = document.getElementById("calcularBtn");
    let totalAPagar = document.getElementById("totalAPagar");
    
    promoForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    
    calcularBtn.addEventListener("click", () => {
        Toastify({
          text: "Datos ingresados. Calculando.",
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