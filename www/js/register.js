var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);

//var currentLoginUser; //現在ログイン中ユーザー

function onRegisterBtn() {
    //入力フォームから変数をセット
    //ニフクラの仕組みでusernameにメアドを入れてる
    var username = $("#reg_mailaddres").val();
    var displayname = $("#reg_username").val();
    var password = $("#reg_password").val();
    var checkpassword = $("#regcheck_password").val();
    var passcheck = true;
    var badmailcheck = true;
    // var secretpass = $("#secret_pass").val();
    console.log(username);

    // ユーザネームを未入力の場合
    if(!displayname){ //空文字とnull
        displayname = "名無しのごんぞう";
    }

    //mailaddressが被ってないかチェック
    if(badmailcheck){
        ncmb.User.equalTo("userName", username)
            .fetchAll()
            .then(function (results) {
                mailcheck = true;
            })
            .catch(function (error) {
                mailcheck = false;
            });
    }

    //パスワード比較
    if (password != checkpassword) {
        alert("確認パスワードが違います");
        passcheck = false;
    }

    if (passcheck) {
        var user = new ncmb.User();
        user.set("userName", username)
            // .set("area", area)
            .set("displayName", displayname)
            .set("password", password)
            .signUpByAccount() //ここでニフクラに登録される
            .then(function (user) {
                //新規登録したユーザーでログイン
                ncmb.User.login(user)
                    .then(function (user) {
                        alert("新規登録とログイン成功");
                        //currentLoginUser = ncmb.User.getCurrentUser();
                        document.location.href = 'index.html';
                    })
                    .catch(function (error) {
                        alert("ログイン失敗！次のエラー発生: " + error);
                    });
            })
            .catch(function (error) {
                console.log(error);
                if (!username) {
                    alert("新規登録に失敗しました\nメールアドレスが入力されていません");
                } else if(mailcheck) {
                    alert("新規登録に失敗しました\nメールアドレスが既に使用されています");
                } else {
                    alert("新規登録に失敗しました");
                // } else {
                //     alert("新規登録に失敗しました");
                //     console.log(error)
                }
            })
    }

    // ユーザネームを未入力の場合
    if(!displayname){ //空文字とnull
        displayname = "none";
    }
}

// function changeColor(hoge){
//     if( hoge.value == 0 ){
//         hoge.style.color = '';
//     }else{
//         hoge.style.color = 'black';
//     }
// }
