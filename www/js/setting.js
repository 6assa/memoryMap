var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);

// 設定画面のログアウト押下
function onLogout() {
    var result = window.confirm("ログアウトしますか？");
    console.log(result);
    if (result) {
        ncmb.User.logout();
        alert('ログアウトしました');
        location.href = 'login.html';
    }
}

// ←押下で遷移先画面から設定画面に戻る
function back() {
    location.href = 'setting.html';
}

// 設定画面のアカウント押下
function account() {
    location.href = 'account.html';
}

// アカウント画面のユーザ情報表示
function user() {
    // カレントユーザー情報の取得
    var currentUser = ncmb.User.getCurrentUser();
    var mail_address = currentUser.get("userName");
    var user_name = currentUser.get("displayName");
    if (currentUser) {
        console.log("メールアドレス: " + mail_address);
        console.log("ユーザ名: " + user_name);
        document.getElementById("user_name").innerText = user_name;
        document.getElementById("mail_address").innerText = mail_address;
    } else {
        console.log("未ログインまたは取得に失敗");
    }
}

// アカウント削除押下
function kill(){
    var result = window.confirm("アカウントを削除します。よろしいですか？");

    if(result){
    }
}

// 設定画面の通知押下
function notification() {
    location.href = 'setnotification.html';
}

// 設定画面のその他押下
function others() {
    location.href = 'others.html';
}
