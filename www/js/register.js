// 新規登録画面のパスワード比較

        function check(){
            if(document.getElementById('password').value != document.getElementById('check-password').value){
                alert("パスワードが違います");
            }else{
                alert("登録が完了しました。ログイン画面に遷移します。");
                location.href = 'login.html';
            }
        }