

let talles = document.querySelectorAll('.listaTalles li span ') ;
let listas = document.querySelectorAll('.listaTalles li') ;
let agregarCarrito = document.querySelector('.botonCompra') ;

console.log(agregarCarrito);

talles.forEach( talle => {
    talle.addEventListener( 'click' , (e) => {
        
        talle.classList.toggle ('selectedLi') 
        console.log('click');
    } )
})
listas.forEach( lista => {
    lista.addEventListener( 'click' , (e) => {
        
        lista.classList.toggle ('selectedLi') 
    } )
})