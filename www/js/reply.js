var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);
// NCMB.Objectのサブクラスを生成
var post = ncmb.DataStore("post");

// $('#addBtn').click(function () {
//     $(this).find('.img-input').click();
// });

function onUploadBtn() {
    var text = document.getElementById("area");
    var photo = document.getElementById("preview");
}

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
        // フォローの投稿を表示
        console.log('ちぇっく');
        var icon = 'image/home.svg';
        var userName = 'かしま';
        var text = 'aaaaaaaaaaa';
        var date = '16:00';
        var content = document.getElementById('follow-content');
        var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" src="' + icon + '" width="50px" height="50px" ></div><div class="board-text"><p id="text"><span>' + userName + '</span><br><span>' + text + '</span></p><div class="post-img"><img src="img/share.png"><img src="img/good.png"></div></div><div class="post-time"><p class="time">' + date + '</p></div></div>'
        content.insertAdjacentHTML('beforeend', add_code);
});
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