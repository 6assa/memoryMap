// This is a JavaScript file
function tabs() {
    if (document.getElementsByName('tab_item')[0].checked) {
        $('#follow-content').hide();
        $('#follower-content').hide();
        $('#post-content').fadeIn();
    } else if(document.getElementsByName('tab_item')[1].checked){
        $('#post-content').hide();
        $('#follower-content').hide();
        $('#follow-content').fadeIn();
    }else{
        $('#post-content').hide();
        $('#follow-content').hide();
        $('#follower-content').fadeIn();
    }
}

// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on('load', function () {
    $('#post').css('border-bottom','3px solid orange');
    $('#follow-content').show();
    
});
