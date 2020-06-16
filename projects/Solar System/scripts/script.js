let planets = {
    sun: {
        title: 'Sun',
        rotation: '-',
        revolution: '-'
    },
    mercury: {
        title: 'Mercury',
        rotation: '28.6 days',
        revolution: '87.97 days'
    },
    venus: {
        title: 'Venus',
        rotation: '243 days',
        revolution: '224.7 days'
    },
    earth: {
        title: 'Earth',
        rotation: '0.99 days',
        revolution: '365.26 days'
    },
    mars: {
        title: 'Mars',
        rotation: '1.03 days',
        revolution: '1.88 years'
    },
    jupiter: {
        title: 'Jupiter',
        rotation: '0.41 days',
        revolution: '11.86 years'
    },
    saturn: {
        title: 'Saturn',
        rotation: '0.45 days',
        revolution: '29.46 years'
    },
    uranus: {
        title: 'Uranus',
        rotation: '0.72 days',
        revolution: '84.01 years'
    },
    neptune: {
        title: 'Neptune',
        rotation: '0.67 days',
        revolution: '164.79 years'
    },
}

$(document).ready(function () {
    for (let i = 0; i < 200; i++) {
        let element = $('<div></div>').addClass("star")
        element.animate({
            top: Math.floor(Math.random() * 99) + '%',
            left: Math.floor(Math.random() * 99) + '%'
        })
        $('body').append(element);
    }
    let htmlContent = "";
    for (let eachPlanet of Object.keys(planets)) {
        htmlContent += "<div class='planet-list-card'>";
        htmlContent += "<img class='planet-img' src='" + 'Images/' + planets[eachPlanet]['title'] + '.png' + "' alt=''>";
        htmlContent += "<h2 class='" + eachPlanet + "-color capitalize'>" + eachPlanet + "</h2>";
        htmlContent += "<p>Rotation period: <span class='rotation-period-text'>"+planets[eachPlanet]['rotation']+"</span></p>";
        htmlContent += "<p>Revolution period: <span class='revolution-period-text'>"+planets[eachPlanet]['revolution']+"</span></p></div>";
        $('.planets-list').html(htmlContent);
    }

    $('.star').each((index, element) => {
        $(element).fadeIn();
        animateDiv(element);
    })
    $(".planet").click(function (e) {
        e.preventDefault();
    });
    $("#allPlanetsLink").click(() => {
        if (planet) {
            removeClasses(planets[planet]['title'].toLowerCase());
        }
        $('#circle-orbit-container').removeClass('visible');
        $('.planets-list').removeClass('hidden');
        $('#circle-orbit-container').addClass('hidden');
        $('.planets-list').addClass('visible-flex');
        $('footer').addClass('visible');
    });
    $("#solarSystemLink").click(() => {
        $('#circle-orbit-container').removeClass('hidden');
        $('.planets-list').removeClass('visible-flex');
        $('#circle-orbit-container').addClass('visible');
        $('.planets-list').addClass('hidden');
        $('footer').removeClass('visible');
    });
    $(".planet").unbind('click');
    let planet;
    $('.planet-container').click((element) => {
        if ($(element.target).attr('id') != planet) {
            if (planet) {
                removeClasses(planets[planet]['title'].toLowerCase());
            }
            planet = $(element.target).attr('id');
            planet = !planet ? $(element.target).parent().attr('id') : planet;
            $('#planet-title').html(planets[planet]['title']);
            $('#rotation-period-text').html(planets[planet]['rotation']);
            $('#revolution-period-text').html(planets[planet]['revolution']);
            $('.star').addClass(planets[planet]['title'].toLowerCase() + '-background');
            $('header h2').addClass(planets[planet]['title'].toLowerCase() + '-background');
            $('.planet-card h2').addClass(planets[planet]['title'].toLowerCase() + '-color');
            // $('#close-btn').addClass(planets[planet]['title'].toLowerCase()+'-color');
            $('#close-btn').addClass(planets[planet]['title'].toLowerCase() + '-border');
            $('#planet-img').attr('src', 'Images/' + planets[planet]['title'] + '.png');
            $('.planet-card').fadeIn();
        }
    })
    $('#close-btn').click(() => {
        removeClasses(planets[planet]['title'].toLowerCase());
        planet = undefined;
    })

})

function removeClasses(planet) {
    $('.star').removeClass(planet + '-background');
    $('header h2').removeClass(planet + '-background');
    $('.planet-card h2').removeClass(planet + '-color');
    // $('#close-btn').removeClass(planet+'-color');
    $('#close-btn').removeClass(planet + '-border');
    $('.planet-card').fadeOut();
}

function getSign() {
    return (Math.random() > 0.5) ? '' : '-';
}

function animateDiv(element) {
    $(element).animate({
        top: Math.floor(Math.random() * 99) + '%',
        left: Math.floor(Math.random() * 99) + '%'
    }, 500000, () => {
        animateDiv(element);
    });
};