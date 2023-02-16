var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);
let category = localStorage.getItem('room');

// NCMB.Objectのサブクラスを生成
// フォロー状態
var follow = ncmb.DataStore("follow");

// いいね
var Good = ncmb.DataStore('good');

// ファイルストア読み取り用インスタンス生成
var reader = new FileReader();
var image = [];
var count = 0;
var followingArray = [];

function resetBoard() {
    var board = document.getElementById('post-content');

    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}


$(window).on('load', async function () {
    follow.fetchAll()
        // フォロー中のユーザの投稿を取得
        .then(function (result) {
            // カレントユーザー情報の取得
            var currentUser = ncmb.User.getCurrentUser();
            var userName = currentUser.userName;

            $.each(result, function (cnt, value_data) {
                var object = result[cnt];
                if (object.followingUserName == userName) {
                    followingArray.push(object.userName);
                }
            });

        })
        .then(function () {
            resetBoard();
            openViewing();
        })
        // フォローの投稿を選択した状態にする
        .then(function () {
            $('#post-content').show();
        });
});

function followViewing() {
    // フォロー中の投稿
    var postFollow = ncmb.DataStore("post").equalTo("category", category).order("postedDate", true).fetchAll();

    // フォローの投稿を表示
    Good.equalTo('goodingUserName', loginUserName).fetchAll().then(function (results) {
        // 自分がいいねしている投稿のリスト作成
        var likingPost = [];
        $.each(results, function (cnt, res) {
            likingPost.push(res.postId);
        })
        postFollow.then(function (result) {

            $.each(result, function (cnt, value_data) {
                // 投稿を1件ずつ表示
                var object = result[cnt];
                var formatedDate = dateFormat(new Date(object.postedDate["iso"]));
                // フォロー確認
                if ($.inArray(object.userName, followingArray) != -1 || loginUserName == object.userName) {
                    var content = document.getElementById('post-content');
                    // いいね確認
                    if ($.inArray(object.postId, likingPost) != -1) {

                        // いいねした投稿
                        if (object.photo.length == 0) {
                            // 画像なし
                            var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + object.roleObjectId + '"width="50px" height="50px" /><input type="hidden" id="userId" value=' + object.userName + '></div><div class="board-text"><div id="text">' + object.displayName + '<div class="post-time"><p class="time">' + formatedDate + '</p></div></div><div>' + object.postedMessage + '</div><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"><input type="hidden" id="rep_src" value=' + object.postId + '></div><div class="LikesIcon on"><i class="fas fa-heart LikesIcon-fa-heart heart"></i><span id="good-cnt">' + object.goodCount + '</span><input type="hidden" id="like-postid" value=' + object.postId + '></div></div></div></div>'
                        } else {
                            // 画像あり
                            var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + object.roleObjectId + '"width="50px" height="50px" /><input type="hidden" id="userId" value=' + object.userName + '></div><div class="board-text"><div id="text">' + object.displayName + '<div class="post-time"><p class="time">' + formatedDate + '</p></div></div><div>' + object.postedMessage + '</div><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"><input type="hidden" id="rep_src" value=' + object.postId + '></div><div class="LikesIcon on"><i class="fas fa-heart LikesIcon-fa-heart heart"></i><span id="good-cnt">' + object.goodCount + '</span><input type="hidden" id="like-postid" value=' + object.postId + '></div><div class="image"><i class="fa-regular fa-image"></i><input type="hidden" id="img-postid" value=' + object.photo + '></div></div></div></div>'
                        }
                    } else {

                        // いいねしていない投稿
                        if (object.photo.length == 0) {
                            // 画像なし
                            var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + object.roleObjectId + '"width="50px" height="50px" /><input type="hidden" id="userId" value=' + object.userName + '></div><div class="board-text"><div id="text">' + object.displayName + '<div class="post-time"><p class="time">' + formatedDate + '</p></div></div><div>' + object.postedMessage + '</div><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"><input type="hidden" id="rep_src" value=' + object.postId + '></div><div class="LikesIcon"><i class="far fa-heart LikesIcon-fa-heart"></i><span id="good-cnt">' + object.goodCount + '</span><input type="hidden" id="like-postid" value=' + object.postId + '></div></div></div></div>'
                        } else {
                            // 画像あり
                            var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + object.roleObjectId + '"width="50px" height="50px" /><input type="hidden" id="userId" value=' + object.userName + '></div><div class="board-text"><div id="text">' + object.displayName + '<div class="post-time"><p class="time">' + formatedDate + '</p></div></div><div>' + object.postedMessage + '</div><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"><input type="hidden" id="rep_src" value=' + object.postId + '></div><div class="LikesIcon"><i class="far fa-heart LikesIcon-fa-heart"></i><span id="good-cnt">' + object.goodCount + '</span><input type="hidden" id="like-postid" value=' + object.postId + '></div><div class="image"><i class="fa-regular fa-image"></i><input type="hidden" id="img-postid" value=' + object.photo + '></div></div></div></div>'
                        }
                    }
                    content.insertAdjacentHTML('beforeend', add_code);
                };
            });
            return result;
        })
    })
}

function openViewing() {
    // 全投稿
    var postOpen = ncmb.DataStore("post").equalTo("category", category).order("postedDate", true).fetchAll();

    // オープンの投稿を表示
    Good.equalTo('goodingUserName', loginUserName).fetchAll().then(function (results) {
        // 自分がいいねしている投稿のリスト作成
        var likingPost = [];
        $.each(results, function (cnt, res) {
            likingPost.push(res.postId);
        })
        postOpen.then(function (result) {
            $.each(result, function (cnt, value_data) {
                // 投稿を1件ずつ表示
                var object = result[cnt];
                var formatedDate = dateFormat(new Date(object.postedDate["iso"]));
                var content = document.getElementById('post-content');
                // いいね確認
                if ($.inArray(object.postId, likingPost) != -1) {

                    // いいねした投稿
                    if (object.photo.length == 0) {
                        // 画像なし
                        var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + object.roleObjectId + '"width="50px" height="50px" /><input type="hidden" id="userId" value=' + object.userName + '></div><div class="board-text"><div id="text">' + object.displayName + '<div class="post-time"><p class="time">' + formatedDate + '</p></div></div><div>' + object.postedMessage + '</div><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"><input type="hidden" id="rep_src" value=' + object.postId + '></div><div class="LikesIcon on"><i class="fas fa-heart LikesIcon-fa-heart heart"></i><span id="good-cnt">' + object.goodCount + '</span><input type="hidden" id="like-postid" value=' + object.postId + '></div></div></div></div>'
                    } else {
                        // 画像あり
                        var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + object.roleObjectId + '"width="50px" height="50px" /><input type="hidden" id="userId" value=' + object.userName + '></div><div class="board-text"><div id="text">' + object.displayName + '<div class="post-time"><p class="time">' + formatedDate + '</p></div></div><div>' + object.postedMessage + '</div><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"><input type="hidden" id="rep_src" value=' + object.postId + '></div><div class="LikesIcon on"><i class="fas fa-heart LikesIcon-fa-heart heart"></i><span id="good-cnt">' + object.goodCount + '</span><input type="hidden" id="like-postid" value=' + object.postId + '></div><div class="image"><i class="fa-regular fa-image"></i><input type="hidden" id="img-postid" value=' + object.photo + '></div></div></div></div>'
                    }
                } else {

                    // いいねしていない投稿
                    if (object.photo.length == 0) {
                        // 画像なし
                        var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + object.roleObjectId + '"width="50px" height="50px" /><input type="hidden" id="userId" value=' + object.userName + '></div><div class="board-text"><div id="text">' + object.displayName + '<div class="post-time"><p class="time">' + formatedDate + '</p></div></div><div>' + object.postedMessage + '</div><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"><input type="hidden" id="rep_src" value=' + object.postId + '></div><div class="LikesIcon"><i class="far fa-heart LikesIcon-fa-heart"></i><span id="good-cnt">' + object.goodCount + '</span><input type="hidden" id="like-postid" value=' + object.postId + '></div></div></div></div>'
                    } else {
                        // 画像あり
                        var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + object.roleObjectId + '"width="50px" height="50px" /><input type="hidden" id="userId" value=' + object.userName + '></div><div class="board-text"><div id="text">' + object.displayName + '<div class="post-time"><p class="time">' + formatedDate + '</p></div></div><div>' + object.postedMessage + '</div><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"><input type="hidden" id="rep_src" value=' + object.postId + '></div><div class="LikesIcon"><i class="far fa-heart LikesIcon-fa-heart"></i><span id="good-cnt">' + object.goodCount + '</span><input type="hidden" id="like-postid" value=' + object.postId + '></div><div class="image"><i class="fa-regular fa-image"></i><input type="hidden" id="img-postid" value=' + object.photo + '></div></div></div></div>'
                    }
                }
                content.insertAdjacentHTML('beforeend', add_code);
            });
        });
    })
}


function dateFormat(postedDate) {
    // 日時フォーマット
    var formated_date = postedDate.getFullYear() + "/" + postedDate.getMonth() + "/" + postedDate.getDate() + " " + postedDate.getHours() + ":" + (postedDate.getMinutes() < 10 ? '0' : '') + postedDate.getMinutes();
    return formated_date;
};

// タブ押下による投稿の表示・非表示
$(
    $(document).on('click', 'input[name=tab_item]', function () {
        if (document.getElementsByName('tab_item')[0].checked) {
            resetBoard();
            openViewing();
        } else {
            resetBoard();
            followViewing();
        }
    })
)

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

    $(document).on("click", ".post-img", function () {

        // postIdを取得、ローカルストレージに保存
        var rep = $(this).find('#rep_src').val();
        localStorage.setItem('postId', rep);
        document.location.href = 'reply.html';
    });
});

