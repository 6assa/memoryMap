var appKey    = "7c8339fb5fc404a4498a0fb0165b1984a5debd35f58bd593f5a92dc25435d8db";
var clientKey = "c69493cf90b864392429342ee30634253184f5ea19165840dc4d13b706fa70f5";

var ncmb = new NCMB(appKey, clientKey);

//----------------------------------USER MANAGEMENT-------------------------------------//
var currentLoginUser; //現在ログイン中ユーザー

function onRegisterBtn(){
    //入力フォームから変数をセット
    var username = $("#reg_username").val();
    var mailaddres = $("#reg_mailaddres").val();
    var password = $("#reg_password").val();
    var checkpassword = $("#regcheck_password").val();
    var passcheck = true;

    //パスワード比較
    if(password != checkpassword){
        alert("パスワードが違います");
        passcheck = false;
    }
    
    if (passcheck) {
    var user = new ncmb.User();
    user.set("userName", username)
        .set("mailaddres", mailaddres)
        .set("password", password)
        .signUpByAccount() //ここでニフクラに登録される
        .then(function(reg_user) {
            //新規登録したユーザーでログイン
            ncmb.User.login(reg_user)
                     .then(function(login_user) {
                         alert("新規登録とログイン成功");
                         currentLoginUser = ncmb.User.getCurrentUser();
                         document.location.href='login.html';
                     })
                     .catch(function(error) {
                         alert("ログイン失敗！次のエラー発生: " + error);
                     });
        })
        .catch(function(error) {
            alert("新規登録に失敗！次のエラー発生：" + error);
        });
   }
}
