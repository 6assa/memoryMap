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

        検索キーワード
        var search_word = $('#search-word').val();


        if ($('#follow-content').css('display') != 'none') {
            // フォロー投稿の検索
            $('#follow-content .board-item').each(function () {
                $(this).toggle(
                    ($(this).find('.board-text').text().indexOf(search_word)) >= 0
                );
            });
        } else {
            $('#open-content .board-item').each(function () {
                // オープン投稿の検索
                $(this).toggle(
                    ($(this).find('.board-text').text().indexOf(search_word)) >= 0
                );
            });
        }
    })
)
