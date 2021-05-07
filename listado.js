let seleccionCategoria = document.querySelector('#listadoCategoria');
let nombreProducto = document.querySelector('#nombreProducto');
let botonBuscar = document.querySelector('#botonBuscar');
const categoriasAPIUrl = "https://disenoydesarrolloweb.azurewebsites.net/api/Producto/Categorias";
const productosAPIUrl = "https://disenoydesarrolloweb.azurewebsites.net/api/Producto/";
let body = document.querySelector("body");

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
    let categoria = seleccionCategoria.value;
    let producto = nombreProducto.value;

    event.preventDefault ();
    guardarDatosLocalStorage(categoria, producto);
    
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
    let contenido = '';
    contenidoTabla.innerHTML = '';

    listaProductos.forEach ((producto, index) => {
        contenido += `<tr>
        <td> ${producto.codigo} </td>
        <td> ${producto.nombre} </td>
        <td> ${producto.categoria} </td>
        <td> ${producto.precio} </td>
        <td> ${producto.proveedor} </td>
        <td><button class='boton-modificar' value=${producto.id}><img src="Iconos/modificar.png" class="iconoModificar" alt="Icono para modificar"></button></td>
        <td><button class='boton-eliminar' value=${producto.id}><img src="Iconos/eliminar.jpg" class="iconoEliminar" alt="Icono para eliminar"></button></td>
        </tr>`
    });
    
    contenidoTabla.innerHTML = contenido;

}

botonBuscar.addEventListener('click', buscarProducto);

const guardarDatosLocalStorage =(categoria, producto) =>{
    window.localStorage.setItem('categoria', categoria);
    window.localStorage.setItem('producto', producto);

}

const leerDatosLocalStorage =() => {
    seleccionCategoria.value = window.localStorage.getItem('categoria');
    nombreProducto.value = window.localStorage.getItem('producto');
    
}

const eliminarProducto =(event) =>{
    
    event.preventDefault();
    if (event.target.className == 'boton-eliminar'){

        let confirmado = window.confirm("¿Está seguro que desea eliminar este producto?");
        
        if(confirmado){

            fetch(`${productosAPIUrl}/${event.target.value}`,
            {
                method : 'DELETE'
            })
            .then(response => response.json())
            .then(data =>{
                alert(data.message);
                buscarProducto(event);
            })
            .catch(error =>{
                alert("Error al eliminar");
            })
            }
        else{
            alert("Producto no eliminado");
        }
    }
}

const modificarProducto = (event) =>{
    
    event.preventDefault();

    if (event.target.className == 'boton-modificar') 

        window.location.href = "producto.html";
    
}

window.addEventListener('load', leerDatosLocalStorage);
body.addEventListener('click', eliminarProducto);
body.addEventListener('click', modificarProducto);
