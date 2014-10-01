$(function () {
    /********** page load **********/
    $('.quote-container .quote').delay(1000).fadeIn(1500, function () {
        $('.quote-container .author').fadeIn(1500);
    });
    /********** handlers ***********/
    $('.navbar li:not(.active) a').hover(function () {
        $(this).animate({color: 'rgba(130, 78, 135, 1.0)'}, 500);
    }, function () {
        $(this).animate({color: 'rgba(153, 153, 153, 1.0)'}, 500);
    });

    //  nav
    $('.main-logo').on('click', function () {
        renderView('home');
    });

    $('.main-nav').on('click', '.about', function () {
        $(this).addClass('active');
        renderView('about');
    });

    $('.main-nav').on('click', '.courses', function () {
        renderView('courses');
    });
    
    $('.main-nav').on('click', '.info', function () {
        renderView('info');
    });
    
    $('.main-nav').on('click', '.contact', function () {
        renderView('contact');
    });

    $('.main-block').on('mouseenter', '.home-img', function () {
        var overlay = $(this).find('.overlay');
        overlay.width($(this).width());
        overlay.height($(this).height());

        overlay.fadeIn(600);
    });

    $('.main-block').on('mouseleave', '.home-img', function () {
        var overlay = $(this).find('.overlay');
        overlay.fadeOut(600);
    });
    /*******************************/


    /*********** map ***************/
    var buildMap = function () {
        console.log('tight', $('.interactive-map'));
        $('.interactive-map').highcharts('Map', {
            title: {
                text: 'People and Courses'
            },
            series : [{
                data: {},
                mapData: Highcharts.maps['custom/world'],
                joinBy: 'hc-key',
                name: 'People and Courses',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                }
            }]
        });
    }

    // mapChart.get('us').select();
    /*******************************/
    var renderView = function (view){
        $('body').fadeOut(300, function () {
            window.location.href = '/' + view + '/'             
        });
    }

});