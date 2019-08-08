var root = window.player;
var audio = root.audioManager;
var control;
var timer;

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function(data) {
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            bindEvent(data);
            bindTouch(data);
            control = new root.controlIndex(data.length);
            root.pro.renderAllTime(data[0].duration);
        },
        error: function () {
            console.log("error");
        }
    })
}

function bindEvent(data) {
    var index;
    $('body').on('play:change', function(e, index){
        root.render(data[index]);
        audio.getAudio(data[index].audio);
        root.pro.renderAllTime(data[index].duration);
        if(audio.status == 'play'){
            audio.play();
            root.pro.start();
            rotated(0);
        }
        $('.img-wrapper').attr('data-deg',0)
        $('.img-wrapper').css({
            'color': 'red',
            'transform': 'rotateZ('+ 0 +'deg)',
            'transition': 'none'
        })
    })
    $('.prev-btn').on('click', function(){
        index = control.prev();
        $('body').trigger('play:change', index)
        if(audio.status == 'play'){
            root.pro.start(0);
        }else{
            root.pro.update(0);
        }
    })
    $('.next-btn').on('click', function(){
        index = control.next();
        $('body').trigger('play:change', index)
        if(audio.status == 'play'){
            root.pro.start(0);
        }else{
            root.pro.update(0);
        }
    })
    $('.play-btn').on('click', function(){
        console.log(audio.status)
        if(audio.status == 'pause'){
            audio.play();
            root.pro.start();
            var deg = $('.img-wrapper').attr('data-deg')
            rotated(deg);
            
        }else{
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
    })
}

function bindTouch(data){
    var left = $('.pro-bottom').offset().left,
        width = $('.pro-bottom').offset().width;
    $('.slider-pointer').on('touchstart', function(){
        root.pro.stop();

    }).on('touchmove', function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per >= 0 && per <= 1){
            root.pro.update(per);
        }

    }).on('touchend', function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per >= 0 && per <= 1){
            var duration = data[control.index].duration;
            var curTime = per*duration;
            audio.playTo(curTime);
            root.pro.start(per);
        }
    })
}

function rotated(deg) {
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function() {
        deg += 2;
        $('.img-wrapper').attr('data-deg',deg)
        $('.img-wrapper').css({
            'color': 'red',
            'transform': 'rotateZ('+ deg +'deg)',
            'transition': 'all 1s ease-out'
        })
    },200)
}

getData('../mock/data.json');