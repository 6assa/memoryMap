// タブ押下による内容の表示
function tabs() {
    if (document.getElementsByName('tab_item')[0].checked) {
        $('#open-content').hide();
        $('#follow-content').show();
    } else {
        $('#follow-content').hide();
        $('#open-content').show();
    }
}

// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on('load', function () {
    $('#follow-content').show();
});

