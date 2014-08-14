$(function () {
    bindHandlers();

});

var bindHandlers = function () {
    /********** visual effects *************/
    $(document).on('mouseenter', '.display-table .delete-entry',
        function () { $(this).css('color', 'red'); }
    );

    $(document).on('mouseleave', '.display-table .delete-entry', 
        function () { $(this).css('color', 'black' ); }
    )

    /********** ajax actions ******************/
    $(document).on('click', '.display-table .delete-entry', function(){
        var id = $(this).closest('tr').attr('data-id');
        $.ajax({
            url: '/delete-practitioner',
            type: 'POST',
            dataType: 'JSON',
            data: {id: id},
            success: removeTableEntry
        });
    })

    $(document).on('click', '.practitioner-submit', function (e) {
        e.preventDefault();
        var inputList = $(this).closest('form').find('input')
        var formData = gatherFormData(inputList);
        
        clearForm(inputList);

        $.ajax({
            url: '/create-practitioner',
            type: 'POST',
            data: {data: formData},
            success: replaceTable
        });
    });

    $(document).on('click', '.editable-field', function () {
        var val = $(this).text();
        var width = $(this).innerWidth();

        console.log(width);

        $(this).html('<input style="width: ' + width + 'px; " type="text" class="form-control" value="' + val + '">');
        
        $(this).find('input').focus();
        
        $(this).focusout(function () {
            var newVal = $(this).find('input').val();
            $(this).html(newVal);

            // $.ajax({
            //     url: '/delete-practitioner',
            //     type: 'POST',
            //     dataType: 'JSON',
            //     data: {id: id}
            // })
        });
    });
}

/********** helper functions *****************/
var clearForm = function (inputList) {
    inputList.val('');
}

var removeTableEntry = function (response) {
    $('[data-id=' + response._id + ']')
        .find('td')
        .css('padding-top', '0px')
        .css('padding-bottom', '0px')
        .wrapInner('<div style="display: block;" />')
        .parent()
        .find('td > div')
        .slideUp(300, function () {
            $(this).closest('tr').remove()
        });
}

var replaceTable = function (response) {
    $('.display-table').html(response);
}

var gatherFormData = function (inputList) {
    var data = {}
    $.each(inputList, function () {
        if($(this).attr('name')) data[$(this).attr('name')] = $(this).val();
    });
    return(data);
}