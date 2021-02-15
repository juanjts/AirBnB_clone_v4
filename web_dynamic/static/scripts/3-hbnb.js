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
    $(function () {
        $.get('http://localhost:5001/api/v1/status/', function (data) {
            if (data.status === 'OK') {
                $('DIV#api_status').addClass('available');
            } else {
                $('DIV#api_status').removeClass('available');
            }
        });
    });
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5001/api/v1/places_search/',
        data: JSON.stringify({}),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          for (const i of data) {
            const html = `<article>
                              <div class="title_box">
                                <h2>${i.name}</h2>
                                <div class="price_by_night">${i.price_by_night}</div>
                              </div>
                              <div class="information">
                              <div class="max_guest">${i.max_guest} Guest</div>
                                <div class="number_rooms">${i.number_rooms} Bedroom</div>
                                <div class="number_bathrooms">${i.number_bathrooms} Bathroom</div>
                              </div>
                              
                              <div class="description">
                              ${i.description}
                              </div>
                          </article>`;
            $('.places').append(html);
          }
        }
    });
});
