window.onload = function() {
    $.get({
        url: '/cards',
        success: function(data, status) {
            $('#content').hide().html(data).fadeIn(500);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#content').html(data);
        }
    });
}