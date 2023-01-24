$(
    $('#search').click(function () {
        $('#modal').fadeIn('fast');
    })
)
$(
    $('#close').click(function () {
        $('#modal').fadeOut('fast');
    })
)
$(
    $(document).on('click', '#modal-keyword', function () {
        $('#modal').fadeOut('fast');

        var search_word = $('#search-word').val();
        console.log(search_word);


        if ($('#follow-content').css('display') != 'none') {
            console.log('follow');

            $('#follow-content .board-item').each(function () {
                $(this).toggle(
                    ($(this).find('.board-text').text().indexOf(search_word)) >= 0
                );
            });
        } else {
            console.log('open');
            $('#open-content .board-item').each(function () {
                $(this).toggle(
                    ($(this).find('.board-text').text().indexOf(search_word)) >= 0
                );
            });
        }




    })
)
