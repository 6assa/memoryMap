// This is a JavaScript file
    $('.select-btn').click(function(e){
        // クリック要素内のテキストを取得
        let select=$(this).find('#select-text').text();
        // フェードアウト後に遷移
        $(document.body).fadeOut("slow", function(){
            location.href="main.html?select="+encodeURIComponent(select);
        });
        });

