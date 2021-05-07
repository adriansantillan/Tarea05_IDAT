let seleccionCategoria = document.querySelector('#listadoCategoria');
let nombreProducto = document.querySelector('#nombreProducto');
let botonBuscar = document.querySelector('#botonBuscar');
const categoriasAPIUrl = "https://disenoydesarrolloweb.azurewebsites.net/api/Producto/Categorias";
const productosAPIUrl = "https://disenoydesarrolloweb.azurewebsites.net/api/Producto/";

const llenarComboCategorias = (event) => {
    event.preventDefault();
    fetch(categoriasAPIUrl)
    .then(response => response.json())
    .then(data => data.categorias.forEach( data => {
        seleccionCategoria.innerHTML += `<option> ${data} </option>`;
    }));
            
   
}    
   
window.addEventListener('load', llenarComboCategorias);


const buscarProducto = (event) => {
    event.preventDefault ();
    obtenerDatosAPI();
    renderizarTabla();

}

const obtenerDatosAPI = () => {
    
    let categoria = seleccionCategoria.value;
    let producto = nombreProducto.value;
    
    let productoURI= productosAPIUrl + '?categoria=' + categoria + '&nombre=' + producto;
    
    fetch(productoURI)
        .then (respuesta => respuesta.json())
        .then (listaProductos =>
                renderizarTabla(listaProductos)
            );

}

const renderizarTabla = (listaProductos) => {
    let contenidoTabla = document.querySelector('#contenidoTabla');
    let contenidoLimpiarTabla = '';

    listaProductos.forEach (producto => {
        contenidoTabla.innerHTML += '<tr><td>' + producto.codigo + '</td><td>' + producto.nombre + '</td><td>' + producto.categoria + '</td><td>' + producto.precio +'</td><td>' + producto.proveedor + '</td><td><button><img src="Iconos/modificar.png" class="iconoModificar" alt="Icono para modificar"></button></td><td><button><img src="Iconos/eliminar.jpg" class="iconoEliminar" alt="Icono para eliminar"></button></td></tr>'
    });

    contenidoTabla.innerHTML = contenido;

}

botonBuscar.addEventListener('click', buscarProducto);

