window.onload = function() {
    $.get({
        url: '/cards',
        success: function(data, status) {
            $('#content').hide().html(data).fadeIn(500);
            try { mdlWelcomeMsg.showModal(); } catch(err) { return; }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#content').html(data);
            try { mdlWelcomeMsg.showModal(); } catch(err) { return; }
        }
    });
}