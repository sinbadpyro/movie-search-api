const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTBjM2QyYjhmNGJlZGExZTU3NGM3NzNlOWYyOTQwZCIsInN1YiI6IjYzZWZiZTZkMzU4MThmMDBkYjNkODgzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5M1G0z-dbMLtvz74RS7RTSRZuBzvjut92JvBxm1cBiI",
  },
};
//Base Variables
let bouton = document.getElementById("bouton");
let contain = document.getElementById("movie-result");
let mySearch = document.getElementById("mySearch");
let aboutcontain = document.getElementById("movie-show");
let synopsis = document.getElementById("movie-overview");

//Function to show the films on index.html when we click on button
bouton.addEventListener("click", function () {
  displayrequest();
});

//Function to show the films on index.html when we press enter
mySearch.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    console.log("pressed");
    displayrequest();
  }
});

function displayrequest() {
  let search = mySearch.value;
  //For when the user does not enter any value
  console.log(search);
  if (search === "") {
    console.log("pls enter a film");
    contain.innerHTML = `<div class="contain">
     <h4>PLEASE ENTER A FILM...</h4> 
   </div>`;
    
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
         <h4 ><a href="about.html"  onclick="movieSelected(${element.id})" id="hover">Title: <b>${element.original_title}</b></a></h4> 
           <p>Date de Sortie: ${element.release_date}</p> 
           <p>Ratings: <span id="p">${element.vote_average}</span></p> 
          
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
function movieSelected(movieId) {
  sessionStorage.setItem("movieId", movieId);
  window.location = "movie.html";
  return false;
}

/************************************************************* */

function displayMovieDetails() {
  let movieId = sessionStorage.getItem("movieId");

  fetch(
    "https://api.themoviedb.org/3/movie/" +
      movieId +
      "?language=en-US&api_key=YOUR_API_KEY",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      aboutcontain.innerHTML = `
         <div class="car m-2 col-9 px-0" id="aboutt">
         <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="Poster" style="width:100%" 
         id="imageab" class="img-fluid">
         <div class="contain">
         <h4>Title: <b>${data.original_title}</b></h4> 
         <h4>Release Date: ${data.release_date}</h4> 
         <h4>Ratings: ${data.vote_average}</h4> 
         <p>Overview: ${data.overview}</p>
         </div>
       </div>`;
    })
    .catch((err) => console.error(err));
}

/****************************************************************************************** */
