// キーワード検索機能
$(
    // モーダル表示
    $('#search').click(function () {
        $('#search-modal').fadeIn('fast');
    })
)
$(
    // モーダル非表示
    $('#close').click(function () {
        $('#search-modal').fadeOut('fast');
    })
)
$(
    $(document).on('click', '#search-btn', function () {
        $('#search-modal').fadeOut('fast');
        $('#search').hide();
        $('#search-reset').show();


        // 検索キーワード
        var search_word = $('#search-word').val();

            $('#post-content .board-item').each(function () {
                if($(this).find('.board-text').text().indexOf(search_word) < 0){
                    $(this).addClass('unselect');
                }
            });
        
    })
)
$(document).on('click', '#search-reset', function () {
        $('#search').show();
        $('#search-reset').hide();
        document.getElementById('search-word').value='';
            $('#post-content .board-item').each(function () {
                if($(this).hasClass('unselect')){
                    $(this).removeClass('unselect');
                }
            });
        
    })