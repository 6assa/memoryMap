var appKey    = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);
//var currentLoginUser; //現在ログイン中ユーザー

function onLoginBtn(){
    var username = $("#login_mailaddres").val();
    var password = $("#login_password").val();
    // メールアドレスとパスワードでログイン
    ncmb.User.login(username, password)
        .then(function(user) {
            alert("ログイン成功");
            document.location.href='choice.html';
            //currentLoginUser = ncmb.User.getCurrentUser();
        })
        .catch(function(error) {
            alert("ログイン失敗！メールアドレスまたはパスワードが違います");
            console.log(error)
        });
}