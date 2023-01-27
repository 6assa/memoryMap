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
    // DB
    var Users = ncmb.DataStore("users");

    // カレントユーザー情報の取得
    var currentUser = ncmb.User.getCurrentUser();
    var mail_address = currentUser.get("userName");

    // 器を用意
    var displayName;

    Users.equalTo("mailAddress", mail_address)
        .fetchAll()
        .then(function (result) {
            for (var i = 0; i < result.length; i++) {
                var object = result[i];
            }
            displayName = object.displayName;
            console.log("ck:" + displayName);
            document.getElementById("user_name").innerText = displayName;
            document.getElementById("mail_address").innerText = mail_address;
        })
        .catch(function (err){
            console.log(err);
        });
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
    // データストアを選択
    var Users = ncmb.DataStore("users");

    // ログイン中のユーザのメールアドレスを取得
    var currentUser = ncmb.User.getCurrentUser();
    var mail_address = currentUser.get("userName");

    // 入力したユーザ名を取得
    let getName = document.getElementById("new_name");
    let newName = getName.value;
    var name = String(newName);
    console.log(typeof(name));


    // ユーザ名を更新
    Users.equalTo("mailAddress", mail_address)
        .fetch()
        .then(function (results) {
            results.set('displayName', name).update();
            console.log("成功");
            alert('ユーザ名を変更しました');
            location.href = 'setting.html';
        })
        .catch(function(err){
            console.log(err);
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
    // DBから読み取る
    var currentUser = ncmb.User.getCurrentUser();
    var mail_address = currentUser.get("userName");
    var Notification = ncmb.DataStore('notification');

    // DBの値を入れる器を用意
    var notificationFlg;
    var reply;
    var like;
    var follow;

    // DBからデータ取得
    Notification.equalTo("userName", mail_address)
        .fetchAll()
        .then(function (results) {
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
            }
            console.log("ck:" + object.userName);

            // 取得した値を用意しておいた器に入れる
            notificationFlg = JSON.parse(object.notificationFlg);
            reply = JSON.parse(object.reply);
            like = JSON.parse(object.like);
            follow = JSON.parse(object.follow);

            // DBの項目で初期状態を設定
            document.getElementById("toggle").checked = notificationFlg;
            document.getElementById("toggle1").checked = reply;
            document.getElementById("toggle2").checked = like;
            document.getElementById("toggle3").checked = follow;

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
            } else if (activity_flg == false) {
                // 通知を受け取るのcheckedがfalseなら,他の項目のcheckedをfalseにして非活性にする
                const item = document.getElementsByName("item");
                for (let i = 0; i < item.length; i++) {
                    item[i].checked = false;
                    item[i].setAttribute("disabled", true);
                }
                // 非活性にした後に項目を非表示にする
                invisible.hidden = true;
            }
        })
        .catch(function (err) {
            console.log("エラー:" + err);
        });
}

// 通知画面の通知を受け取るのタグル押下
function all_false() {
    let element = document.getElementById('toggle');
    const flg = element.checked;
    console.log(element.checked);

    var Notification = ncmb.DataStore('notification');
    var currentUser = ncmb.User.getCurrentUser();
    var mail_address = currentUser.get("userName");

    // 要素の非表示を管理するやつ
    const invisible = document.getElementById("invisible");

    if (flg == true) {
        Notification.equalTo('userName', mail_address)
            .fetch()
            .then(function (result) {
                result.set('notificationFlg', 'true').update();
            });

        // 通知を受け取るのcheckedがtrueなら他の項目を活性化
        const item = document.getElementsByName("item");
        for (let i = 0; i < item.length; i++) {
            item[i].removeAttribute("disabled");
        }
        // 要素を表示
        invisible.hidden = false;
    } else if (flg == false) {
        Notification.equalTo('userName', mail_address)
            .fetch()
            .then(function (result) {
                result.set('notificationFlg', 'false').update();
            });
        // 通知を受け取るのcheckedがfalseなら,他の項目のcheckedをfalseにして非活性にする
        const item = document.getElementsByName("item");
        for (let i = 0; i < item.length; i++) {
            item[i].setAttribute("disabled", true);
        }
        // 非活性にした後に項目を非表示にする
        invisible.hidden = true;
    }
}

// 返信のタグル押下
function reply_flg(){
    // 返信のトグルの状態を取得
    let element = document.getElementById('toggle1');
    const flg = element.checked;
    console.log(element.checked);
    console.log("動いてる"); 

    // ログイン中のユーザを取得
    var Notification = ncmb.DataStore('notification');
    var currentUser = ncmb.User.getCurrentUser();
    var mail_address = currentUser.get("userName");

    if (flg == true) {
        Notification.equalTo('userName', mail_address)
            .fetch()
            .then(function (result) {
                result.set('reply', 'true').update();
            });
    } else if (flg == false) {
        Notification.equalTo('userName', mail_address)
            .fetch()
            .then(function (result) {
                result.set('reply', 'false').update();
            });
    }
}

// いいねのタグル押下
function like_flg(){
    // 返信のトグルの状態を取得
    let element = document.getElementById('toggle2');
    const flg = element.checked;
    console.log(element.checked);
    console.log("動いてる"); 

    // ログイン中のユーザを取得
    var Notification = ncmb.DataStore('notification');
    var currentUser = ncmb.User.getCurrentUser();
    var mail_address = currentUser.get("userName");

    if (flg == true) {
        Notification.equalTo('userName', mail_address)
            .fetch()
            .then(function (result) {
                result.set('like', 'true').update();
            });
    } else if (flg == false) {
        Notification.equalTo('userName', mail_address)
            .fetch()
            .then(function (result) {
                result.set('like', 'false').update();
            });
    }
}

// フォローのタグル押下
function follow_flg(){
    // 返信のトグルの状態を取得
    let element = document.getElementById('toggle3');
    const flg = element.checked;
    console.log(element.checked);
    console.log("動いてる");

    // ログイン中のユーザを取得
    var Notification = ncmb.DataStore('notification');
    var currentUser = ncmb.User.getCurrentUser();
    var mail_address = currentUser.get("userName");

    if (flg == true) {
        Notification.equalTo('userName', mail_address)
            .fetch()
            .then(function (result) {
                result.set('follow', 'true').update();
            });
    } else if (flg == false) {
        Notification.equalTo('userName', mail_address)
            .fetch()
            .then(function (result) {
                result.set('follow', 'false').update();
            });
    }
}