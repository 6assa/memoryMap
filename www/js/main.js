var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);

// NCMB.Objectのサブクラスを生成
var post = ncmb.DataStore("post");

// ファイルストア読み取り用インスタンス生成
var reader = new FileReader();
var image = [];
var count = 0;


$(window).on('load', async function () {
    post.fetchAll()
        // フォローの投稿を表示
        .then(function (result) {
             console.log("取得成功:" + JSON.stringify(result));
            $.each(result, function (cnt, value_data) {
                var object = result[cnt];
                var content = document.getElementById('follow-content');
                var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count +'" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/'+object.roleObjectId+'"width="50px" height="50px" /></div><div class="board-text"><p id="text"><span>' + object.displayName + '</span><br><span>' + object.postedMessage + '</span></p><div class="reaction"><div class="post-img"><img src="img/share.png"></div><div class="LikesIcon"><i class="far fa-heart LikesIcon-fa-heart"></i></div></div></div><div class="post-time"><p class="time">' + object.postedDate + '</p></div></div>'
                content.insertAdjacentHTML('beforeend', add_code);
            });
            return arr
        })
        // オープンの投稿を表示
        .then(function (arr) {
            $.each(arr, function (cnt, value_data) {
                var object = result[cnt];
                var content = document.getElementById('open-content');
                var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count +'" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/'+object.roleObjectId+'"width="50px" height="50px" /></div><div class="board-text"><p id="text"><span>' + object.displayName + '</span><br><span>' + object.postedMessage + '</span></p><div class="reaction"><div class="post-img"><img src="img/share.png"></div><div class="LikesIcon"><i class="far fa-heart LikesIcon-fa-heart"></i></div></div></div><div class="post-time"><p class="time">' + object.postedDate + '</p></div></div>'
                content.insertAdjacentHTML('beforeend', add_code);
            });
        })
        // フォローの投稿を選択した状態にする
        .then(function () {
            $('#follow-content').show();
            $('#open-content').hide();
        });
        setImg(count);
});

$(document).on('change','.like',function(){
    $(this).find('#svg').toggleClass('like');
})

// タブ押下による投稿の表示・非表示
function tabs() {
    if (document.getElementsByName('tab_item')[0].checked) {
        $('#follow-content').fadeIn();
        $('#open-content').hide();
    } else {
        $('#follow-content').hide();
        $('#open-content').fadeIn();
    }
}

$(function () {
    var btn = $('.post-btn');
    var timer;

    $('.board-list').scroll(function () {
        //スクロール開始するとボタンを非表示
        btn.removeClass('is-active');

        //スクロール中はイベントの発火をキャンセルする
        clearTimeout(timer);

        //スクロールが停止して0.2秒後にイベントを発火する
        timer = setTimeout(function () {
            btn.addClass('is-active');
        }, 200);
    });

    $(document).on("click",".board-item",function() {

        //let icon = $(this).find(#image).text();
        let txt = $(this).find('#text').text();
        let time = $(this).find('.time').text();
        console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
        //console.log(icon);
        console.log(txt);
        console.log(time);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
        // localStorageに保存
        localStorage.setItem('txt', txt);
        localStorage.setItem('time', time);
        document.location.href = 'reply.html';
    });
});