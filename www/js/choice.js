// This is a JavaScript file
let select


$('.select-btn').click(function (e) {
    // クリック要素内のテキストを取得
    $('.select-btn').css('border','none');
    select = $(this).find('#select-text').text();
    $(this).css('border','5px solid rgba(77, 166, 255,0.5)');
    $(this).css('border-radius','12px');
    $('#inroom-btn').prop('disabled',false);
    // 入室ボタン押下イベント
    $('#inroom-btn').click(function () {
        // フェードアウト後に遷移
        $(document.body).fadeOut("slow", function () {
            location.href = "main.html?select=" + encodeURIComponent(select);
        });
    });
});

