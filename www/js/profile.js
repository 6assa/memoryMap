var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);

// カレントユーザー情報の取得
var currentUser = ncmb.User.getCurrentUser();
var loginUserName = currentUser.userName;
// 投稿全件取得
var post = ncmb.DataStore("post");



// 自分の投稿を表示

window.addEventListener('load', function () {
    post.equalTo('userName', loginUserName).fetchAll().then(results => {
        console.log(results)
    });

});
$.each(myPostArray, function (cnt, value_data) {
    var content = document.getElementById('open-content');
    var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" src="' + value_data[0] + '" width="50px" height="50px" ></div><div class="board-text"><p id="text"><span>' + value_data[1] + '</span><br><span>' + value_data[2] + '</span></p><div class="post-img"><img src="img/share.png"><img src="img/good.png"></div></div><div class="post-time"><p class="time">' + value_data[3] + '</p></div></div>'
    content.insertAdjacentHTML('beforeend', add_code);
})
    ;

// タブの動き
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
    console.log(loginUserName);
    console.log("名前とれるかな");
});

//自己紹介詳細表示
$('#myself').click(function () {
    let text = document.getElementById('myself').textContent;

    if (text.length >= 22) {
        $(this).toggleClass('more');
    }
})

$(document).on('click', '.icon-img', function () {
    location.href = 'profile.html';

})