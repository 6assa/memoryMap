// いいね機能
$(document).on('click','.LikesIcon', function() {
    let $btn = $(this);
    // Likeボタンがonクラス持っていたら
    if ($btn.hasClass('on')) {
      $btn.removeClass('on');
      // 白抜きアイコンに戻す
      $btn.children("i").attr('class', 'far fa-heart LikesIcon-fa-heart');
    } else {
      $btn.addClass('on');
    //   アイコンをアニメーションを作動させながら変更
      $btn.children("i").attr('class', 'fas fa-heart LikesIcon-fa-heart heart');
    }
  })