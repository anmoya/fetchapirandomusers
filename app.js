var btnGeneraUsuario = document.getElementById('genera-usuario');
let divMuestraUsuario = document.getElementById('user');

document.addEventListener("DOMContentLoaded", function() {
    llamadaAPI();
});

btnGeneraUsuario.addEventListener('click', () => {
    //  Vamos a https://randomuser.me/api/
    llamadaAPI();
});

let llamadaAPI = () => {
    fetch('https://randomuser.me/api/')
        .then(response => {
            // parseamos la respuesta y retornamos como promesa
            return response.json();
        })
        // creamos el usuario y lo 
        .then(data => {
            let usuario = generaUsuario(data);
            divMuestraUsuario.innerHTML = pintaUsuarioHtml(usuario);
        });
};

let generaUsuario = dataJSON => {
    let usuario = new Object();
    usuario.nombre      = dataJSON.results[0].name.first;
    usuario.apellido    = dataJSON.results[0].name.last;
    usuario.username    = dataJSON.results[0].login.username;
    usuario.correo      = dataJSON.results[0].email;
    usuario.ciudad      = dataJSON.results[0].location.city;
    usuario.imagen      = dataJSON.results[0].picture.large;
    return usuario;
};

let pintaUsuarioHtml = usuario => {
    let visual = 
    `
        <div class='interfaz-usuario row'>
            <div class='col-4'>
                <img style='display: block; margin: 0 auto;' class='imagen-usuario' src='${usuario.imagen}' />
            </div>
            <div class='col-8'>
                <p class='nombre-completo'>${usuario.nombre.toUpperCase()} ${usuario.apellido.toUpperCase()}</p>
                <p class='username'>${usuario.username}</p>
                <p class='email'>Email: ${usuario.correo}</p>
                <p class='ciudad'>Ciudad: ${usuario.ciudad}</p>
            </div>
        </div>
    `;

    return visual;
};