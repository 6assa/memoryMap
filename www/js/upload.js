var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);

$('#addBtn').click(function () {
    $(this).find('.img-input').click();
});

function onUploadBtn() {
    // 投稿の入力文字取得
    var text = document.getElementById("area");
    var texts = text.value;
    console.log(texts);

    if (texts === "") {
        alert("文字が入力されていません");
        return false;
    }

    // 投稿の画像取得（後に回す）
    var list = [];
    // 名前変更しなきゃダメ
    var random_name = Math.random().toString(32).substring(2);
    var photoname = random_name + ".svg";
    var imageData = '/img/home.svg';
    list.push(imageData);
    console.log(list);

    const blob = new Blob(list, {
        type: 'image/svg+xml'
    });
    console.log(blob);

    // TODO
    ncmb.File.upload(photoname, blob)
        .then(function (res) {
            // アップロード後処理
            console.log('表示できた');
        })
        .catch(function (err) {
            console.log("エラー" + err);
        });

    // DB
    var Post = ncmb.DataStore("post");
    var post = new Post();

    // ログイン中のユーザ情報を取得
    var currentUser = ncmb.User.getCurrentUser();
    var mail = currentUser.get("userName");
    var name = currentUser.get("displayName");

    var category = localStorage.getItem('room');

    // 日付取得
    var date = new Date();
    console.log(date);

    // ユーザの画像取得
    // TODO

    // DBに登録

    post.set('category', category)
        .set('displayName', name)
        .set('postedDate', date)
        .set('postedMessage', texts)
        .set('userName', mail)
        .save()
        .then(function (result) {
            //ここに処理書く
            console.log('動いてる');
            location.href = 'main.html';
        })
        .catch(function (err) {
            console.log(err);
        });
}

function count_up(obj) {
    var element = document.getElementById('inputlength');
    var area = document.getElementById('area');
    element.innerHTML = obj.value.length + "/300";

    if (obj.value.length > 300) {
        element.style.color = 'red';
    } else {
        element.style.color = 'grey';
    }
}

function disp() {

    // 「OK」時の処理開始 ＋ 確認ダイアログの表示
    if (window.confirm('投稿しますか？')) {

        location.href = "main.html"; // example_confirm.html へジャンプ

    }
    // 「OK」時の処理終了

    // 「キャンセル」時の処理開始
    else {

        window.alert('キャンセルされました'); // 警告ダイアログを表示

    }
    // 「キャンセル」時の処理終了

}


var files = new Array();

function imgPreView(event, num) {
    var file = event.target.files[0];
    var reader = new FileReader();

    var preview = document.getElementById("preview" + num);
    var previewImg = document.getElementById("previewImage" + num);



    if (previewImg != null) {
        preview.removeChild(previewImg);
    }

    reader.onload = function (event) {
        var img = document.createElement("img");
        img.setAttribute("src", reader.result);
        img.setAttribute("id", "previewImage" + num);
        img.setAttribute("class", "previewImage");
        preview.appendChild(img);

    };

    document.getElementById("btn" + num).innerHTML = '<img class="addBtn" id="remBtn"' + num + ' src="img/photoDelete.svg" onclick="removePreview(' + num + ')">';








    reader.readAsDataURL(file);
    files.push(document.getElementById("previewImage" + num).getAttribute("src"));
    console.log(files);
}

function removePreview(num) {
    var preview = document.getElementById("preview" + num);
    var previewImg = document.getElementById("previewImage" + num);
    preview.removeChild(previewImg);
    document.getElementById("btn" + num).innerHTML = '<label id="lebel' + num + '"><img class="addBtn" id="addBtn' + num + '" src="img/photoUpload.svg"><input id="input' + num + '" class="img-input" onchange="imgPreView(event,' + num + ')" type="file"></label>';
    delete files[num - 1];
    console.log(files);
}

/**
 * ⇩写真挿入ボタン写真削除ボタン⇩
 * 写真が入っているときはimg/photoDelete.svg
 * 写真が入っていないときはimg/photoUpload.svg
 * ⇩写真を挿入したいエリア⇩
 * upload.htmlのclass="photo"
 * 投稿ボタン現状何も動作しないです
 */