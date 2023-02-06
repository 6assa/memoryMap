var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);
let category = localStorage.getItem('room');

// NCMB.Objectのサブクラスを生成
var postFollow = ncmb.DataStore("post").equalTo("category", category).order("postedDate", true).fetchAll();
var postOpen = ncmb.DataStore("post").equalTo("category", category).order("postedDate", true).fetchAll();
var follow = ncmb.DataStore("follow");

// ファイルストア読み取り用インスタンス生成
var reader = new FileReader();
var image = [];
var count = 0;
var followingArray = [];

// function getCurrentUser() {
//     // カレントユーザー情報の取得
//     var currentUser = ncmb.User.getCurrentUser();
//     var userName = currentUser.userName;
//     if (currentUser != null) {
//         console.log("ログイン中のユーザー: " + userName);
//     } else {
//         console.log("未ログインまたは取得に失敗");
//     }
//     return userName;
// }

$(window).on('load', async function () {
    follow.fetchAll()
        // フォロー中のユーザの投稿を取得
        .then(function (result) {
            // カレントユーザー情報の取得
            var currentUser = ncmb.User.getCurrentUser();
            var userName = currentUser.userName;
            if (currentUser != null) {
                console.log("ログイン中のユーザー: " + userName);
            } else {
                console.log("未ログインまたは取得に失敗");
            }

            $.each(result, function (cnt, value_data) {
                var object = result[cnt];
                if (object.userName == userName) {
                    followingArray.push(object.followingUserName);
                }
            });
            console.log(followingArray);
        })
        .then(function () {
            followViewing();
            openViewing();
        })
        // フォローの投稿を選択した状態にする
        .then(function () {
            $('#follow-content').show();
            $('#open-content').hide();
        });
});


function followViewing() {
    // フォローの投稿を表示
    postFollow.then(function (result) {
        console.log("bbbbbbbbbbb");
        console.log("取得成功:" + JSON.stringify(result));
        $.each(result, function (cnt, value_data) {
            var object = result[cnt];
            console.log(object.createDate);
            var formatedDate = dateFormat(new Date(object.createDate));
                if ($.inArray(object.userName, followingArray) || loginUserName == object.userName) {
                    console.log(object.userName);
                        var content = document.getElementById('follow-content');
                        if (object.photo.length == 0) {
                            var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + object.roleObjectId + '"width="50px" height="50px" /><input type="hidden" id="userId" value=' + object.userName + '></div><div class="board-text"><div id="text">' + object.displayName + '<div class="post-time"><p class="time">' + formatedDate + '</p></div></div><div>' + object.postedMessage + '</div><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"><input type="hidden" id="rep_src" value='+object.postId+'></div><div class="LikesIcon"><i class="far fa-heart LikesIcon-fa-heart"></i></div></div></div></div>'
                        } else {
                            var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + object.roleObjectId + '"width="50px" height="50px" /><input type="hidden" id="userId" value=' + object.userName + '></div><div class="board-text"><div id="text">' + object.displayName + '<div class="post-time"><p class="time">' + formatedDate + '</p></div></div><div>' + object.postedMessage + '</div><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"><input type="hidden" id="rep_src" value='+object.postId+'></div><div class="LikesIcon"><i class="far fa-heart LikesIcon-fa-heart"></i></div><div class="image"><i class="fa-regular fa-image"></i><input type="hidden" id="img-postid" value=' + object.photo + '></div></div></div></div>'
                        }
                        content.insertAdjacentHTML('beforeend', add_code);
                
                };
            
        });
        return result;
    })
}

function openViewing() {
    // オープンの投稿を表示
    postOpen.then(function (result) {
        $.each(result, function (cnt, value_data) {
            var object = result[cnt];
            var formatedDate = dateFormat(new Date(object.createDate));
            var content = document.getElementById('open-content');
            if (object.photo.length == 0) {
                var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + object.roleObjectId + '"width="50px" height="50px" /><input type="hidden" id="userId" value=' + object.userName + '></div><div class="board-text"><div id="text">' + object.displayName + '<div class="post-time"><p class="time">' + formatedDate + '</p></div></div><div>' + object.postedMessage + '</div><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"><input type="hidden" id="rep_src" value='+object.postId+'></div><div class="LikesIcon"><i class="far fa-heart LikesIcon-fa-heart"></i></div></div></div></div>'
            } else {
                var add_code = '<div class="board-item"><div class="icon-img"><img class="board-icon" id="image' + count + '" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + object.roleObjectId + '"width="50px" height="50px" /><input type="hidden" id="userId" value=' + object.userName + '></div><div class="board-text"><div id="text">' + object.displayName + '<div class="post-time"><p class="time">' + formatedDate + '</p></div></div><div>' + object.postedMessage + '</div><div class="reaction"><div class="post-img"><img class="reply" src="img/reply.png"><input type="hidden" id="rep_src" value='+object.postId+'></div><div class="LikesIcon"><i class="far fa-heart LikesIcon-fa-heart"></i></div><div class="image"><i class="fa-regular fa-image"></i><input type="hidden" id="img-postid" value=' + object.photo + '></div></div></div></div>'
            }
            content.insertAdjacentHTML('beforeend', add_code);
        });
    });
}

$(document).on('change', '.like', function () {
    $(this).find('#svg').toggleClass('like');
})

function dateFormat(postedDate) {
    var formated_date = postedDate.getFullYear() + "/" + postedDate.getMonth() + "/" + postedDate.getDate() + " " + postedDate.getHours() + ":" + postedDate.getMinutes();
    console.log(formated_date);
    return formated_date;
};

// タブ押下による投稿の表示・非表示
$(
    $(document).on('click', 'input[name=tab_item]', function () {
        if (document.getElementsByName('tab_item')[0].checked) {
            $('#follow-content').fadeIn();
            $('#open-content').hide();
        } else {
            $('#follow-content').hide();
            $('#open-content').fadeIn();
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
        var rep=$(this).find('#rep_src').val();
        console.log(rep);
        localStorage.setItem('postId', rep);
        document.location.href = 'reply.html';
    });
});

