//Abrir menu hamburguesa en la version mobile
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
hamburger.addEventListener('click', function(){
    menu.classList.toggle('show');
});

//Pintar percentage scroller
const scroller = document.querySelector('.percentage-scroller');
const maxScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
window.addEventListener('scroll', function(){
    let scrollPercent = 100 * window.scrollY / (maxScrollHeight);
    scroller.style.width = scrollPercent +"%";
});

//Subir arriba en la página
const btn_up = document.getElementById('div-totop');
btn_up.addEventListener('click', () =>{
    setTimeout(() => window.scrollTo({top: 0, behavior: 'smooth'}), 200);  
})


//Validar y enviar el formulario
const form  = document.getElementById('formulario');
const campoNombre = document.getElementById('campoNombre');
const campoEmail = document.getElementById('campoEmail');
const checkbox = document.getElementById('checkbox');
let nombreValido = false;
let emailValido = false;

campoNombre.addEventListener('input', (e)=>{ //Validar campo nombre
    if(e.target.value.length <2 || e.target.value.length>100 || e.target.value.length == 0){
        campoNombre.classList.add('form__input-invalid');
    }else{
        campoNombre.classList.remove('form__input-invalid');
        nombreValido = true;
    }
});
campoEmail.addEventListener('input', (e)=>{ //Validar campo email
    emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if(!emailRegex.test(e.target.value) || e.target.value.length == 0){
        e.target.classList.add('form__input-invalid');
    }else{
        e.target.classList.remove('form__input-invalid');
        emailValido = true;
    }
});
function isChecked(casilla){//Comprobar checkbox 
    if(casilla.checked){
        casilla.style.borderColor = 'black';
        return true;
    }else{
        casilla.style.borderColor = 'var(--secundary)';
        return false;
    }
}
function enviar(data){//Enviar los datos
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({data}),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

function handleSubmit(event){
    event.preventDefault();
    let checked = isChecked(checkbox);
    user = {
       name: nombreValido,
       email: emailValido
    }
    if(nombreValido && emailValido && checked){
        enviar(user);
        form.reset();
        alert('Enviado');
        document.getElementById('submit-btn').disabled = true; 
    }
};
form.addEventListener('submit', handleSubmit);

//Popup 
const newsletter = document.getElementById('newsletter__bg');
function showNewsletter(){//Mostrar ventana
    if(!sessionStorage.getItem('closed_modal') && !localStorage.getItem('closed_modal')){
        newsletter.style.visibility = 'visible';
    }
}
function hideNewsletter(){//Esconder ventana
    sessionStorage.setItem('closed_modal', '1');
    newsletter.style.visibility = 'hidden';
}
window.onscroll = function(){ //Mostrar cuando bajas 25%
    scroll = window.scrollY;
    if(scroll >= (maxScrollHeight*25)/100){
        showNewsletter();
    }
}
setTimeout(showNewsletter,5000); //Mostrar cuando pasan cinco segundos
document.getElementById('btn_close').addEventListener('click', hideNewsletter); // Cerrar con el botón de cierra
newsletter.addEventListener('click', e => {if(e.target === newsletter) hideNewsletter();}); //Cerrar al pinchar fuera
document.addEventListener("keydown", e => {if(e.key === 'Escape') hideNewsletter();}); /// Cerrar al presionar escape

//Validar formulario popup
const formModal = document.getElementById('formulario_modal');
const inputModal = document.querySelector('.info__newsletter__input');
const checkboxModal = document.querySelector('.info__newsletter__checkbox');
let emailModal = false;

inputModal.addEventListener('input', (e)=>{ //Validar campo email
    emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if(!emailRegex.test(e.target.value) || e.target.value.length == 0){
        e.target.classList.add('form__input-invalid');
    }else{
        e.target.classList.remove('form__input-invalid');
        emailValido = true;
    }
});

formModal.addEventListener('submit', function(event){
    event.preventDefault();
    localStorage.setItem('closed_modal', '1');
    let checkModal = isChecked(checkboxModal);
    if(emailModal && checkModal){
        enviar(emailModal);
        document.getElementById('btn_send_modal').disabled = true; 
        document.getElementById('formulario_modal').reset();
        hideNewsletter();
    }
});

//Selector de moneda
let monedas = {};
const select = document.getElementById('select_precio');
select.style.visibility='hidden';
const getMoneda = async () => {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json');
      if(response.ok){
        const jsonResponse = await response.json();
        monedas = {
            euro: jsonResponse.usd.eur,
            libra: jsonResponse.usd.gbp
        }
        select.style.visibility='visible';
        return monedas;
      }
    } catch(error) {
      console.log(error);
    }
};
getMoneda();

const select_precio = document.getElementById('select_precio');
const precios = document.getElementsByClassName('precio');
select_precio.addEventListener('change', function(){ 
let precio = [0, 25, 60];
    for(let i = 0; i<3; i++){
        if(select_precio.value == 'eur'){
            precios[i].innerHTML = Math.floor(precio[i]*monedas.euro)+'&#0128;';
        }else if(select_precio.value == 'gbp'){
            precios[i].innerHTML = '&#163;'+Math.floor(precio[i]*monedas.libra);
        }else if(select_precio.value == 'usd'){
            precios[i].innerHTML = '$'+precio[i];
        
        }
     }
});

//Slider
function slider(id){
    let slider = document.getElementById(id);
    let imagenes = slider.getElementsByTagName('img');
    let botones = slider.getElementsByTagName('button');
    const imagenActual = imagenes[0].getAttribute('src');
    imagenes[0].style.visibility='visible';
    for(let i = 0; i < botones.length; i++){
        botones[i].addEventListener('click', function(){
            limpiarBotones();
            botones[i].classList.add('slide__btn--active');
            let indiceBoton = botones[i].getAttribute('data-index');
            if(indiceBoton === '0'){
                imagenes[0].setAttribute('src', imagenActual);
            }else{
                let src = imagenes[indiceBoton].getAttribute('src');
                imagenes[0].setAttribute('src', src);
            }
        })
    }
    function intervalo(){
        let counter = 0;
        let src = imagenes[counter].getAttribute('src');
        const i = setInterval(function(){
            botones[counter].addEventListener('click', () => clearInterval(i));
            limpiarBotones();
            imagenes[0].setAttribute('src', imagenActual);
            imagenes[counter++];
            src = imagenes[counter].getAttribute('src');
            imagenes[0].setAttribute('src', src);
            botones[counter].classList.add('slide__btn--active');
            if(counter === imagenes.length-1) {
                setTimeout(()=>{ 
                    counter = 0; 
                    imagenes[0].setAttribute('src', imagenActual);
                    botones[counter].classList.add('slide__btn--active');
                }, 2000);
            }
            
        }, 2000);
    }
    function limpiarBotones(){
        for(let j = 0; j < botones.length; j++){
            botones[j].classList.remove('slide__btn--active');
        }
    }
    intervalo();
}

slider('slider'); 



