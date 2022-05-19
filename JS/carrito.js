const productos = [];

productos.push(new Producto(1, "Babucha Milan", 822, "./imagenes/oferta1.JPG"));
productos.push(new Producto(2, "Musculosa Elhom", 352, "./imagenes/oferta2.jpg"));
productos.push(new Producto(3, "Mini Cruzada Lino", 763, "./imagenes/oferta3.JPG"));
productos.push(new Producto(4,"Musculosa Andy", 470, "./imagenes/oferta4.JPG"));
productos.push(new Producto(5, "Musculosa Lino Andy", 470, "./imagenes/oferta5.JPG"));
productos.push(new Producto(6, "Palazzo Chicago", 1057,"./imagenes/oferta6.JPG"));
productos.push(new Producto(7, "Vestido Clasico Alex", 940,"./imagenes/oferta7.JPG"));
productos.push(new Producto(8, "Top Tiras Madonna", 412,"./imagenes/oferta8.JPG"));
productos.push(new Producto(9, "Vestido Largo Capas", 940,"./imagenes/oferta9.JPG"));
productos.push(new Producto(10, "Top Atar Popis", 705,"./imagenes/oferta10.JPG"));
productos.push(new Producto(11, "Vestido Volado Bretel", 940,"./imagenes/oferta11.JPG"));
productos.push(new Producto(12, "Calza Microfibra Cata", 705,"./imagenes/oferta12.JPG"));

let carrito = [];

let items = document.querySelector("#items");
let carritoDOM = document.querySelector("#carrito");
let total = document.querySelector("#total");
let btnVaciar = document.querySelector("#botonVaciar");
let miLocalStorage = window.localStorage;
const claveLocalStorage = "compraCarrito";


function productosALaVenta(){
    fetch('./data/productos.json')
    .then(response => response.json())
    .then(data =>{
        data.forEach((dato) =>{
            let nodo = document.createElement("div");

            let nodoCuerpo = document.createElement("div");
            nodoCuerpo.classList.add("cuerpoProductos")

            let nodoTitulo = document.createElement("h5");
            nodoTitulo.textContent = dato.nombre;
            nodoTitulo.classList.add("tituloProducto");
            
            let nodoImagen = document.createElement("img");
            nodoImagen.setAttribute("src", dato.imagen);
            nodoImagen.classList.add("fotos");

            let nodoPrecio = document.createElement("p");
            nodoPrecio.textContent = `$${dato.precio}`;
            nodoPrecio.classList.add("precio")

            let btn = document.createElement("button");
            btn.textContent = "Comprar";
            btn.classList.add("btnComprar")
            btn.setAttribute("id", dato.id);
            btn.addEventListener('click', agregarProductoAlCarrito);
            
            
            items.appendChild(nodo);
            nodo.appendChild(nodoCuerpo);
            nodoCuerpo.appendChild(nodoTitulo);
            nodoCuerpo.appendChild(nodoImagen);
            nodoCuerpo.appendChild(nodoPrecio);
            nodoCuerpo.appendChild(btn);
        });
    });
}

function agregarProductoAlCarrito(evento){
    carrito.push(evento.target.getAttribute("id"));
    actualizarCarrito();
    guardarCarritoEnLS()
    Swal.fire({
        title: '¡Producto añadido al carrito!',
        icon: 'success',
        width: '400px',
        timer: 1000,
        allowEscapeKey: true,
        confirmButtonColor: '#3085d6',
    });
}

function actualizarCarrito(){
    carritoDOM.textContent = "";

    let carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {

        let miItem = productos.filter((itemProductos) => {
            return itemProductos.id === parseInt(item);
        });
        
        let cantUnidades = carrito.reduce((total, itemId) => {
        return itemId === item ? total+= 1 :total;
        },0);
        
        let lista = document.createElement("li");
        lista.textContent = `${cantUnidades} x ${miItem[0].nombre} - $${miItem[0].precio}`;

        let btnBorrar = document.createElement("button");
        btnBorrar.textContent = "X";
        btnBorrar.classList.add("btnX");
        btnBorrar.dataset.item = item;
        btnBorrar.addEventListener("click", borrarItem);

        lista.appendChild(btnBorrar);
        carritoDOM.appendChild(lista);

    });
    total.textContent = calcularTotal();
}

function borrarItem(evento){
    let id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) =>{
        return carritoId !== id;
    });

    actualizarCarrito();
    guardarCarritoEnLS();
}

function calcularTotal(){
    return carrito.reduce((total, item) =>{
        let miItem = productos.filter ((itemProductos) =>{
            return itemProductos.id === parseInt(item);
        });
        
        return total + miItem[0].precio;
    },0);
}

function vaciarCarrito(){
    carrito = [];
    actualizarCarrito();
    localStorage.clear();
    
    Swal.fire({
    title: '¡Carrito vaciado!',
    icon: 'success',
    width: '400px',
    timer: 1000,
    allowEscapeKey: true,
    confirmButtonColor: '#3085d6',
    });
}

function guardarCarritoEnLS () {
    miLocalStorage.setItem(claveLocalStorage, JSON.stringify(carrito));
}

function cargarCarritoDeLS () {
    if (miLocalStorage.getItem(claveLocalStorage) !== null) {
        carrito = JSON.parse(miLocalStorage.getItem(claveLocalStorage));
    }
}

btnVaciar.addEventListener("click", vaciarCarrito);

cargarCarritoDeLS();
productosALaVenta();
actualizarCarrito();