//Creamos el arreglo con los productos
const vinilos = [
    {nombre: "Vinilo1", precio: 30000},
    {nombre: "Vinilo2", precio: 25000},
    {nombre: "Vinilo3", precio: 28000},
    {nombre: "Vinilo4", precio: 32000},
];

//Dejamos creado el areglo vacio para el carrito de compras.
let carrito = []

let seleccion = prompt("¿Desea comprar algun vinilo? (escriba si o no)")

while(seleccion != "si" && seleccion != "no"){
    alert("Por favor escriba si o no")
    seleccion = prompt("¿Desea comprar algun vinilo? (escriba si o no)")
}

if(seleccion == "si"){
    alert("A continuación se listaran los vinilos disponibles")
    let productos = vinilos.map((vinilos) => vinilos.nombre + " " + "$" + vinilos.precio);
    alert(productos.join(" - "))
}else{
    alert("Gracias por visitarnos");
}

while (seleccion != "no"){
    let producto = prompt("Agregue productos a su carrito");
    let precio = 0;

    if (producto == "Vinilo1" || producto == "Vinilo2" || producto == "Vinilo3" || producto == "Vinilo4"){
        switch (producto){
            case "Vinilo1":
                precio = 30000;
                break;
            case "Vinilo2":
                precio = 25000;
                break;
            case "Vinilo3":
                precio = 28000;
                break;
            case "Vinilo4":
                precio = 32000;
                break;
            default:
                break;
        }

        let cantidad = parseInt(prompt("¿Cuantas unidades desea comprar?"));

        carrito.push({producto, cantidad, precio});
        console.log(carrito);
    } else {
        alert("No existe el producto indicado");
    }

    //se controla para que el loop no sea infinito
    seleccion = prompt("¿Desea agregar otro producto?")

    while (seleccion === "no"){
        alert("Gracias por comprar")
        carrito.forEach((carritoLleno) => {console.log(`Producto: ${carritoLleno.producto}, Cantidad:  ${carritoLleno.cantidad}, Total a Pagar x Producto:  ${carritoLleno.cantidad * carritoLleno.precio}`)});
        break;
    }
}

//Se calcula el total de todo el arreglo con la función reduce
const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
console.log(`El total a pagar de su compra es: ${total}`);