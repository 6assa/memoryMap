// 画像プレビュー機能
$(
    // 画像モーダル表示
    $(document).on('click', '.image', function () {

        // 画像のURLが格納されている配列を取得
        var imgs = $(this).find('#img-postid').val();
        var img_list = imgs.split(',')
        
        // 画像選択エリア
        var thumb = document.getElementById('modal-thumb');

        for (const img of img_list) {
            // 画像選択ボタン組み立て
            var add_thumb = '<li class="thumb-item"><img id="thumb-image" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + img + '" width="60" height="60" alt="" /></li>'
            
            // 画像選択エリアに挿入
            thumb.insertAdjacentHTML('beforeend', add_thumb);
        }

        // 画像プレビューを先頭の画像にする
        $('#image-pre').attr("src","https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/"+img_list[0]);
        $('#image-modal').fadeIn('fast');
    })


)

// プレビュー切り替え
$(document).on('click','.thumb-item',function(){
    var src=$(this).find('#thumb-image').attr("src");
    $('#image-pre').attr("src",src);
})

$(
    // 画像モーダルを閉じる
    $('#image-close').click(function () {
        
        var thumb = document.getElementById('modal-thumb');

        
        while (thumb.firstChild) {
            thumb.removeChild(thumb.firstChild);
        }
        $('#image-modal').fadeOut('fast');
    })
)
