var appKey    = "7c8339fb5fc404a4498a0fb0165b1984a5debd35f58bd593f5a92dc25435d8db";
var clientKey = "c69493cf90b864392429342ee30634253184f5ea19165840dc4d13b706fa70f5";

var ncmb = new NCMB(appKey, clientKey);
//var currentLoginUser; //現在ログイン中ユーザー

function onLoginBtn(){
    var username = $("#login_mailaddres").val();
    var password = $("#login_password").val();
    // メールアドレスとパスワードでログイン
    ncmb.User.login(username, password)
        .then(function(user) {
            alert("ログイン成功");
            document.location.href='main.html';
            //currentLoginUser = ncmb.User.getCurrentUser();
        })
        .catch(function(error) {
            alert("ログイン失敗！次のエラー発生: " + error);
        });
}