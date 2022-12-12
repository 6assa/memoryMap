// この変数にアップロードファイルの情報を格納することにする
var file = null
// この変数にアップロードファイルをデータURI化した情報を格納することにする
var uri  = null

// ファイルアップロード時に呼ばれるイベントハンドラー
function photo(e) {
    file = e.target.files[0]
    var reader = new FileReader()
    reader.onload = function (e) {
        uri = e.target.result
    }
    reader.readAsDataURL(file)
}

