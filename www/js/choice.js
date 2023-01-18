// This is a JavaScript file
let select


$('.select-btn').click(function (e) {
    // クリック要素内のテキストを取得
    select = $(this).find('#select-text').text();
    $('#inroom-btn').prop('disabled',false);
    // 入室ボタン押下イベント
    $('#inroom-btn').click(function () {
        // フェードアウト後に遷移
        $(document.body).fadeOut("slow", function () {
            location.href = "main.html?select=" + encodeURIComponent(select);
        });
    });
});

