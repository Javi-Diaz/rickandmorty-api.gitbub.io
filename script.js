let page = 1;
let anterior = document.querySelector(".header_anterior");
let siguiente = document.querySelector(".header_siguiente");

siguiente.addEventListener("click",()=>{
    if (page < 42) {
        page += 1;
        mostrarDatos();
    }
})

anterior.addEventListener("click",()=>{
    if(page > 1){
        page -= 1;
        mostrarDatos();
    }
});


const mostrarDatos = async ()=>{

    try{
        let peticion = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)

        if (peticion.status == 200) {
            let datos = await peticion.json()

            let personajes = '';

            datos.results.forEach((personaje)=>{
                personajes += `
                    <div class="card">
                        <img class="card_img" src="${personaje.image}" alt="foto-del-personaje">
                        <h3 class="card_name">${personaje.name}</h3>
                        <h4 class="card_features">Estado: ${personaje.status}</h4>
                        <h4 class="card_features">Especie: ${personaje.species}</h4>
                        <h4 class="card_features">Género: ${personaje.gender}</h4>
                        <h4 class="card_features">Origen: ${personaje.origin.name}</h4>
                    </div>
                `;
            });
    
            document.querySelector(".card-container").innerHTML = personajes;    
            
        } else if(peticion.status == 401){
            console.log("Algo ha ido mal con la petición. Si recibes este error, prueba a refrescar la página o actualizar tu navegador.")
        }else if(peticion.status == 404){
            console.log("El recurso ha sido borrado o quizá has escrito la dirección web mal. Comprueba que la dirección que has introducido es correcta y no le falta o sobra nada.")
        } else{
            console.log("Ha ocurrido un error con la carga de los recursos.")
        }

        
    }
    catch(e){
        console.log("Ha ocurrido un error.")
    }
}

mostrarDatos();


