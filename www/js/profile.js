// This is a JavaScript file
// オープンの投稿を配列に定義
var openArray = [
        ['img/search.svg','ダミー','ダミーデータです','12:00'],
        ['img/search.svg','ダミー','ダミーデータです','12:00'],
        ['img/search.svg','ダミー','ダミーデータです','12:00'],
        ['img/search.svg','ダミー','ダミーデータです','12:00'],
        ['img/search.svg','ダミー','ダミーデータです','12:00'],
        ['img/home.svg','香島 凌','給料ほしいです','12:32'],
        ['img/bell.svg','あさき','長い文字が入力されたぞおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおお','12:50'],
        ['img/usericon.png','ゆあさ','からあげくんです','13:24'],
        ['img/search.svg','ふくい','だいふくおいしいです','14:12'],
        ['img/pin.svg','いけの','おかねおかね','15:30']
    ];


// オープンの投稿を表示
window.addEventListener('load',function () {
    $.each(openArray, function(cnt, value_data){
        var content = document.getElementById('open-content');
        var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" src="' + value_data[0] + '" width="50px" height="50px" ></div><div class="board-text"><p id="text"><span>' + value_data[1] + '</span><br><span>' + value_data[2] + '</span></p><div class="post-img"><img src="img/share.png"><img src="img/good.png"></div></div><div class="post-time"><p class="time">' + value_data[3] + '</p></div></div>'
        content.insertAdjacentHTML('beforeend', add_code);
    });
})

function tabs() {
    if (document.getElementsByName('tab_item')[0].checked) {
        $('#follow-content').hide();
        $('#follower-content').hide();
        $('#post-content').fadeIn();
    } else if (document.getElementsByName('tab_item')[1].checked) {
        $('#post-content').hide();
        $('#follower-content').hide();
        $('#follow-content').fadeIn();
    } else {
        $('#post-content').hide();
        $('#follow-content').hide();
        $('#follower-content').fadeIn();
    }
}

// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on('load', function () {
    $('#post').css('border-bottom', '3px solid orange');
    $('#post-content').show();

});

//自己紹介詳細表示
$('#myself').click(function(){
    let text=document.getElementById('myself').textContent;

    if(text.length>=22){
        $(this).toggleClass('more');
    }
})

$(document).on('click', '.icon-img', function (){
    location.href = 'profile.html';
})