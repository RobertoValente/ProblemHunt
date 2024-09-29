$(document).ready(function() {
    $('#langFilter').change(function() {
        let langSelected = $(this).val();
    });
    
    $('#clearFilter').click(function() {
        if($('#langFilter').val() !== '0') $('#langFilter').val('0').trigger('change');
    });
    
    $('#typeDisplayFormatList').change(function() {
        ($(this).val() === 'list') ? $(this).val('grid') : $(this).val('list');

        let newFormat = $(this).val();
        if(newFormat === 'grid') {
            $('#content').css({
                'display': 'grid',
                'grid-template': 'repeat(2, 1fr) / repeat(2, 1fr)',
                'gap': '0px 16px'
            });
        } else {
            $('#content').css({
                'display': '',
                'grid-template': 'column',
                'gap': ''
            });
        }
    });
});