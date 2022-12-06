
$('#file').on('change', function (e) {
    console.log(document.getElementById('file'));
  var file = e.target.files;

  var fr = new FileReader();
  fr.onload= function(fr) {
    var url = fr.result;

    // Imageオブジェクトをつくり
    var img = new Image();
    // srcにurlを指定する
    img.src = url;
    // そのままだとでかすぎるのでサイズ調整して
    img.height = 200;
    // bodyに追加する
    document.body.appendChild(img);
  };
  fr.readAsDataURL(file);
});