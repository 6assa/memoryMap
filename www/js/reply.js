var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);
// NCMB.Objectのサブクラスを生成
var post = ncmb.DataStore("post");



$('#addBtn').click(function () {
    $(this).find('.img-input').click();
});

// function count_up(obj) {
//     var element = document.getElementById('inputlength');
//     var area = document.getElementById('area');
//     element.innerHTML = obj.value.length + "/300";

//     if (obj.value.length > 300) {
//         element.style.color = 'red';
//     } else {
//         element.style.color = 'grey';
//     }
// }



$(window).on('load', function () {
    var Reply = ncmb.DataStore("replymessage");
    var users = ncmb.DataStore("users");

    // localStorageからpostId持ってくる
    var postId = localStorage.getItem("postId");
    console.log("ちぇっく");
    console.log(postId);

    // DBのpostIdに対応する情報を取得
    post.equalTo("postId", Number(postId))
        .fetch()
        .then(result => {
            console.log('res:' + JSON.stringify(result))
            // 日時フォーマット
            formatedDate = dateformat(new Date(result['postedDate']['iso']));
            var icon = result['roleObjectId'];
            var displayName = result['displayName'];
            var message = result['postedMessage'];
            var content = document.getElementById('follow-content');
            var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + icon + '" width="50px" height="50px" ></div><div class="board-text"><p id="text"><span>' + displayName + '</span><br><span>' + message + '</span></p><div class="reaction"><div class="image"><i class="fa-regular fa-image"></i><input type="hidden" id="img-postid" value=' + result['photo'] + '></div></div></div><div class="post-time"><p class="time">' + formatedDate + '</p></div></div>'
            content.insertAdjacentHTML('beforeend', add_code);
        })
        .catch(function (err) {
            console.log(err);
        });

    var content_r = document.getElementById('reply-content');
    Reply.equalTo('replySourceId', localStorage.getItem('postId')).fetchAll().then(results => {

        $.each(results, function (index, result) {
            users.equalTo('mailAddress', result['userName']).fetch().then(res => {

                formatedDate = dateformat(new Date(result['replyedDate']['iso']));
                if (result['replyPhoto'].length == 0) {
                    var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + res['iconUrl'] + '" width="50px" height="50px" ></div><div class="board-text"><p id="text"><span>' + result['displayName'] + '</span><br><span>' + result['replyMessage'] + '</span></p><div class="reaction"></div></div><div class="post-time"><p class="time">' + formatedDate + '</p></div></div>'
                } else {
                    var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + res['iconUrl'] + '" width="50px" height="50px" ></div><div class="board-text"><p id="text"><span>' + result['displayName'] + '</span><br><span>' + result['replyMessage'] + '</span></p><div class="reaction"><div class="image"><i class="fa-regular fa-image"></i><input type="hidden" id="img-postid" value=' + result['replyPhoto'] + '></div></div></div><div class="post-time"><p class="time">' + formatedDate + '</p></div></div>'

                }
                content_r.insertAdjacentHTML('beforeend', add_code);
            })

        })
    });
});

function dateformat(source_date) {

    // 日時フォーマット（YYYY年MM月dd日 hh:mm）
    let formated_date = source_date.getFullYear() + '/' + source_date.getMonth() + '/' + source_date.getDate() + ' ' + source_date.getHours() + ':' + source_date.getMinutes();

    return formated_date
}

// 返信ボタン押下
function onReplyBtn() {
    // 投稿の入力文字取得
    var area = $("#area").val();

    // 未入力チェック
    if (!area) {
        alert("文字が入力されていません");
        return false;
    }

    // 投稿の画像取得（後に回す）
    var photo = document.getElementById("preview");

    // DB
    var ReplyMessage = ncmb.DataStore("replymessage");
    var replymessage = new ReplyMessage();

    // ログイン中のユーザ情報を取得
    var currentUser = ncmb.User.getCurrentUser();
    var mail = currentUser.get("userName");
    var name = currentUser.get("displayName");

    //var category = localStorage.getItem('room');

    // 日付取得
    var date = new Date();
    console.log(date);

    // ユーザの画像取得
    var item_image = [];
    $('.previewImage').each(function () {
        img_src = $(this).attr('src');
        item_image.push(imgUpload(img_src));
        console.log($(this).attr('id') + ':' + item_image)
    })


    // 画像アップロード用スクリプト
    function imgUpload(imageData) {
        // ncmbに画像をアップロード
        var fileName = makeUUID() + ".jpg";
        var fileData = toBlob(imageData, "image/jpeg");
        ncmb.File.upload(fileName, fileData);
        return fileName;
    }

    // Blob作成
    function toBlob(base64, mime_type) {
        var bin = atob(base64.replace(/^.*,/, ''));
        var buffer = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
        }

        try {
            var blob = new Blob([buffer.buffer], {
                type: mime_type
            });
        } catch (e) {
            return false;
        }
        return blob;
    }

    //UUID生成
    function makeUUID() {
        var d = +new Date();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                return (c == 'X' ? r : (r & 0x3 | 0x8)).toString(16);

            });
    }

    // DBに登録
    var postId = localStorage.getItem("postId");
    replymessage.set('displayName', name)
        .set('replyedDate', date)
        .set('replyMessage', area)
        .set('replyPhoto', item_image)
        .set('userName', mail)
        .set('replySourceId', postId)
        .save()
        .then(function (result) {
            //ここに処理書く
            console.log('動いてる');
            window.alert('返信されました');
            location.href = 'main.html';
        })
        .catch(function (err) {
            console.log(err);
        });
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

