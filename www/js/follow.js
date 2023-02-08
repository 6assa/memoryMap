// フォロー機能

// ニフクラ初期設定
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



// フォローモーダル
$(document).on('click', '.icon-img', function () {

    // モーダル内フォローボタンを初期化
    $('#follow-modal').find('.follow-btn').hide();

    // 投稿したユーザのメールアドレスを取得
    var select_user = $(this).find('#userId').val();

    // モーダル表示用のユーザ情報取得
    user.equalTo('mailAddress', select_user).fetch().then(result => {
        // ユーザ表示名の適用
        $('#display-name').text(result['displayName']);

        // ユーザ名(メールアドレス)の適用
        $('#user-name').text(result['mailAddress']);
        $('#myself').text(result['selfComment']);
        icon_url = result['iconUrl'];

        // プロフィールアイコン画像の適用
        document.getElementById("icon-follow").src = "https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/" + icon_url;
    });

    // 現在のユーザ以外でモーダル表示する
    if (select_user != loginUserName) {

        // フォローしているかを結果の件数で判定
        follow.equalTo('followingUserName', loginUserName).equalTo('userName', select_user).count().fetchAll().then(results => {
            
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
    }
})

// フォロー
$(document).on('click', '.follow', function () {
    // フォローテーブル初期化
    var Follow = ncmb.DataStore("follow");
    var follow = new Follow();
    
    // フォロー情報登録
    follow.set('followingUserName', loginUserName)
        .set('followStatus', true)
        .set('userName', $('#user-name').text())
        .save()
        .then(function (result) {

            // フォロー解除ボタン表示
            $('#follow-modal').find('.follow').hide();
            $('#follow-modal').find('.follow-out').show();
            
        })
        .catch(function (err) {
            console.log(err);
        });
})

// フォロー解除
$(document).on('click', '.follow-out', function () {
    
    // 確認ダイアログを表示する
   if(window.confirm("フォローを解除しますか？")){
        follow.equalTo('followingUserName',loginUserName)
    .equalTo('userName',$('#user-name').text())
    .fetch()
        .then(function (result) {
            //指定レコード削除
            result.delete();

            // フォローボタン表示
            $('#follow-modal').find('.follow-out').hide();
            $('#follow-modal').find('.follow').show();
            
        })
        .catch(function (err) {
            console.log(err);
        });
   }
})


$(
    // モーダルを閉じる
    $('#follow-close').click(function () {
        $('#follow-modal').fadeOut('fast');
    })
)