var map;

function initMap() {
  $.get("https://restcountries.eu/rest/v2/all", function (countries) {
    
    var mapOptions = {
      center: new google.maps.LatLng(50, 50),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //Create and open InfoWindow.
    var infoWindow = new google.maps.InfoWindow();

    for (let country of countries) {
      var image = {
        url: country.flag,
        size: new google.maps.Size(32, 20),
        origin: new google.maps.Point(0, 0)
      };

      var myLatlng = new google.maps.LatLng(country.latlng[0], country.latlng[1]);
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: country.alpha2Code
      });

      //Attach click event to the marker.
      (function (marker, country) {
        google.maps.event.addListener(marker, "click", function (e) {
          let languageSelected = country.languages[0].iso639_1;
          if(languageSelected == "en" && country.languages[1]) {
            languageSelected = country.languages[1].iso639_1;
          }
          $.get("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl="+languageSelected+"&dt=t&q="+encodeURI("Welcome to " + country.name + "!"), (responseText) => {
          let welcomeText = responseText[0][0][0];
          //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
          infoWindow.setContent(getInfoBoxHTML(country, welcomeText));
          infoWindow.open(map, marker);
        });
          
        });
      })(marker, country);
    }
  });

  function printLanguages(languages, firstLanguage) {
    let languageStr = "<ol>";
    for(language of languages) {
      languageStr += "<li>" + language.name + ((firstLanguage != 'en') ?  " - " + language.nativeName : "") + "</li>";
    }
    return languageStr + "</ol>";
  }

  function getInfoBoxHTML(country, welcomeText){
    let infoContent = "<div class='info-container'>";
    infoContent += "<img src='"+country.flag+"' class='country-flag-infobox'/>";
    infoContent += "<h6 class='country-title'>" + country.name + ((country.name != country.nativeName) ? " - " + country.nativeName : "") + "</h6>";
    infoContent += "<div>";
    infoContent += "<span class='sub-title'>Languages:</span> ";
    infoContent += printLanguages(country.languages, country.languages[0].iso639_1) ;
    infoContent += "<span class='sub-title'>Welcome to "+country.name+"!</span> ";
    infoContent += ((welcomeText != "Welcome to " + country.name + "!") ? "<p>" + welcomeText + "</p>" : "");
    infoContent += "<div><a href='country.html?country=" + country.alpha2Code + "'>Know more about " + country.name + "</a></div>";
    infoContent += "</div>";
    infoContent += "</div>";
    return infoContent;
  }
}