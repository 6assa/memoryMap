// プロフィール機能

var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);

// カレントユーザー情報の取得
var currentUser = ncmb.User.getCurrentUser();
// カレントユーザのユーザID
var loginUserName = currentUser.userName;

var icon_url = '';
// 投稿テーブル
var post = ncmb.DataStore("post");
var follow = ncmb.DataStore("follow");
// ユーザ情報テーブル
var user = ncmb.DataStore("users");


// プロフィール画面ロードイベント
$(window).on('load', function () {

    // ユーザ名・自己紹介文適用
    user.equalTo('mailAddress', loginUserName).fetch().then(result => {

        $('#username').text(result['displayName']);
        $('#myself').text(result['selfComment']);
        icon_url = result['iconUrl'];

        // プロフィールアイコン画像の適用
        document.getElementById("icon-img").src = "https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/" + icon_url;
    });

    // 投稿表示
    post_output();
    // フォロー中表示
    follow_output();
    // フォロワー表示
    follower_output();

    // 表示の初期設定
    $('#post').css('border-bottom', '3px solid orange');
    $('#post-content').show();
});

function post_output() {

    // 変数定義
    var content = document.getElementById('open-content');
    // 現在のユーザの投稿を取得
    post.equalTo('userName', loginUserName).fetchAll().then(results => {

        if (results.length === 0) {
            $('.no-post').show();
        }
        // 取得した結果から1件ずつ処理
        $.each(results, function (index, value) {
            // 日時フォーマット
            formatedDate = dateformat(new Date(value['postedDate']['iso']));
            // 投稿要素の組み立て
            add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + index + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + value['roleObjectId'] + '"width="50px" height="50px" /></div><div class="board-text"><p id="text"><b>' + value['displayName'] + '</b><br><span>' + value['postedMessage'] + '</span></p><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"></div><div><i class="fa-regular fa-image"></i></div></div></div><div class="post-time"><p class="time">' + formatedDate + '</p></div></div>'


            // 投稿エリアに挿入
            content.insertAdjacentHTML('afterbegin', add_code);
        });
    });
}

function follow_output() {
    var content = document.getElementById('follow-content');
    // 現在フォロー中のユーザを取得
    follow.equalTo('followingUserName', loginUserName).fetchAll().then(results => {
        $.each(results, function (index, value) {
            followuser = value['userName'];
            // 取得したユーザの情報を取得
            user.equalTo('mailAddress', followuser).fetch().then(result => {

                // フォロー要素の組み立て
                add_code = '<div class="follow-item" id="follow-item"><div class="icon-img" id="follow-icon"><img class="board-icon" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + result['iconUrl'] + '" width="50px" height="50px" id="follow-icon"></div><p id="follow-name"><b>' + result['displayName'] + '</b></p><div class="follow-text"></div></div>';

                // フォローエリアに挿入
                content.insertAdjacentHTML('afterbegin', add_code);
            });

        });
    });
}

function follower_output() {
    var content = document.getElementById('follower-content');


    // フォロワーであるユーザを取得
    follow.equalTo('userName', loginUserName).fetchAll().then(results => {
        $.each(results, function (index, value) {
            followeruser = value['followingUserName'];

            // フォロワーユーザの情報を取得
            user.equalTo('mailAddress', followeruser).fetch().then(result => {

                // フォロワー要素の組み立て
                add_code = '<div class="follow-item" id="follow-item"><div class="icon-img" id="follow-icon"><img class="board-icon" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + result['iconUrl'] + '" width="50px" height="50px" id="follow-icon"></div><p id="follow-name"><b>' + result['displayName'] + '</b></p><div class="follow-text"></div></div>';

                // フォロワーエリアに挿入
                content.insertAdjacentHTML('afterbegin', add_code);
            });

        });
    });
}




function dateformat(source_date) {

    // 日時フォーマット（YYYY年MM月dd日 hh:mm）
    let formated_date = source_date.getFullYear() + '/' + source_date.getMonth() + '/' + source_date.getDate() + ' ' + source_date.getHours() + ':' + source_date.getMinutes();

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



//自己紹介詳細表示
$('#myself').click(function () {
    let text = document.getElementById('myself').textContent;

    if (text.length >= 22) {
        $(this).toggleClass('more');
    }
})

