class Producto {
    constructor(id, nombre, precio, imagen){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = precio * 1.21;
        this.imagen = imagen;
    }
}