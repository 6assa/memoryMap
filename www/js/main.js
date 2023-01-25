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
    var arr = [];
    post.fetchAll()
        // ニフクラからデータを取得
        // .then(function (results) {
            //  console.log("取得成功:" + JSON.stringify(results));
        //     var tempArray = [];

        //     // $.each(results, function (cnt, value_data) {
        //     //     image = getUserIcon(value_data);
        //     //     //arr.push(getUserIcon(value_data));
        //     //     console.log("success" + image.);
        //     //     results.push(image);
        //     //     arr.push(results);
        //     // console.log(arr);
        //     return results;
        // })
        // .catch(function (error) {
        //     console.log("取得失敗:" + JSON.stringify(error))
        // })
        // フォローの投稿を表示
        .then(function (result) {
             console.log("取得成功:" + JSON.stringify(result));
            $.each(result, function (cnt, value_data) {
                var object = result[cnt];
                var content = document.getElementById('follow-content');
                var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count +'" src="img/good.png" width="50px" height="50px" /></div><div class="board-text"><p id="text"><span>' + object.displayName + '</span><br><span>' + object.postedMessage + '</span></p><div class="reaction"><div class="post-img"><img src="img/share.png"></div><input type="checkbox" class="like" id="like"><label for="like"><svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></label></div></div><div class="post-time"><p class="time">' + object.postedDate + '</p></div></div>'
                content.insertAdjacentHTML('beforeend', add_code);
                image[cnt] = "userIcon.svg";
                console.log(cnt);
                count = cnt;
            });
            return arr
        })
        // オープンの投稿を表示
        .then(function (arr) {
            $.each(arr, function (cnt, value_data) {
                var content = document.getElementById('open-content');
                var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" src="' + value_data[0] + '" width="50px" height="50px" ></div><div class="board-text"><p id="text"><span>' + value_data[1] + '</span><br><span>' + value_data[2] + '</span></p><div class="post-img"><img src="img/share.png"><img src="img/good.png"></div></div><div class="post-time"><p class="time">' + value_data[3] + '</p></div></div>'
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

    //ボタンクリックでトップへ戻る
    btn.on('click', function () {
        $('body,html').animate({
            scrollTop: 0
        });
    });
});

// ファイルストアから画像を取得する
async function getUserIcon(value_data) {
    //var fileName = objectId + '.svg';
    var fileName = 'userIcon.svg';
    downloadImage(fileName);
    reader.onload = function (e) {
        var dataUrl = reader.result;
        // 一次元配列に格納
        tempArray = [dataUrl, value_data.displayName, value_data.postedMessage, value_data.postedDate];
        //console.log("checlk:" + tempArray);
        // 二次元配列に格納
        //arr.push(tempArray);
        console.log("dataUrl:" + dataUrl);
        return dataUrl;
    }
};

// 画像を配置する
function setImage(cnt) {
    reader.onload = function (e) {
        var dataUrl = reader.result;
        console.log(dataUrl);
        document.getElementById("image" + cnt).src = dataUrl;
    }
}

// 画像を読み込む
function downloadImage() {
    // ダウンロード（データ形式をblobを指定）
    ncmb.File.download("userIcon.svg", "blob")
        .then(function (blob) {
            // ファイルリーダーにデータを渡す
            reader.readAsDataURL(blob);
        })
        .catch(function (err) {
            console.error(err);
        })
    //await wait(0.1);
}

// サムネイル画像を上から順に表示する
function setImg(cnt) {
    downloadImage();
    // await wait(0.1);
    setImage(cnt);
    // await wait(1.5);
}