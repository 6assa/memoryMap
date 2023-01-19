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
        console.log()
        location.href = 'login.html';
    }
}

// 〈 押下で遷移先画面から設定画面に戻る
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

// ユーザ名の横の＞押下
function change_name() {
    location.href = "change_name.html";
}

// ユーザー名変更画面の現在の名前取得
function now_name() {
    // カレントユーザー情報の取得
    var currentUser = ncmb.User.getCurrentUser();
    var user_name = currentUser.get("displayName");

    if (currentUser) {
        console.log("ユーザ名" + user_name);
        document.getElementById("user_name").innerText = user_name;
    }
}

// ユーザー名変更画面の登録押下
function update_name() {
    // ニフクラでデータストアに定義をしなければならない
    var uesrs = ncmb.DataStore("uesrs");

    var currentUser = ncmb.User.getCurrentUser();
    var objectId = currentUser.get("objectId");
    const text = document.getElementById("new_name");
    const name = text.value;
    console.log(objectId);
    console.log(name);

    uesrs.fetchById(objectId).then(function (results) {
            console.log(JSON.stringify(results));
            results.set("displayName", name);
            console.log("動いてるぞ");
            return uesrs.update();
        })
        .catch(function(err){
           alert(err);
         });
}

// アカウント削除押下
function kill() {
    var result = window.confirm("アカウントを削除します。よろしいですか？");
    console.log(result);
    if (result) {
        const currentUser = ncmb.User.getCurrentUser();
        currentUser.delete();
        alert('アカウントを削除しました');
        location.href = 'login.html';
    }
}

// 設定画面の通知押下
function notification() {
    location.href = 'set_notification.html';
}

// 通知画面に遷移時の処理
function load_boolean() {
    // ↓初期の読み込み 将来的にDBからユーザごとに読み込む
    document.getElementById("toggle").checked = true;
    /**
    document.getElementById("toggle1").checked = true;
    document.getElementById("toggle2").checked = true;
    document.getElementById("toggle3").checked = true;
    */
    let element = document.getElementById('toggle');
    console.log(element.checked);

    // 通知を受け取るのcheckedがtrueなら他の項目を活性化
    let elements = document.getElementById('toggle');
    const activity_flg = elements.checked;
    console.log(activity_flg);
    if (activity_flg) {
        const items = document.getElementsByName("item");
        for (let j = 0; j < items.length; j++) {
            items[j].removeAttribute("disabled");
        }
    }
}

// 通知画面の通知を受け取るのタグル押下
function all_false() {
    let element = document.getElementById('toggle');
    const flg = element.checked;
    console.log(element.checked);

    // 要素の非表示を管理するやつ
    const invisible = document.getElementById("invisible");

    if (flg == true) {
        // 通知を受け取るのcheckedがtrueなら他の項目を活性化
        const item = document.getElementsByName("item");
        for (let i = 0; i < item.length; i++) {
            item[i].removeAttribute("disabled");
        }
        // 要素を表示
        invisible.hidden = false;
    } else if (flg == false) {
        // 通知を受け取るのcheckedがfalseなら,他の項目のcheckedをfalseにして非活性にする
        const item = document.getElementsByName("item");
        for (let i = 0; i < item.length; i++) {
            item[i].checked = false;
            item[i].setAttribute("disabled", true);
        }
        // 非活性にした後に項目を非表示にする
        invisible.hidden = true;
    }
}

// 設定画面のその他押下
function others() {
    location.href = 'others.html';
}