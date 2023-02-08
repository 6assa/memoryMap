// コミュニティ選択機能

// 選択した部屋名
let select

// 選択ボタン押下イベント
$('.select-btn').click(function (e) {

    
    // 選択ボタン初期化
    $('.select-btn').removeClass('unselected-btn');

    // 選択対象ではないボタンを縮小
    $('.select-btn').not(this).addClass('unselected-btn');

    // クリック要素内のテキストを取得
    select = $(this).find('#select-text').text();

    // 選択した部屋名をローカルストレージに保存
    localStorage.setItem('room', select);

    // 入室ボタン活性化
    $('#inroom-btn').prop('disabled', false);

    // 入室ボタン押下イベント
    $('#inroom-btn').click(function () {
        // フェードアウト後に遷移
        $(document.body).fadeOut("slow", function () {
            location.href = "main.html";
        });
    });
});

