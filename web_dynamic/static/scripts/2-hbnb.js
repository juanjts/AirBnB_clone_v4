$(document).ready(function () {
    const checkedList = [];
    $('input:checkbox').change(function () {
        if($(this).is(':checked')){
            checkedList[$(this).attr('data-id')] = $(this).attr('data-name')
        }else{
            delete checkedList[$(this).attr('data-id')];
        }
        $('DIV.amenities H4').text(Object.values(checkedList).join(', '));
    });
});
$(function () {
    $.get('http://localhost:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('DIV#api_status').addClass('available');
        } else {
            $('DIV#api_status').removeClass('available');
        }
    });
});
