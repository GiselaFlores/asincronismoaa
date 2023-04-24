
function Peliculas() {
  let pagina = 1;

  const btnAnterior = (e)=>{
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
}

    const btnSiguiente = (e)=>{
        if(pagina < 1000){
            pagina += 1;
            cargarPeliculas();
        }
  }

  const cargarPeliculas = async() => {

    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${pagina}`);
        console.log(respuesta);

        if(respuesta.status === 200){
            const datos = await respuesta.json();

            let peliculas = "";
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" >
                        <h3 class="titulo"> ${pelicula.title} </h3>
                        <p>${pelicula.overview} </p>
                    </div>
                
                `;
            }); 
        
            document.getElementById("contenedor").innerHTML = peliculas;  
        }

        //verificación de mensaje de error para dar al usuario
        else if(respuesta.status === 401){console.log("key incorrecta");}
        else if(respuesta.status === 404){console.log("no disponible");}
        else {console.log("no tengo idea del error")}
    }

    catch(error){
        console.log(error.message);
        //acciones por si no funciona
    }
  }  

  cargarPeliculas();

  return (
    <div className="export">
        <div className="contenedor" id="contenedor"></div>
        <div className="paginacion">
            <button onClick={btnAnterior}>Anterior</button>
            <button onClick={btnSiguiente} id="btnSiguiente">Siguiente</button>
        </div>
    </div>
  )
}

export default Peliculas;
