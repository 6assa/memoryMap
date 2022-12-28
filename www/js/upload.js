var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);

function onUploadBtn() {
    var text = document.getElementById("area");
    var photo = document.getElementById("preview");
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


        var file;
        var url;

        function loadImage(obj) {

            for (i = 0; i < obj.files.length; i++) {
                // 画像ファイルを取得・プレビュー表示
                file = obj.files[i];
                var fileReader = new FileReader();
                fileReader.onload = (function(e) {
                    document.getElementById('preview').innerHTML += "<img src=" + e.target.result + ">";
                });
                fileReader.readAsDataURL(file);
            }
            // スクロール初期位置指定
            document.getElementById('preview').scrollLeft = 0;
        };

        /**
         * ⇩写真挿入ボタン写真削除ボタン⇩
         * 写真が入っているときはimg/photoDelete.svg
         * 写真が入っていないときはimg/photoUpload.svg
         * ⇩写真を挿入したいエリア⇩
         * upload.htmlのclass="photo"
         */