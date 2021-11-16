window.addEventListener('load' , () => {
    let form = document.querySelector('.formulario-abmProductos') ;
    let inputs = document.querySelectorAll('.formulario-abmProductos input')
    let name = document.getElementById('name') ;
    let brand = document.querySelector('#brand') ;
    let detail = document.getElementById('detail') ;
    let gender = document.getElementById('gender') ;
    let price = document.getElementById('price') ;
    let sizes = document.querySelectorAll('.input-sizes') ;
    let colors = document.querySelectorAll('.input-colors');
    let image = document.querySelector('.image') ;

    name.addEventListener('blur' , () => {
        let nameSpan = document.querySelector('.name')
        if (name.value == '' || name.value.length < 5) {
            nameSpan.innerHTML =  'El campo nombre debe contener al menos 5 caracteres' ;
            name.classList.add('alert-err')
        } else {
            nameSpan.innerHTML =  '' ;
            name.classList.add('is-ok')
        }
        
    })
    brand.addEventListener('blur' , () => {
        let brandSpan = document.querySelector('.brand')
        if (brand.value == '') {
            brandSpan.innerHTML =  'El campo marca no puede estar vacio' ;
            brand.classList.add('alert-err')
        } else {
            brandSpan.innerHTML =  '' ;
            brand.classList.add('is-ok')
        }
        
    })
    detail.addEventListener('blur' , () => {
        let detailSpan = document.querySelector('.detail')
        if (detail.value == '' || detail.value.length < 20) {
            detailSpan.innerHTML =  'El campo descripcion debe contener al menos 20 caracteres' ;
            detail.classList.add('alert-err')
        } else {
            detailSpan.innerHTML =  '' ;
            detail.classList.add('is-ok')
        }
        
    })
    gender.addEventListener('blur' , () => {
        let genderSpan = document.querySelector('.gender')
        if (gender.value == '') {
            genderSpan.innerHTML =  'El campo genero no puede estar vacio' ;
            gender.classList.add('alert-err')
        } else {
            genderSpan.innerHTML =  '' ;
            gender.classList.add('is-ok')
        }
        
    })
    price.addEventListener('blur' , () => {
        let priceSpan = document.querySelector('.price')
        if (price.value == '') {
            priceSpan.innerHTML =  'El campo precio no puede estar vacio' ;
            price.classList.add('alert-err')
        } else {
            priceSpan.innerHTML =  '' ;
            price.classList.add('is-ok')
        }
        
    })
    
    let errSize = [] ;
    sizes.forEach(oneSize => {
        oneSize.addEventListener('blur' , () => {
            console.log(oneSize.value);
            let sizeSpan = document.querySelector('.size')

            if (oneSize.checked == false ) {
                errSize.push('error')
                sizeSpan.innerHTML =  'Debe seleccionar al menos un talle' ;

            } else {
                sizeSpan.innerHTML =  '' ;
                errSize = []
            }
        })
        console.log(oneSize.value);
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
        
    
    
    image.addEventListener('change' , () => {
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
    
    form.addEventListener('submit' , (e) => {
        let errors = [] 
        inputs.forEach(input => {
            if (input.value == ""){
                errors.push('error') ;
            }
        })
        
        if (errors.length > 0) {
            e.preventDefault()
            console.log(errors);
        }else {
            console.log('formulario enviado con exito');
        }
    })
    
})
// errores.push('El campo nombre debe contener al menos 5 caracteres' )