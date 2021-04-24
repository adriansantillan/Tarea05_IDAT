let seleccionCategoria = document.querySelector('#listadoCategoria');
let nombreProducto = document.querySelector('#nombreProducto');
let botonBuscar = document.querySelector('#botonBuscar');

const llenarComboBox = (event) => {
    event.preventDefault();
    fetch('https://disenoydesarrolloapi.azurewebsites.net/api/Producto/Categorias')
    .then(response => response.json())
    .then(data => data.categorias.forEach( data => {
        seleccionCategoria.innerHTML += `<option> ${data} </option>`;
    }));
            
   
}    
   
window.addEventListener('load', llenarComboBox);


const buscarProducto = (event) => {
    event.preventDefault ();
    obtenerDatosAPI();
    renderizarTabla();

}

const obtenerDatosAPI = () => {
    const uri = 'https://disenoydesarrolloapi.azurewebsites.net/api/Producto';
    let categoria = seleccionCategoria.value;
    let producto = nombreProducto.value;
    
    let productoURI= uri + '?categoria=' + categoria + '&nombre=' + producto;
    
    fetch(productoURI)
        .then (respuesta => respuesta.json())
        .then (data =>
                renderizarTabla(data)
            );

}

const renderizarTabla = (data) => {
    let contenidoTabla = document.querySelector('#contenidoTabla');

    data.forEach (producto => {
        contenidoTabla.innerHTML += '<tr><td>' + producto.codigo + '</td><td>' + producto.nombre + '</td><td>' + producto.categoria + '</td><td>' + producto.precio +'</td><td>' + producto.proveedor + '</td><td><button><img src="Iconos/modificar.png" width=20px height=20px></button></td><td><button><img src="Iconos/eliminar.jpg" width=20px height=20px></button></td></tr>'
    });

    

}

botonBuscar.addEventListener('click', buscarProducto);

