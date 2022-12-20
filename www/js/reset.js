var appKey    = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);
//var currentLoginUser; //現在ログイン中ユーザー

function onResetBtn(){
    var mail_address = $("#mail_address").val();
    var ck_secret_pass = $("#ck_secret_pass").val();
    var pasnew_password = $("#new_password").val();
    var ck_new_password = $("#ck_new_password").val();
    var mailcheck = true;
    var secret_pass_flg = true;
    var pass_flg = true;

    //mailaddressが被ってないかチェック
    ncmb.User.equalTo("userName", mail_address)
        .fetchAll()
        .then(function (results) {
            mailcheck = true;
        })
        .catch(function (error) {
            mailcheck = false;
        });
    
    // カレントユーザー情報の取得
    var currentUser = ncmb.User.getCurrentUser();
    var secret_pass = currentUser.get("secretPass");
    if (currentUser) {
        console.log("秘密の言葉: " + secret_pass);
    } else {
        console.log("未ログインまたは取得に失敗");
    }

    if (ck_secret_pass != secret_pass) {
        alert("秘密の言葉が一致しません");
        secret_pass_flg = false;
    }

    if (pasnew_password != ck_new_password) {
        alert("パスワードが一致していません");
        pass_flg = false;
    }

    // 凍結
    if (secret_pass_flg && pass_flg) {
        //DB更新
        currentUser
            .set("password ", pasnew_password)
            .update()
            .then(function(obj) {
                //更新成功時
                alert("パスワードを再設定しました");
            })
            .catch(function(error) {
                //更新失敗時
                alert("パスワードの設定に失敗" + error);
        });
    }
}