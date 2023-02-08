var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);
var Users = ncmb.DataStore("users");
var users = new Users();

function onRegisterBtn() {
    //入力フォームから変数をセット
    //ニフクラの仕組みでusernameにメアドを入れてる
    var username = $("#reg_mailaddres").val();
    var displayname = $("#reg_username").val();
    var password = $("#reg_password").val();
    var checkpassword = $("#regcheck_password").val();
    var passcheck = true;
    var mailcheck = true;
    var selfComment = "初めまして！よろしくお願いします！";

    //ユーザネームを未入力の場合
    if (!displayname) { //空文字とnull
        displayname = "名無しのごんぞう";
    }

    //必須項目のアラート
    if (!username) { //空文字とnull
        alert("メールアドレスが入力されていません");
        mailcheck = false;
    } else if (!password){
        alert("パスワードが入力されていません");
        passcheck = false;
    }

    //mailaddressが被ってないかチェック
    if (username) {
        ncmb.User.equalTo("userName", username)
            .fetchAll()
            .then(function (results) {
                mailcheck = false;
            })
            .catch(function (error) {
                mailcheck = true;
            });
    }

    //パスワード比較
    if (password != checkpassword) {
        alert("確認パスワードが違います");
        passcheck = false;
    }

    if (passcheck == true && mailcheck == true) {
        //初期アイコン
        var items = ['icon-gray.svg', 'lightblue-icon.svg', 'lightred-icon.svg', 'skyblue-icon.svg', 'pink-icon.svg', 'orange-icon.svg', 'yellowgreen-icon.svg', 'yellow-icon.svg', 'red-icon.svg', 'blue-icon.svg', 'purple-icon.svg', 'green-icon.svg'];
 
        //最大値は配列の「要素数」にする
        var randomIconNo = Math.floor(Math.random() * items.length);

        var user = new ncmb.User();
        user.set("userName", username)
            .set("displayName", displayname)
            .set("password", password)
            .signUpByAccount() //ここでニフクラに登録される
            .then(function (user) {
                //新規登録したユーザーでログイン
                ncmb.User.login(user)
                    .then(function (user) {
                        alert("新規登録とログイン成功");
                        users.set('displayName',displayname)
                            .set('iconUrl',items[randomIconNo])
                            .set('mailAddress',username)
                            .set('password',password)
                            .set('selfComment',selfComment)
                            .save().then(function(result){
                                document.location.href = 'choice.html';
                            })
                    })
                    .catch(function (error) {
                        alert("ログイン失敗！次のエラー発生: " + error);
                    });
            })
            .catch(function (error) {
                console.log(error);               
                alert("新規登録に失敗しました");
                console.log(error);
            })
    }
}