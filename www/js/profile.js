// This is a JavaScript file
function tabs() {
    if (document.getElementsByName('tab_item')[0].checked) {
        $('#follow-content').removeClass('show');
        $('#follower-content').removeClass('show');
        $('#post-content').toggleClass('show');
    } else if(document.getElementsByName('tab_item')[1].checked) {
        $('#post-content').removeClass('show');
        $('#follower-content').removeClass('show');
        $('#follow-content').toggleClass('show');
    }else{
        $('#post-content').removeClass('show');
        $('#follow-content').removeClass('show');
        $('#follower-content').toggleClass('show');
    }
}

// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on('load', function () {
    $('#post-content').toggleClass('show');
});
