
window.addEventListener('load' , () => {

    let form = document.querySelector('.formulario-abmProductos');
    let inputs = document.querySelectorAll('.formulario-abmProductos input') ;

    let name = document.getElementById('name') ;
    let brand = document.getElementById('brand') ;
    let detail = document.getElementById('detail') ;
    let gender = document.getElementById('gender') ;
    let price = document.getElementById('price') ;
    let image = document.querySelector('.image') ;
    let sizes = document.querySelectorAll('.input-checkbox') ;
    let colors = document.querySelectorAll('.input-colors');


    name.addEventListener('blur' , () => {
        let nameSpan = document.querySelector('.name')
        if (name.value == '' || name.value.length < 5) {
            nameSpan.innerHTML =  'El campo nombre debe contener al menos 5 caracteres';
            name.classList.remove('is-ok')
            name.classList.add('alert-err')
        } else {
            nameSpan.innerHTML =  '' ;
            name.classList.remove('alert-err')
            name.classList.add('is-ok')
        }
        
    })
    brand.addEventListener('blur' , () => {
        let brandSpan = document.querySelector('.brand')
        if (brand.value == '') {
            brandSpan.innerHTML =  'El campo marca no puede estar vacio' ;
            brand.classList.remove('is-ok');
            brand.classList.add('alert-err');
        } else {
            brandSpan.innerHTML =  '' ;
            brand.classList.remove('alert-err');
            brand.classList.add('is-ok')
        }
        
    })
    detail.addEventListener('blur' , () => {
        let detailSpan = document.querySelector('.detail')
        if (detail.value == '' || detail.value.length < 20) {
            detailSpan.innerHTML =  'El campo descripcion debe contener al menos 20 caracteres';
            brand.classList.remove('is-ok');
            detail.classList.add('alert-err');
        } else {
            detailSpan.innerHTML =  '';
            brand.classList.remove('alert-err');
            detail.classList.add('is-ok');
        }
        
    })
    gender.addEventListener('blur' , () => {
        let genderSpan = document.querySelector('.gender')
        if (gender.value == '') {
            genderSpan.innerHTML =  'El campo genero no puede estar vacio';
            brand.classList.remove('is-ok');
            gender.classList.add('alert-err');
        } else {
            genderSpan.innerHTML =  '';
            brand.classList.remove('alert-err');
            gender.classList.add('is-ok');
        }
        
    })
    
    price.addEventListener('blur' , () => {
        let priceSpan = document.querySelector('.price')
        if (price.value == '') {
            priceSpan.innerHTML =  'El campo precio no puede estar vacio';
            brand.classList.remove('is-ok');
            price.classList.add('alert-err')
        } else {
            priceSpan.innerHTML =  '';
            brand.classList.remove('alert-err');
            price.classList.add('is-ok');
        }
        
    })
    let errSize = [] ;
    sizes.forEach(oneSize => {
        oneSize.addEventListener('blur' , () => {
            let sizeSpan = document.querySelector('.size')

            if (oneSize.checked == false ) {
                errSize.push('error')
                sizeSpan.innerHTML =  'Debe seleccionar al menos un talle' ;

            } else if (oneSize.checked == true ) {
                sizeSpan.innerHTML =  '' ;
                errSize = []
            }
        })

    })
    let errColor = [] ;
    colors.forEach(oneColor => {
        oneColor.addEventListener('blur' , () => {
            let colorSpan = document.querySelector('.color')

            if (oneColor.checked == false ) {
                errColor.push('error')
                colorSpan.innerHTML =  'Debe seleccionar al menos un color' ;

            } else if (oneColor.checked == true ) {
                colorSpan.innerHTML =  '' ;
                errColor = []
            }
        })

    })

    
    image.addEventListener('blur' , () => {
        let imageValue = image.value ;
        let imageExt = imageValue.slice( -3 , (imageValue.length) );
        let imageSpan = document.querySelector('span.image') ;
        
        if (imageExt != 'jpg' && imageExt != 'jpeg' && imageExt != 'png' && imageExt != 'gif' ) {
            imageSpan.innerHTML = 'La imagen debe ser formato jpg, jpeg, png o gif' ;
            // image.classList.add('alert-err')
        } else {
            // image.classList.add('is-ok')
            imageSpan.innerHTML = '' ;
        }
    })

    // inputs.forEach(input => {
    //     input.addEventListener('blur' , () => {
    //         if(input.value == ""){
    //             console.log("elemento", input.nextElementSibling)
    //             // input.nextElementSibling.style.color="red";
    //             // input.nextElementSibling.style.fontSize= "12px";
    //             input.classList.add('error-input');                            
    //             input.nextElementSibling.innerHTML = "El campo esta vacio.";

    //         }else{
    //             input.classList.remove('error-input');
    //             input.nextElementSibling.innerHTML = "";
    //         }
    //     })
    // })
    

    form.addEventListener('submit' , (e) => {
        let errores = [] ;

        inputs.forEach(input => {
            if (input.value == "" ) {
                errores.push('error') ;
            }
        })

        if (errores.length > 0) {
            e.preventDefault() ;
        } else {
            console.log('formulario enviado correctamente');
        }
    })

})