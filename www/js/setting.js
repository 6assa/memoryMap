var appKey    = "7c8339fb5fc404a4498a0fb0165b1984a5debd35f58bd593f5a92dc25435d8db";
var clientKey = "c69493cf90b864392429342ee30634253184f5ea19165840dc4d13b706fa70f5";

var ncmb = new NCMB(appKey, clientKey);

// 設定画面のログアウト押下
function onLogout(){
    var result = window.confirm("ログアウトしますか？");
    console.log(result);
    if(result){
        ncmb.User.logout();
        alert('ログアウトしました');
        location.href = 'login.html';
    }
}