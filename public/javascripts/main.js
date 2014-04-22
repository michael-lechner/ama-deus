$(function () {
    /********** handlers ***********/
    $('.navbar li:not(.active) a').hover(function () {
        $(this).animate({color: 'rgba(130, 78, 135, 1.0)'}, 500);
    }, function () {
        $(this).animate({color: 'rgba(153, 153, 153, 1.0)'}, 500);
    });
    /*******************************/

});