// This is a JavaScript file
$(
    $(document).on('click', '.image', function () {
        var imgs = $(this).find('#img-postid').val();
        var img_list = imgs.split(',')
        console.log(img_list);
        var flick = document.getElementById('modal-flick');
        var thumb = document.getElementById('modal-thumb');

        for (const img of img_list) {
            
            var add_thumb = '<li class="thumb-item"><img id="thumb-image" src="https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/' + img + '" width="60" height="60" alt="" /></li>'
            
            thumb.insertAdjacentHTML('beforeend', add_thumb);
        }
        $('#image-pre').attr("src","https://mbaas.api.nifcloud.com/2013-09-01/applications/dzkz4P3WqMDSGgc3/publicFiles/"+img_list[0]);
        $('#image-modal').fadeIn('fast');
    })


)
$(document).on('click','.thumb-item',function(){
    var src=$(this).find('#thumb-image').attr("src");
    $('#image-pre').attr("src",src);
})

$(
    $('#image-close').click(function () {
        
        var thumb = document.getElementById('modal-thumb');

        
        while (thumb.firstChild) {
            thumb.removeChild(thumb.firstChild);
        }
        $('#image-modal').fadeOut('fast');
    })
)
