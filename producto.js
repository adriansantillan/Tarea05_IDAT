let botonGrabar = document.querySelector('#botonGrabar');
const uriAPI = 'https://disenoydesarrolloapi.azurewebsites.net/api/Producto';

const grabarProductoEnApi =() => {

    let codigo = document.querySelector('#codigoProducto').value;
    let nombre = document.querySelector('#nombre').value;
    let fechaIngreso = document.querySelector('#fecha').value;
    let afectoIGV = document.querySelector('#impuesto').value;
    let precio = document.querySelector('#precio').value;
    let RUCProveedor = document.querySelector('#ruc').value;
    let categoria = document.querySelector('#categoria').value;

                                                                             
    let producto = { "codigo" :  codigo , "nombre" :  nombre , "descripción" :  null , "fechaIngreso" : fechaIngreso , "estado" : 1 , "afectoIGV" : afectoIGV , "precio" : precio , "ruc" : RUCProveedor , "categoria" : categoria};

    fetch(uriAPI,{
        method : 'POST',
        body : JSON.stringify(producto),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(respuesta=> respuesta.text())
    .then(data => alert(data))
}



botonAgregar.addEventListener('click', grabarProductoEnApi);

const obtenerProducto = (event) => {
    event.preventDefault();
    let id = window.localStorage.getItem('id');

    fetch(uriAPI+'/'+id)
    .then(response => response.json())
    .then(data =>{
        codigo.value = data.codigo;
        nombre.value = data.nombre;
        categoria.value = data.categoria;
        RUCProveedor.value = data.ruc;
        precio.value = data.precio;
        fechaIngreso.value = data.fechaIngreso;
        afectoIGV.value = data.afectoIGV;

    });
}

window.addEventListener('load',obtenerProducto);