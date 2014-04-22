$(function () {
    /********** handlers ***********/
    $('.navbar li:not(.active) a').hover(function () {
        $(this).animate({color: 'rgba(130, 78, 135, 1.0)'}, 500);
    }, function () {
        $(this).animate({color: 'rgba(153, 153, 153, 1.0)'}, 500);
    });

    //  nav
    $('.main-nav').on('click', '.about', function () {
        renderCourses();
    });
    /*******************************/

    var renderCourses = function () {
        $.get('/courses/', {}, function (d) {
            var block = $('.main-block')

            block.fadeOut(300, function () {
                block.html(d);
                block.fadeIn(400);                
            });

        });        
    }

});