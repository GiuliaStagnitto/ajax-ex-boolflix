function searchBtnListener() {
  var btn = $("#search-btn");
  btn.click(searchMovies);
}

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
          "poster": 'https://image.tmdb.org/t/p/w342' + poster + '',
          "overview": results[i]["overview"]
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
          "poster": 'https://image.tmdb.org/t/p/w342' + poster + '',
          "overview": results[i]["overview"]
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
searchBtnListener();
}

$(document).ready(init);
