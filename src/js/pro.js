(function($, root){
    var duration, 
        frameID,
        startTime,
        lastPer = 0;
    function renderAllTime(time){
        lastPer = 0;
        duration = time;
        time = formatTime(time);
        $('.all-time').text(time);
    }

    function formatTime(t){
        t = Math.round(t);
        var m = Math.floor(t / 60);
        m = m < 10 ? '0' + m : m
        var s = t % 60;
        s = s < 10 ? '0' + s : s
        return m + ':' + s
    }

    function start(p) {
        lastPer = p === undefined ? lastPer : p;
        startTime = new Date().getTime();

        function frame(){
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (duration * 1000);
            if(per < 1){
                update(per);
                frameID = requestAnimationFrame(frame);
            }else{
                audio.pause();
            }
        }
        frame();
    }

    function update(p) {
        var time = p * duration;
        time = formatTime(time);
        $('.cur-time').text(time);

        var perX = (p - 1) * 100 + '%';
        $('.pro-top').css({
            transform: 'translateX('+ perX +')'
        })
    }

    function stop(){
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (duration * 1000);
        cancelAnimationFrame(frameID)
    }

    root.pro = {
        renderAllTime,
        start,
        stop,
        update
    }
}(window.Zepto, window.player))