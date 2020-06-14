$(document).ready(function() { 
  var url_string = window.location.href;
  var url = new URL(url_string);
  var paramValue = url.searchParams.get("country");

  $.get("https://restcountries.eu/rest/v2/alpha/" + paramValue, function (country) {
    $('#contryImage').attr('src', country.flag);
    
    $('#population').html(getPopulationString(country.population));
    
    $('#timezones').html(()=>{
      let timezoneHTML = "";
      for(let timezone of country.timezones) {
        timezoneHTML += "<span class='badge badge-success'>"+timezone+"</span>";
      }
      return timezoneHTML;
    });

    $('#languages').html(()=>{
      let languageHTML = "";
      for(let language of country.languages) {
        languageHTML += "<span class='badge badge-info'>"+language.name+" - "+language.nativeName+"</span>";
      }
      return languageHTML;
    });

    $('.countryName').each((index, ele)=>{
      $(ele).html(country.name + ((country.name != country.nativeName) ? " - " + country.nativeName : ""));
    });
    
    $('#capital').html(country.capital);
    
    $('#altSpellings').html(()=>{
      let altSpellingHTML = "";
      for(let altSpelling of country.altSpellings) {
        altSpellingHTML += "<span class='badge badge-secondary'>"+altSpelling+"</span>";
      }
      return altSpellingHTML;
    });
    
    $('#demonym').html(country.demonym);
    
    $('#borders').html(()=>{
      let borderHTML = "";
      for(let border of country.borders) {
        borderHTML += "<a href='country.html?country="+border+"' class='badge badge-primary'>"+border+"</a>";
      }
      return borderHTML;
    });

    $('#currencies').html(()=>{
      let currencyHTML = "";
      for(let currency of country.currencies) {
        currencyHTML += "<span class='badge badge-warning'> "+currency.symbol+" - "+currency.code+" - "+currency.name+"</span>";
      }
      return currencyHTML;
    });

    $('#region').html(country.region);
    
    $('#subregion').html(country.subregion);
    
    let languageSelected = country.languages[0];
    if(languageSelected.iso639_1 == "en" && country.languages[1]) {
      languageSelected = country.languages[1];
    }
    $('#language').html(languageSelected.name);
    
    $('#translateButton').click(()=>{
      $.get("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl="+languageSelected.iso639_1+"&dt=t&q="+encodeURI($('#inputText').val()), (responseText) => {
          $('#translatedText').html(responseText[0][0][0]);
      });
    });

    $.get("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl="+languageSelected.iso639_1+"&dt=t&q="+encodeURI("Hello, How are you?"), (responseText) => {
          $('#translatedText').html(responseText[0][0][0]);
      })
  });
});

// Reference: https://stackoverflow.com/questions/36734201/how-to-convert-numbers-to-million-in-javascript/36734774
function getPopulationString (labelValue) {

  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

  ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(3) + "B"
  // Six Zeroes for Millions 
  : (Math.abs(Number(labelValue)) >= 1.0e+6)

  ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(3) + "M"
  // Three Zeroes for Thousands
  : (Math.abs(Number(labelValue)) >= 1.0e+3)

  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(3) + "K"

  : Math.abs(Number(labelValue)).toFixed(3);

}
