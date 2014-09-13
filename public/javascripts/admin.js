$(function () {
    bindHandlers();

});

var bindCourseHandlers = function () {
    $('#startDate').datepicker({
        onSelect: function (date, ui) {
            $(this).attr('data-date', date);
        }
    });
    $('#endDate').datepicker({
        onSelect: function (date, ui){
            $(this).attr('data-date', date);
        }
    });
}

var bindHandlers = function () {
    /*************** nav *******************/
    $(document).on('click', '.nav-practitioner', function(){
        if(!$(this).hasClass('active')){
            $(this).closest('ul').find('li').removeClass('active');
            $(this).addClass('active');

            ajaxCall(
                $(this).find('a').attr('data-url'),
                {},
                function (response) {
                    $('.mainContent').html(response);
                    bindCourseHandlers();
                }
            );
        }
    })

    /********** visual effects *************/
    $(document).on('mouseenter', '.display-table .delete-entry',
        function () { $(this).css('color', 'red'); }
    );

    $(document).on('mouseleave', '.display-table .delete-entry', 
        function () { $(this).css('color', 'black' ); }
    )

    /********** ajax actions ******************/
    /********** users *************************/
    $(document).on('click', '.display-table .delete-user-entry', function(){
        var id = $(this).closest('tr').attr('data-id');
        ajaxCall(
            '/deleteuser',
            { id: id },
            removeTableEntry
        );
    });

    /********** practitioners *****************/
    $(document).on('click', '.display-table .delete-practitioner-entry', function(){
        var id = $(this).closest('tr').attr('data-id');
        console.log('hi');

        ajaxCall(
            '/delete-practitioner',
            { id: id },
            removeTableEntry
        );
    });

    $(document).on('click', '.practitioner-submit', function (e) {
        e.preventDefault();
        var inputList = $(this).closest('form').find('input')
        var formData = gatherFormData(inputList);
        
        clearForm(inputList);

        ajaxCall(
            '/create-practitioner', 
            { data: formData }, 
            replaceTable
        );
    });

    $(document).on('click', '.editable-field', function () {
        var val = $(this).text();
        var width = $(this).innerWidth();

        $(this).html('<input style="width: ' + width + 'px; " type="text" class="form-control" value="' + val + '">');
        
        $(this).find('input').focus();
        
        $(this).focusout(function () {
            var newVal = $(this).find('input').val();
            var row = $(this).closest('tr');
            $(this).html(newVal);

            ajaxCall(
                '/update-practitioner',
                {
                    id: row.attr('data-id'),
                    data: gatherTdData(row.find('td'))
                }
            );
         });
    });

    /********** courses *************************/

}

/********** helper functions *****************/
var ajaxCall = function (url, data, successFunc){
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: successFunc
        });
}

var clearForm = function (inputList) {
    $.each(inputList, function () {
        if(!$(this).hasClass('practitioner-submit')) $(this).val('');
    });
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

var gatherTdData = function (dataList){
    var data = {}
    $.each(dataList, function () {
        if($(this).attr('name')) data[$(this).attr('name')] = $(this).text();
    });
    return(data);    
}