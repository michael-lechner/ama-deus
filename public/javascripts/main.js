$(function () {
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
        renderView('courses', buildMap);
    });
    
    $('.main-nav').on('click', '.info', function () {
        renderView('info');
    });
    
    $('.main-nav').on('click', '.contact', function () {
        renderView('contact');
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

    var renderView = function (view, cb) {
        $.get('/' + view + '/', {}, function (d) {
            var block = $('.main-block')

            block.fadeOut(300, function () {
                block.html(d);
                block.fadeIn(400);     
                cb();           
            });

        });        
    }

});