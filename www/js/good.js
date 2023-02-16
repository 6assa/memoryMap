// いいね機能
var appKey = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);


// カレントユーザー情報の取得
var currentUser = ncmb.User.getCurrentUser();
// カレントユーザのユーザID
var loginUserName = currentUser.userName;

var Post = ncmb.DataStore('post');

var Good = ncmb.DataStore('good');



$(document).on('click', '.LikesIcon', function () {
    let $btn = $(this);
    var likePost = $(this).find('#like-postid').val();
    var likeCnt = $(this).find('#good-cnt');
    // Likeボタンがonクラス持っていたら
    if ($btn.hasClass('on')) {
        $btn.removeClass('on');

        // 白抜きアイコンに戻す
        $btn.children("i").attr('class', 'far fa-heart LikesIcon-fa-heart');
        var good = new Good();
        var post = new Post();
        Good.equalTo('goodingUserName', loginUserName)
            .equalTo('postId', Number(likePost)).fetch()
            .then(function (result) {
                console.log(JSON.stringify(result));
                result.delete();
            })

        Post.equalTo('postId', Number(likePost)).fetch().then(function (rest) {

            if(rest.goodCount-1<=0){
                rest.set('goodCount', 0).update();
            }else{
                rest.set('goodCount', rest.goodCount - 1).update();
            }
            likeCnt.text(rest.goodCount)
        })
    } else {
        $btn.addClass('on');
        //   アイコンをアニメーションを作動させながら変更
        $btn.children("i").attr('class', 'fas fa-heart LikesIcon-fa-heart heart');
        var good = new Good();


        Post.equalTo('postId', Number(likePost)).fetch()
            .then(function (rest) {
                good.set('goodingUserName', loginUserName)
                    .set('postId', Number(likePost))
                    .save()
                    .then(function (result) {

                    })
                console.log(JSON.stringify(rest));
                rest.set('goodCount', rest.goodCount + 1).update();
                likeCnt.text(rest.goodCount)
            })
    }
})