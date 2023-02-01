var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);

// カレントユーザー情報の取得
var currentUser = ncmb.User.getCurrentUser();
var loginUserName = currentUser.userName;
// 投稿全件取得
var post = ncmb.DataStore("post");



// 自分の投稿を表示



$(window).on('load', function () {

    $('#username').text(currentUser.displayName);
    $('#post').css('border-bottom', '3px solid orange');
    $('#post-content').show();
    console.log(loginUserName);

    var content = document.getElementById('open-content');
    var add_code='';
    
    
    post.equalTo('userName', loginUserName).fetchAll().then(results => {
        $.each(results, function (index, value) {
            // 日時フォーマット
            formatedDate=dateformat(new Date(value['postedDate']['iso']));
            
            // 投稿要素の組み立て
            add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + index + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + value['roleObjectId'] + '"width="50px" height="50px" /></div><div class="board-text"><p id="text"><span>' + value['displayName'] + '</span><br><span>' + value['postedMessage'] + '</span></p><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"></div><div><i class="fa-regular fa-image"></i></div></div></div><div class="post-time"><p class="time">' + formatedDate + '</p></div></div>'


            // 投稿エリアに挿入
            content.insertAdjacentHTML('afterbegin', add_code);
        });

    });
});


function dateformat(source_date){

    // 日時フォーマット（YYYY年MM月dd日 hh:mm）
    let formated_date=source_date.getFullYear()+'年'+source_date.getMonth()+'月'+source_date.getDate()+'日 '+source_date.getHours()+':'+source_date.getMinutes();

    return formated_date
}




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