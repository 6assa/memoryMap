// This is a JavaScript file
// 要素を取得
var input = document.getElementById('file');
// changeイベントでファイルの選択をキャッチ
input.addEventListener('change', function (e) {
  // 処理
  alert('ファイルが選択されました');
});

var input = document.getElementById('file');
input.addEventListener('change', function (e) {
  // コールバック引数のsrcElementに、filesという名前で配列形式でファイルオブジェクトが格納されている
  // 今回は単一ファイルしか選択させないので、0番目に選択したファイルがある
  var file = e.srcElement.files[0];

  // FileReaderを初期化して、
  var fr = new FileReader();
  // ファイルが読み込み終わったあとの処理を書いておく
  fr.addEventListener('load', function() {
    // resultプロパティに読み込んだデータが入ってくる
    var url = fr.result;
    alert(url);
  });
  // 最後にreadAsDataURLメソッドに選択したファイルオブジェクトを渡すと
  // 上記resultプロパティにURL形式でデータが入る
  fr.readAsDataURL(file);
});

var input = document.getElementById('file');
input.addEventListener('change', function (e) {
  var file = e.srcElement.files[0];

  var fr = new FileReader();
  fr.addEventListener('load', function() {
    var url = fr.result;

    // Imageオブジェクトをつくり
    var img = new Image();
    // srcにurlを指定する
    img.src = url;
    // そのままだとでかすぎるのでサイズ調整して
    img.height = 200;
    // bodyに追加する
    document.body.appendChild(img);
  });
  fr.readAsDataURL(file);
});