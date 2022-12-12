// タブ押下による内容の表示
function tabs() {
    if (document.getElementsByName('tab_item')[0].checked) {
        $('#open-content').removeClass('show');
        $('#follow-content').toggleClass('show');
    } else {
        $('#follow-content').removeClass('show');
        $('#open-content').toggleClass('show');
    }
}

// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on('load', function () {
    $('#follow-content').toggleClass('show');
});