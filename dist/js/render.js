(function($, root){
    function rederImg(src){
        var img = new Image()
        img.src = src
        img.onload = function(){
            $('.img-wrapper img').attr('src', src);
            root.blurImg(img, $('body'));
        }
    }
    
    function renderInfo(info){
        $('.song-name').text(info.song);
        $('.singer-name').text(info.singer);
        $('.album-name').text(info.album)
    }

    function renderIsLike(like){
        if(like){
            $('.like-btn').addClass('liking')
        }else{
            $('.like-btn').removeClass('liking')
        }
    }

    root.render = data => {
        rederImg(data.image)
        renderInfo(data)
        renderIsLike(data.isLike)
        
    }
}(window.Zepto, window.player || (window.player = {})))