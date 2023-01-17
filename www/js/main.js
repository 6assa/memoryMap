var appKey    = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);

// NCMB.Objectのサブクラスを生成
var post = ncmb.DataStore("post");

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

$(window).on('load', function () {
    var arr = [];
    post.fetchAll()
        // ニフクラからデータを取得
        .then(function(results) {
            console.log("取得成功:" + JSON.stringify(results));
            var tempArray = [];
            
            $.each(results, function(cnt, value_data){
                // 一次元配列に格納
                tempArray = ['img/home.svg', value_data.userName, value_data.    postedMessage, value_data.postedDate];

                // 二次元配列に格納
                arr.push(tempArray);
            });
            console.log(arr);
            return arr
        })
        .catch(function(error) {
            console.log("取得失敗:" + JSON.stringify(error))
        })
        // フォローの投稿を表示
        .then(function(arr) {
            $.each(arr, function(cnt, value_data){
                var content = document.getElementById('follow-content');
                var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" src="' + value_data[0] + '" width="50px" height="50px" ></div><div class="board-text"><p id="text"><span>' + value_data[1] + '</span><br><span>' + value_data[2] + '</span></p><div class="post-img"><img src="img/share.png"><img src="img/good.png"></div></div><div class="post-time"><p class="time">' + value_data[3] + '</p></div></div>'
                content.insertAdjacentHTML('beforeend', add_code);
            });
            return arr
        })
        // オープンの投稿を表示
        .then(function(arr) {
            $.each(arr, function(cnt, value_data){
                var content = document.getElementById('open-content');
                var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" src="' + value_data[0] + '" width="50px" height="50px" ></div><div class="board-text"><p id="text"><span>' + value_data[1] + '</span><br><span>' + value_data[2] + '</span></p><div class="post-img"><img src="img/share.png"><img src="img/good.png"></div></div><div class="post-time"><p class="time">' + value_data[3] + '</p></div></div>'
                content.insertAdjacentHTML('beforeend', add_code);
            });
        })
        // フォローの投稿を選択した状態にする
        .then(function() {
            $('#follow-content').show();
            $('#open-content').hide();
        });
});

$(function(){
  var btn = $('.post-btn');
  var timer;

  $('.board-list').scroll(function() {
    //スクロール開始するとボタンを非表示
    btn.removeClass('is-active');
    
    //スクロール中はイベントの発火をキャンセルする
    clearTimeout(timer);
    
    //スクロールが停止して0.2秒後にイベントを発火する
    timer = setTimeout(function() {
      btn.addClass('is-active');
    }, 200);
  });

  //ボタンクリックでトップへ戻る
  btn.on('click',function () {
    $('body,html').animate({
      scrollTop: 0
    });
  });
});