var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);

//----------------------------------USER MANAGEMENT-------------------------------------//
//var currentLoginUser; //現在ログイン中ユーザー

function onRegisterBtn() {
    //入力フォームから変数をセット
    //ニフクラの仕組みでusernameにメアドを入れてる
    var username = $("#reg_mailaddres").val();
    var displayname = $("#reg_username").val();
    var obj = document.getElementById("area");
    var idx = obj.selectedIndex;
    var area = obj.options[idx].text;  //ラベルを取得
    var password = $("#reg_password").val();
    var checkpassword = $("#regcheck_password").val();
    var passcheck = true;
    var mailcheck = true;
    var secretpass = $("#secret_pass").val();

    // ユーザネームを未入力の場合
    if(!displayname){ //空文字とnull
        displayname = "none";
    }

    //mailaddressが被ってないかチェック
    ncmb.User.equalTo("userName", username)
        .fetchAll()
        .then(function (results) {
            mailcheck = true;
        })
        .catch(function (error) {
            mailcheck = false;
        });

    //パスワード比較
    if (password != checkpassword) {
        alert("確認パスワードが違います");
        passcheck = false;
    }

    if (passcheck) {
        var user = new ncmb.User();
        user.set("userName", username)
            .set("area", area)
            .set("displayName", displayname)
            .set("password", password)
            .set("secretPass", secretpass)
            .signUpByAccount() //ここでニフクラに登録される
            .then(function (user) {
                //新規登録したユーザーでログイン
                ncmb.User.login(user)
                    .then(function (user) {
                        alert("新規登録とログイン成功");
                        //currentLoginUser = ncmb.User.getCurrentUser();
                        document.location.href = 'login.html';
                    })
                    .catch(function (error) {
                        alert("ログイン失敗！次のエラー発生: " + error);
                    });
            })
            .catch(function (error) {
                if (!username) {
                    alert("メールアドレスが入力されていません");
                } else if (!password) {
                    alert("パスワードが入力されていません");
                } else if (!checkpassword) {
                    alert("秘密の言葉が入力されていません");
                } else if (mailcheck) {
                    alert("このメールアドレスは既に使用されています");
                } else {
                    alert("新規登録に失敗！次のエラー発生：" + error);
                }
            });
    }
}
