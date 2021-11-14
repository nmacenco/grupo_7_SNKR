window.addEventListener('load' , function() {

    //CAPTURO INPUTS
    let mail = document.getElementById('mail');
    let password = document.getElementById('password');


    //VALIDACIONES

    mail.addEventListener('blur', function(){
        mailSpan = document.querySelector('.mailLoginErr');
        if(mail.value == '')
    {
        mailSpan.innerHTML = "Por favor ingrese su e-mail."
        mail.classList.add('alert-err');
        
    }
    else
    {
        mailSpan.innerHTML =  '' ;
        mail.classList.remove('alert-err');
    }
    })

    password.addEventListener('blur', function(){

        passwordSpan = document.querySelector('.passwordLoginErr');
        
        if(password.value == '')
        {
            passwordSpan.innerHTML = "Por favor ingrese su contraseña"
            password.classList.add('alert-err');
        }
        else
        {
            passwordSpan.innerHTML =  '' ;
            password.classList.remove('alert-err');
        }
    })
    

})