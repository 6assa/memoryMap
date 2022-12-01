// This is a JavaScript file
//ログインボタン押下で作動
button.addEventListener('click', () =>{
  const searchId = document.querySelector('#search-id').value;
  const searchPassword = document.querySelector('#search-password').value;
  findUser(searchId,searchPassword);
});

/*** 登録しているユーザーを検索する */
function findUser(searchId,searchPassword) {
  // 該当データを取得する
  const targetData = 
  userDataList.find((data) => data.id === searchId) &&
  userDataList.find((data) => data.password === searchPassword);
  // 該当データが存在しなかったら、「該当者なし」と表示して終了
  if (targetData == null) {
    searchResult.textContent = 'IDまたはパスワードが違います';
    return;
  }
  
  // 該当データの名前を表示する
  searchResult.textContent = targetData.name + 'がログインしました。';

  //トップ画面へ遷移
  window.open('https://emotopi.com/', '_blank');
}
