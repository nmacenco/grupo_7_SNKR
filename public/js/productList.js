//PAGINADO
window.onload = function (){
    
let numeroDePagina = document.querySelector('.numeroDePagina');
let ordernarPor = document.querySelector('.ordernarPor');

//console.log(numeroDePagina);

numeroDePagina.addEventListener('change', function(){
    numeroDePagina.submit()
})

ordernarPor.addEventListener('change', function(){
    ordernarPor.submit()
})

}