//Iniciamos el evenlistener para poder interactuar con el html de forma dinamica
document.addEventListener('DOMContentLoaded', () => {

    let baseDeDatos = []; //Acá declaramos la variable como arreglo pero solo para utilizar el fetch...

    //ejecutamos la función para obtener los datos desde el archivo json y armar el pool de productos... (aca da el error)
    function cargarBaseDeDatos() {
        fetch("./data.json")
            .then(response => response.json())
            .then(data => {
                baseDeDatos = data;
                armarProductos();
            })
            .catch(error => console.error('Error al cargar la base de datos:', error));
    }

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const Storage = window.localStorage;

//se generan los divs a partir de la base de datos

    function armarProductos() {
        baseDeDatos.forEach((info) => {
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');

            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            
            //nombre
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            
            //imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            
            //precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${divisa}${info.precio}`;
            

            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', agregarCarrito);

            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    function agregarCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        armarCarrito();
        guardarStorage();

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Producto agregado",
            showConfirmButton: false,
            timer: 1500
          });
    }

    function armarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} = ${divisa}${miItem[0].precio}`;
            
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarCarrito);
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });

        //Calculamos el total de lo agregado
        DOMtotal.textContent = calcularTotal();
    }

    function borrarCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });

        armarCarrito();
        //Guardamos los cambios en el storage
        guardarStorage();

        Swal.fire({
            position: "center",
            icon: "error",
            title: "Producto eliminado",
            showConfirmButton: false,
            timer: 1500
          });
    }

    function calcularTotal() {
        // Recorremos el array del carrito
        return carrito.reduce((total, item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    function vaciarCarrito() {
        carrito = [];
        armarCarrito();
        localStorage.clear(); //Se limpia el local storage

        Swal.fire({
            position: "center",
            icon: "error",
            title: "Carrito Vaciado",
            showConfirmButton: false,
            timer: 1500
          });
    }

    function guardarStorage(){
        Storage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoStorage() {
        if (Storage.getItem('carrito') != null) {
            carrito=JSON.parse(Storage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    cargarCarritoStorage();
    cargarBaseDeDatos(); //se comenta porque el fetch da error que no se ha podido identificar...
    armarProductos();
    armarCarrito();
});
