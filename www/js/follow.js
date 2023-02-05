// This is a JavaScript file
var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);

// カレントユーザー情報の取得
var currentUser = ncmb.User.getCurrentUser();
// カレントユーザのユーザID
var loginUserName = currentUser.userName;

var icon_url = '';
// フォローテーブル
var follow = ncmb.DataStore("follow");
// ユーザ情報テーブル
var user = ncmb.DataStore("users");




$(document).on('click', '.icon-img', function () {
    $('#follow-modal').find('.follow-btn').hide();
    // 投稿したユーザのメールアドレスを取得
    var select_user = $(this).find('#userId').val();
    console.log($(this).find('#userId').val());

    user.equalTo('mailAddress', select_user).fetch().then(result => {

        $('#display-name').text(result['displayName']);
        $('#user-name').text(result['mailAddress']);
        $('#myself').text(result['selfComment']);
        icon_url = result['iconUrl'];

        // プロフィールアイコン画像の適用
        document.getElementById("icon-follow").src = "https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/" + icon_url;
    });


    if (select_user != loginUserName) {
        // フォローしているかを結果の件数で判定
        follow.equalTo('followingUserName', loginUserName).equalTo('userName', select_user).count().fetchAll().then(results => {
            console.log(results);
            console.log(results.count);


            if (results.count === 0) {
                // まだフォローしていない時
                $('#follow-modal').find('.follow').show();

            } else if (results.count > 0) {
                // フォロー中の時
                $('#follow-modal').find('.follow-out').show();
            }

        }).catch(function (err) {
            console.log(err);
        });

        $('#follow-modal').show();
    } else {
        console.log("同じユーザ");
    }
})

// フォロー
$(document).on('click', '.follow', function () {
    var Follow = ncmb.DataStore("follow");
    var follow = new Follow();
    
    follow.set('followingUserName', loginUserName)
        .set('followStatus', true)
        .set('userName', $('#user-name').text())
        .save()
        .then(function (result) {
            //ここに処理書く
            console.log('動いてる');

            $('#follow-modal').find('.follow').hide();
            $('#follow-modal').find('.follow-out').show();
            
        })
        .catch(function (err) {
            console.log(err);
        });
})

// フォロー解除
$(document).on('click', '.follow-out', function () {
    
   if(window.confirm("フォローを解除しますか？")){
        follow.equalTo('followingUserName',loginUserName)
    .equalTo('userName',$('#user-name').text())
    .fetch()
        .then(function (result) {
            //ここに処理書く
            console.log('動いてる');
            result.delete();
            $('#follow-modal').find('.follow-out').hide();
            $('#follow-modal').find('.follow').show();
            
        })
        .catch(function (err) {
            console.log(err);
        });
   }
})


$(
    $('#follow-close').click(function () {
        $('#follow-modal').fadeOut('fast');
    })
)