//渲染

(function($,root){
    
    var $scope = $(document.body);
    function renderInfo(info){
        var html = '<div class="song_name">'+info.song +'</div>'+
    '<div class="singer_name">'+ info.singer +'</div>'+
    '<div class="album_name">'+ info.album +'</div>'
        $scope.find('.song_info').html(html)
    }

    function renderImg(data){
         var img = new Image()
         var src = img.src = data
         img.onload = function() {
             root.blurImg(img,$scope)
             $scope.find('.img').attr('src',src)    
         }
    }

    function renderLike(isLike){
        if(isLike){
            $scope.find('.like_btn').addClass('liking')
        }else{
             $scope.find('.like_btn').removeClass('liking')
        }
    }
    root.render = function (data){
        renderInfo(data)
        renderImg(data.image)
        renderLike(data.isLike)
    }

})(window.Zepto,window.player || (window.player={}))