window.onload = function() {
    $('#langFilter').change(function() {
        let langSelected = $(this).val();
        console.log("> " + langSelected);
    });

    $('#clearFilter').click(function() {
        if($('#langFilter').val() !== '0') $('#langFilter').val('0').trigger('change');
    });

    $('#typeDisplayFormatList').change(function() {
        ($(this).val() === 'list') ? $(this).val('grid') : $(this).val('list');
        let newFormat = $(this).val();
        console.log("> " + newFormat);
    });
}