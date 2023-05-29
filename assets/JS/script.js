const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTBjM2QyYjhmNGJlZGExZTU3NGM3NzNlOWYyOTQwZCIsInN1YiI6IjYzZWZiZTZkMzU4MThmMDBkYjNkODgzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5M1G0z-dbMLtvz74RS7RTSRZuBzvjut92JvBxm1cBiI",
  },
};



let bouton = document.getElementById("bouton")
let contain = document.getElementById("movie-result")

bouton.addEventListener("click", function () {
  let input = document.getElementById("mySearch").value;
  let search = input
  console.log(search)

  fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      search +
      "&include_adult=false&language=en-US&page=1",
    options
  )
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.results.forEach(element => {
         contain.innerHTML +=`
         <div class="car m-2 col col-sm-10">
         <img src="https://image.tmdb.org/t/p/w500/${element.backdrop_path}" alt="Avatar" style="width:100%">
         <div class="contain">
           <h4>Title: <b>${element.original_title}</b></h4> 
           <h4>Date de Sortie: ${element.release_date}</h4> 
           <h4>Ratings: ${element.vote_average}</h4> 
         </div>
       </div>
           
         ` 
        })
        })
    .catch(err => console.error(err))    
});

 /* TEMPLATE FOR REFERENCE .then(res => {
    return res.json();
}).then(data => {
   console.log(data)
   contain.innerHTML = `
   <div class="card">
   <img src="${data.results[0].picture.large}" alt="Avatar" style="width:100%">
   <div class="container">
       <p>Departement: ${data.results[0].location.state}</p>
       <p>Ville: ${data.results[0].location.city}</p>
       <p>Pseudo: ${data.results[0].login.username}</p>
       <p>Age: ${data.results[0].registered.age}</p>
       
   </div>
</div>
   `
*/