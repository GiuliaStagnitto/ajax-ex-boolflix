// Milestone 1:Creare un layout base con una searchbar (una input e un button) in cui possiamoscrivere completamente o parzialmente il nome di un film. Possiamo, cliccando ilbottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ognifilm trovato:1.Titolo2.Titolo Originale3.Lingua4.Voto
function addSearchListener(){
  var target = $('#search');
  target.click(getMovies);
}

function getMovies(){
  var target = $('#query');
  var query = target.val();
  target.val('');

  $.ajax({
    url:'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      'api_key':'878f6a119c05e25ef0f9ec17f3e91fd6',
      'query' : query
    },
    success: function (data){
      var movies = data['results'];

      var target = $('#titoli ul');
      target.text('');

      var template = $('#searched-movie-template').html();
      var compiled = Handlebars.compile(template);

      for (var i = 0; i < movies.length; i++) {

          var movie = movies[i];

          var movieHTML = compiled(movie);
          target.append(movieHTML);
      }
    },
    error: function (err){
      console.log(err);
    }
  });
}
// Milestone 2: Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così dapermetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,lasciando le restanti vuote.Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera dellanazione corrispondente, gestendo il caso in cui non abbiamo la bandiera dellanazione ritornata dall’API. Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricercadovremo prendere sia i film che corrispondono alla query, sia le serie tv, standoattenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON dirisposta diversi, simili ma non sempre identici)Qui un esempio di chiamata per le serie tv:function searchBtnListener() {



function searchMovies() {
  var searchVal = $("#search").val();
  $(".titles").text("");
  $("#search").val("");
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    method: "GET",
    data: {
      'api_key':'e99307154c6dfb0b4750f6603256716d',
      'query' : searchVal,
      'language' : 'it'
    },
    success: function (data) {
      var results = data["results"];
      var template = $("#searched-movie-template").html();
      var compiled = Handlebars.compile(template);
      var target = $(".titles");
      for (var i = 0; i < results.length; i++) {
        var vote = results[i]['vote_average'];
        var flag = results[i]['original_language'];
        var poster = results[i]["poster_path"];
        var targetHTML = compiled({
          "title": results[i]["title"],
          "original_title": results[i]["original_title"],
          "original_language": getCountryFlag(flag),
          "vote_average": getStarsRating(vote),
          "poster": 'https://image.tmdb.org/t/p/w185' + poster + ''
        })
        target.append(targetHTML);
      }
    },
    error: function (error) {
      console.log(error);
    }
  })
  searchSeries(searchVal)
}

function searchSeries(searchVal) {
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/tv',
    method: "GET",
    data: {
      'api_key':'e99307154c6dfb0b4750f6603256716d',
      'query' : searchVal,
      'language' : 'it'
    },
    success: function (data) {
      var results = data["results"];
      var template = $("#searched-movie-template").html();
      var compiled = Handlebars.compile(template);
      var target = $(".titles");
      for (var i = 0; i < results.length; i++) {
        var vote = results[i]['vote_average'];
        var flag = results[i]['original_language'];
        var poster = results[i]["poster_path"];
        var targetHTML = compiled({
          "name": results[i]["name"],
          "original_name": results[i]["original_name"],
          "original_language": getCountryFlag(flag),
          "vote_average": getStarsRating(vote),
          "poster": 'https://image.tmdb.org/t/p/w185' + poster + ''
        })
        target.append(targetHTML);
      }
    },
    error: function (error) {
      console.log(error);
    }
  })
}


// POSIZIONAMENTO STELLINE
function getStarsRating(vote){
var starsRating = Math.ceil(vote / 2);
var star = " ";
for (var i = 0; i < 5; i++) {
  if (i < starsRating) {
    star += '<i class="fas fa-star"> </i>';
  } else {
    star += '<i class="far fa-star"> </i>';
  }
}
  return star;
}

// FUNZIONE BANDIERE
function getCountryFlag(flag) {
  if (flag == "it") {
    return '<img src="https://www.countryflags.io/it/shiny/32.png">'
  } else if (flag == "en") {
    return '<img src="https://www.countryflags.io/gb/shiny/32.png">'
  } else {
    return flag
  }
}


function init() {
  addSearchListener();
}

$(document).ready(init);
