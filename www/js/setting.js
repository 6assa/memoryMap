// This is a JavaScript file

// 設定画面のログアウト押下
function onlogout(){
    var result = window.confirm("ログアウトしますか？");

    if(result){
        alert('ログアウトします');
        location.href = 'login.html';
    }
}
