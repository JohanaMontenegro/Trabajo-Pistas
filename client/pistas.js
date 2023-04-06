let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", agregar);
let btnDuracion = document.querySelector("#btnDuracion");
btnDuracion.addEventListener("click", duracion);

let pistas = [];
function agregar() {
    console.log("Función Agregar");
    let identificador = parseInt(document.querySelector('#identificador').value);
    let titulo = document.querySelector('#titulo').value;
    let duracion = parseInt(document.querySelector('#duracion').value);
    let interprete = document.querySelector('#interprete').value;
    let renglon = {
        "identificador": identificador,
        "titulo": titulo,
        "duracion": duracion,
        "interprete": interprete,
    }
    pistas.push(renglon);
    agregarSRV(renglon);
    mostrarPistas();

}

async function load() {
    let container = document.querySelector("#contenedor");
    container.innerHTML = "<h1>Loading...</h1>";
    try {
        let response = await fetch('/pista');
        console.log(response)
        if (response.ok) {
            let pistasJson = await response.json();
            pistas = pistasJson;
            console.log(pistas)
            await new Promise((resolve, reject) => setTimeout(resolve, 3000));
            container.innerHTML = "";
            mostrarPistas();
        } else {
            container.innerHTML = "<h1>404</h1>"

        }

    } catch (response) {
        container.innerHTML = "<h1>500 connection error</h1>"
        console.log(response)
    }
}
load();

function duracion() {
    console.log("Función Duración");
    let total = 0;
    for (let i = 0; i < pistas.length; i++) {
        total += pistas[i].duracion;
    }
    let max = pistas[0].duracion;
    let min = pistas[0].duracion;
    for (let r of pistas) {
        if (max < r.duracion)
            max = r.duracion;

        if (min > r.duracion)
            min = r.duracion;
    }
    document.querySelector("#total").innerHTML = `
    <p>Duración Total: ${total}</p>
    <p>Duración Máxima: ${max}</p>
    <p>Duración Minima: ${min}</p>
    `;
}

async function agregarSRV(datos) {
    let respuesta = await fetch('./pista', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    return (await respuesta.text() == "ok");
}

async function btnBorrarClick() {
    let id = this.getAttribute("identificador");
    let respuesta = await fetch(`/pista/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    return (await respuesta.text() == "ok")
}
load();

async function btnActualizarClick() {
    console.log("hola");
    let id = this.getAttribute("ident");
    console.log(document.getElementById(`ident${id}`));
    console.log(id);
    let renglon = {
        identificador: document.getElementById(`ident${id}`).value,
        titulo: document.getElementById(`titulo${id}`).value,
        duracion: document.getElementById(`duracion${id}`).value,
        interprete: document.getElementById(`interprete${id}`).value,
    };
    let respuesta = await fetch(`/pista/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(renglon),
    }); return (await respuesta.text() == "ok")
} load();

function mostrarPistas() {
    let html = '';
    for (let r of pistas) {
        console.log(r.titulo, r.duracion)
        html += `
        <tr>
        <td><input type="text" value="${r.identificador}" id="ident${r.identificador}"></td>
        <td><input type="text" value="${r.titulo}" id="titulo${r.identificador}"></td>
        <td><input type="text" value="${r.duracion}" id="duracion${r.identificador}"></td>
        <td><input type="text" value="${r.interprete}" id="interprete${r.identificador}"></td>
        <td><button class="btnUpdPista" ident="${r.identificador}">Actualizar</button></td>
        <td><button class="btnDelPista" identificador="${r.identificador}">Borrar</button></td>
        </tr>
        `;
    }
    document.querySelector('#tblPistas').innerHTML = html;
    let botonBorrar = document.querySelectorAll('.btnDelPista');
    botonBorrar.forEach((e) => {
        e.addEventListener("click", btnBorrarClick);
    });
    let botonActualizar = document.querySelectorAll('.btnUpdPista');
    botonActualizar.forEach((e) => {
        e.addEventListener("click", btnActualizarClick);

    });
}