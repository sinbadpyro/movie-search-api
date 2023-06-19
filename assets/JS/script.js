const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTBjM2QyYjhmNGJlZGExZTU3NGM3NzNlOWYyOTQwZCIsInN1YiI6IjYzZWZiZTZkMzU4MThmMDBkYjNkODgzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5M1G0z-dbMLtvz74RS7RTSRZuBzvjut92JvBxm1cBiI",
  },
};
//Les variables
let bouton = document.getElementById("bouton");
let contain = document.getElementById("movie-result");
let mySearch = document.getElementById("mySearch");
let aboutcontain = document.getElementById("movie-show");
let synopsis = document.getElementById("movie-overview");
let input = document.getElementById("mySearch").value;
//ceci est de monntrer les films quand on clicker sur le bouton
bouton.addEventListener("click", function () {
  displayrequest();
});
//ceci est de montrer les films quand on appuie sur entrer

mySearch.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    console.log("pressed");

    displayrequest();
  }
});

function displayrequest() {
  let input = document.getElementById("mySearch").value;
  let search = input;

  //cette condition se deroule quand le utilasateur ne mets pas un donnee

  if (search === "") {
    console.log("pls enter a film");
    contain.innerHTML = `<div class="contain">
     <h4>PLEASE ENTER A FILM...</h4> 
   </div>`;
    /***************/
  }
  console.log(search);

  fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      search +
      "&include_adult=false&language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.results.forEach((element) => {
        contain.innerHTML += `
         <div class="car m-2 col-lg-3 px-0">
         <img src="https://image.tmdb.org/t/p/w500/${element.backdrop_path}" alt="Avatar" style="width:100%">
         <div class="contain">
         <h4><a href="about.html" id="movie-overview">Title: <b>${element.original_title}</b></a></h4> 
           <h4>Date de Sortie: ${element.release_date}</h4> 
           <h4>Ratings: ${element.vote_average}</h4> 
         </div>
       </div>
           
         `;
      });
    })
    .catch((err) => console.error(err));
}
/****************************************************************************************** */
//for more details about the movie, and to go to another page.

/*****This is a function that saves the text when we go to another page */
function saveText() {
  let input = document.getElementById("mySearch").value;

  if (sessionStorage.getItem("autosave")) {
    // Restore the contents of the text field
    input = sessionStorage.getItem("autosave");
  }

  // Listen for changes in the text field
  input.addEventListener("change", () => {
    // And save the results into the session storage object
    sessionStorage.setItem("autosave", input);
  });
  window.location = "about.html";
  return false;
}

function displayMovieDetails() {
  saveText();
  fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      search +
      "&include_adult=false&language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.results.forEach((element) => {
        aboutcontain.innerHTML = `
         <div class="car m-2 col-lg-3 px-0">
         <img src="https://image.tmdb.org/t/p/w500/${element.backdrop_path}" alt="Avatar" style="width:100%">
         <div class="contain">
         <h4><a href="about.html" id="movie-overview">Title: <b>${element.original_title}</b></a></h4> 
           <h4>Date de Sortie: ${element.release_date}</h4> 
           <h4>Ratings: ${element.vote_average}</h4> 
           <h3>premise: ${element.overview}</h3>
         </div>
       </div>
           
         `;
      });
    })
    .catch((err) => console.error(err));
}

/****************************************************************************************** */
