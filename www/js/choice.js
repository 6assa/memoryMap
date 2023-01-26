// This is a JavaScript file
let select


$('.select-btn').click(function (e) {

    // クリック要素内のテキストを取得

    $('.select-btn').removeClass('unselected-btn');
    $('.select-btn').not(this).addClass('unselected-btn');
    select = $(this).find('#select-text').text();
    localStorage.setItem('room', select);
    console.log(localStorage.getItem('room'));
    $('#inroom-btn').prop('disabled', false);
    // 入室ボタン押下イベント
    $('#inroom-btn').click(function () {
        // フェードアウト後に遷移
        $(document.body).fadeOut("slow", function () {
            location.href = "main.html";
        });
    });
});

