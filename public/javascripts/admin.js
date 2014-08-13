$(function () {
    bindHandlers();

});

var bindHandlers = function () {
    $('.display-table .delete-entry').hover(
        function(){
            $(this).css('color', 'red');
        }, 
        function(){
            $(this).css('color', 'black');
        });

    $('.display-table .delete-entry').on('click', function(){
        var id = $(this).closest('tr').attr('data-id');
        $.ajax({
            url: '/delete-practitioner',
            type: 'POST',
            dataType: 'JSON',
            data: {id: id},
            success: removeTableEntry
        });
    })
}

var removeTableEntry = function (response) {
    $('[data-id=' + response._id + ']')
        .find('td')
        .css('padding', '0px')
        .wrapInner('<div style="display: block;" />')
        .parent()
        .find('td > div')
        .slideUp(300, function () {
            $(this).closest('tr').remove()
        });
}