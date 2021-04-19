let select = document.querySelector('#listadoCategoria');

const obtenerAPI = () => {
    fetch('https://disenoydesarrolloapi.azurewebsites.net/api/Producto/Categorias')
    .then(response => response.json())
    .then(data => console.log(data.categorias[0]));
}    
    
const incluirCategorias = () =>{
    let primeracategoria = obtenerAPI();    
        select.innerHTML= '<option>' + primeracategoria +'</option>';

}

select.addEventListener('click',incluirCategorias);

