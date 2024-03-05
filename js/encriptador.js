function diccionarios(){
    return{
    reemplazosEncriptar: {
        e: "enter",
        i: "imes",
        a: "ai",
        o: "ober",
        u: "ufat",
    },
    reemplazosDesencriptar: {
        enter: "e",
        imes:  "i",
        ai:    "a",
        ober:  "o",
        ufat:  "u",
    },
};
}
//limpiar caja
function limpiarEncriptarCaja() {
    document.querySelector(".entrada-texto").value="";
    document.querySelector(".mensajes-salida").classList.add('oculto');
    document.querySelector(".mensajes-salida").classList.remove('ver');
    document.querySelector('.boton-copiar').classList.remove('oculto');

}
function limpiarDesencriptarCaja(){
    document.querySelector('.salida-texto').innerHTML="";


}

function agregarClases(){
    document.querySelector('.salida-texto').innerHTML="";
    document.querySelector('.boton-copiar').classList.add('oculto');
    document.querySelector('.mensajes-salida').classList.add('ver');
}

//accion de encripar
let btnEncriptar = document.querySelector(".encriptar");
    btnEncriptar.addEventListener("click", ()=> {
        let entradaTexto = document.querySelector(".entrada-texto").value;
        if(validar(entradaTexto)){
            let msgError=document.querySelector('.msg-validar');
            msgError.innerHTML="";
            msgError.classList.add('oculto');
            encriptar(entradaTexto);
        }
});
//accion de desencriptar
let btnDesecriptar = document.querySelector(".desencriptar");
btnDesecriptar.addEventListener("click", function () {
    let txtEntrada = document.querySelector(".entrada-texto").value;
    
    if(validar(txtEntrada)){
        let msgError=document.querySelector('.msg-validar');
        msgError.innerHTML="";
        msgError.classList.add('oculto');
        desencriptar(txtEntrada);

    }
});


function procesoCodificar(mensaje,reemplazos){
    for (let clave in reemplazos) {
        mensaje = mensaje.replace(new RegExp(clave, "g"), reemplazos[clave]);
    }
    return mensaje;
}


function encriptar(mensaje) {
    const diccionario = diccionarios();
    const reemplazos = diccionario.reemplazosEncriptar;
    const msgCodificado=procesoCodificar(mensaje,reemplazos);
    document.querySelector(".salida-texto").textContent = msgCodificado;
    limpiarEncriptarCaja();
}

function desencriptar(mensaje) {
    const diccionario = diccionarios();
    const reemplazos = diccionario.reemplazosDesencriptar;
    const msgDesCodificado=procesoCodificar(mensaje,reemplazos);
    document.querySelector(".salida-texto").textContent = msgDesCodificado;
    limpiarEncriptarCaja();
    // agregarClases();
}
//boton copiar

let btnCopy = document
    .querySelector(".boton-copiar")
    .addEventListener("click", () => {
        let textCopy = document.querySelector(".salida-texto").innerHTML;
        copy(textCopy);
        agregarClases();
    });

async function copy(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log(text);
    } catch (err) {
        console.error("Failed to copy: ", err);
    }
}

function validar(texto){
    let textMsgValidar=document.querySelector('.msg-validar');
    
    if(texto === ""){
        textMsgValidar.classList.remove('oculto');
        textMsgValidar.textContent="Por favor, escribe el mensaje a encriptar/desencriptar";
        return false; // Detener la validación si el texto está vacío
    }

    if(!msgValidacion(texto)){
        textMsgValidar.classList.remove('oculto');

        textMsgValidar.textContent="El mensaje no debe tener mayúsculas o acentos";
        return false; // Detener la validación si no pasa la validación de letras minúsculas
    }

    return true; // El texto ha pasado todas las validaciones
}
const msgValidacion = msg => {
    return /^[a-z]+$/.test(msg); // Permitir letras minúsculas sin acentos
}

