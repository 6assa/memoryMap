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