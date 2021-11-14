window.addEventListener('load' , function() {

//CAPTURO FORMULARIO E INPUTS PARA USAR AL FINAL
let form = document.querySelector('.register');
let inputs = document.querySelectorAll('.register input') ;


// CAPTURO INPUTS DEL FORMULARIO
let usuario = document.getElementById('usuario');
let password = document.getElementById('password');
let confirmacionPassword = document.getElementById('rep_password');
let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let email = document.getElementById('email');
//let avatar = document.getElementById('avatar');
let image = document.querySelector('avatar') ;


// VALIDACIONES DE DATOS 

usuario.addEventListener('blur', function(){

    console.log(usuario);
    usuarioSpan = document.querySelector('.usuarioErr');
    
    if(usuario.value == '')
    {
        usuarioSpan.innerHTML = "Por favor ingrese el usuario."
        usuario.classList.remove('is-ok');
        usuario.classList.add('alert-err');
    }
    else
    {
        usuarioSpan.innerHTML =  '' ;
        usuario.classList.remove('alert-err');
        usuario.classList.add('is-ok');
    }

})

nombre.addEventListener('blur', function(){

    nombreSpan = document.querySelector('.nombreErr');
    
    if(nombre.value.length <= 2)
    {
        nombreSpan.innerHTML = "El nombre debe tener al menos 2 caracteres."
        nombre.classList.remove('is-ok');
        nombre.classList.add('alert-err');
        
    }
    else
    {
        nombreSpan.innerHTML =  '' ;
        nombre.classList.remove('alert-err');
        nombre.classList.add('is-ok');
    }

})

apellido.addEventListener('blur', function(){

    apellidoSpan = document.querySelector('.apellidoErr');
    
    if(apellido.value.length <= 2)
    {
        apellidoSpan.innerHTML = "El apellido debe tener al menos 2 caracteres."
        apellido.classList.remove('is-ok');
        apellido.classList.add('alert-err');
        
    }
    else
    {
       apellidoSpan.innerHTML =  '' ;
        apellido.classList.remove('alert-err');
        apellido.classList.add('is-ok');
    }

})

password.addEventListener('blur', function(){

    passwordSpan = document.querySelector('.passwordErr');
    
    if(password.value.length <= 8)
    {
        passwordSpan.innerHTML = "La contraseña debe tener al menos 8 caracteres."
        password.classList.remove('is-ok');
        password.classList.add('alert-err');
    }
    else
    {
        passwordSpan.innerHTML =  '' ;
        password.classList.remove('alert-err');
        password.classList.add('is-ok');
    }
})

confirmacionPassword.addEventListener('blur', function(){

    confirmacionPasswordSpan = document.querySelector('.confirmacionPasswordErr');
    console.log(confirmacionPassword.value)
    console.log(password.value)
    if(confirmacionPassword.value !== password.value)
    {
        confirmacionPasswordSpan.innerHTML = "Las contraseñas no coinciden."
        confirmacionPassword.classList.remove('is-ok');
        confirmacionPassword.classList.add('alert-err');
    }
    else
    {
        confirmacionPasswordSpan.innerHTML =  '' ;
        confirmacionPassword.classList.remove('alert-err');
        confirmacionPassword.classList.add('is-ok');
    }

})

email.addEventListener('blur', function(){

    emailSpan = document.querySelector('.emailErr');
    
    // USO EXPRESIÓN REGULAR PARA VALIDAR EL MAIL.
    let expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    
        if(expReg.exec(email.value))
    {
        emailSpan.innerHTML =  '' ;
        email.classList.remove('alert-err');
        email.classList.add('is-ok');
    }
    else
    {
        emailSpan.innerHTML = "El e-mail ingresado no es valido."
        email.classList.remove('is-ok');
        email.classList.add('alert-err');
    }
})

image.addEventListener('blur' , () => {
    let imageValue = image.value ;
    let imageExt = imageValue.slice( -3 , (imageValue.length) );
    let imageSpan = document.querySelector('.avatarErr') ;
    
    if (imageExt != 'jpg' && imageExt != 'jpeg' && imageExt != 'png' && imageExt != 'gif' ) {
        imageSpan.innerHTML = 'La imagen debe ser formato jpg, jpeg, png o gif';
        
    } else {
        imageSpan.innerHTML = '' ;
    }
})



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