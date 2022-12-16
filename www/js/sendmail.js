var appKey    = "e8cc3024cb19c66f9cdfd61faabd73ff97ee0bf85377ff332e9dac1d8752b8d7";
var clientKey = "05557971c5c7770f388a7c460cdaa0362d55ab58b08ac0e27ee8abcc86c22aaa";

var ncmb = new NCMB(appKey, clientKey);

function send(){
    var mailaddres = $("#fix_mailaddres").val();
    ncmb.User.requestPasswordReset(mailaddres)
    alert("ねみーよな");
    alert("確認メールを送信しました。");

    // ncmb.User.requestPasswordReset(mailaddres)
    // .then(function(user){
    //     alert("確認メールを送信しました。")
    //     document.location.href = 'login.html';
    // })
    // .catch(function(err){
    //     alert("メールを送信できませんでした。")
    // })
}
    
    //         .then(function(data){
    //             alert("確認メールを送信しました。")
    //             document.location.href = 'login.html';
    //         

    // ncmb.User.equalTo("userName", mailaddres)
    //     .then(function(user){
    //         ncmb.User.requestPasswordReset("mailaddres")
    //         .then(function(data){
    //             alert("確認メールを送信しました。")
    //             document.location.href = 'login.html';
    //         })
    //         .catch(function(err){
    //             alert("メールを送信できませんでした。")
    //      })
    //      .catch(function(err){
    //         alert("該当するメールアドレスが見つかりませんでした。")
    //      })
    //     }