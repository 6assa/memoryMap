var appKey    = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);

// NCMB.Objectのサブクラスを生成
var post = ncmb.DataStore("post");

// // クラスの新しいインスタンスを生成
// var post = new post();

post.fetchAll()
    .then(function(results) {
        console.log("取得成功:" + JSON.stringify(results));
        var tempArray = [];
        var arr = [];
        $.each(results, function(cnt, value_data){
            // 一次元配列に格納
            tempArray = ['img/home.svg', value_data.userName, value_data.    postedMessage, value_data.postedDate];

            // 二次元配列に格納
            arr.push(tempArray);
        });
        console.log(arr);
    })
    .catch(function(error) {
        console.log("取得失敗:" + JSON.stringify(error))
    });


// フォローの投稿を配列に定義
var followArray = [
        ['img/home.svg','香島 凌','無給で働きます','12:32'],
        ['img/bell.svg','あさき','長い文字が入力されたぞおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおお','12:50'],
        ['img/usericon.png','ゆあさ','からあげおいしいなー','13:24'],
        ['img/search.svg','ふくい','俺以外まともじゃないな','14:12'],
        ['img/pin.svg','いけの','びじねすびじねす','15:30']
    ];

// オープンの投稿を配列に定義
var openArray = [
        ['img/search.svg','ダミー','ダミーデータです','12:00'],
        ['img/search.svg','ダミー','ダミーデータです','12:00'],
        ['img/search.svg','ダミー','ダミーデータです','12:00'],
        ['img/search.svg','ダミー','ダミーデータです','12:00'],
        ['img/search.svg','ダミー','ダミーデータです','12:00'],
        ['img/home.svg','香島 凌','給料ほしいです','12:32'],
        ['img/bell.svg','あさき','長い文字が入力されたぞおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおお','12:50'],
        ['img/usericon.png','ゆあさ','からあげくんです','13:24'],
        ['img/search.svg','ふくい','だいふくおいしいです','14:12'],
        ['img/pin.svg','いけの','おかねおかね','15:30']
    ];

// フォローの投稿を表示
function followPost() {
    $.each(arr, function(cnt, value_data){
        var content = document.getElementById('follow-content');
        var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" src="' + value_data[0] + '" width="50px" height="50px" ></div><div class="board-text"><p id="text"><span>' + value_data[1] + '</span><br><span>' + value_data[2] + '</span></p><div class="post-img"><img src="img/share.png"><img src="img/good.png"></div></div><div class="post-time"><p class="time">' + value_data[3] + '</p></div></div>'
        content.insertAdjacentHTML('beforeend', add_code);
    });
}

// オープンの投稿を表示
function openPost() {
    $.each(openArray, function(cnt, value_data){
        var content = document.getElementById('open-content');
        var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" src="' + value_data[0] + '" width="50px" height="50px" ></div><div class="board-text"><p id="text"><span>' + value_data[1] + '</span><br><span>' + value_data[2] + '</span></p><div class="post-img"><img src="img/share.png"><img src="img/good.png"></div></div><div class="post-time"><p class="time">' + value_data[3] + '</p></div></div>'
        content.insertAdjacentHTML('beforeend', add_code);
    });
}

function tabs() {
    if (document.getElementsByName('tab_item')[0].checked) {
        $('#follow-content').fadeIn();
        $('#open-content').hide();
    } else {
        $('#follow-content').hide();
        $('#open-content').fadeIn();
    }
}

// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on('load', function () {
    followPost();
    openPost();
    $('#follow-content').show();
    $('#open-content').hide();
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

