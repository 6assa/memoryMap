// This is a JavaScript file
function tabs() {
    if (document.getElementsByName('tab_item')[0].checked) {
        $('#follow-content').hide();
        $('#follower-content').hide();
        $('#post-content').show();
    } else if(document.getElementsByName('tab_item')[1].checked) {
        $('#post-content').hide();
        $('#follower-content').hide();
        $('#follow-content').show();
    }else{
        $('#post-content').hide();
        $('#follow-content').hide();
        $('#follower-content').show();
    }
}

// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on('load', function () {
    $('#post').css('border-bottom','3px solid orange');
    $('#post-content').show();
});
