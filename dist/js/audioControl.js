(function($, root){
    function AudioManager(){
        this.audio = new Audio();
        this.status = 'pause';
    }

    AudioManager.prototype = {
        play: function() {
            this.audio.play();
            this.status = 'play';
            $('.play-btn').addClass('pause');
        },
        pause: function() {
            this.audio.pause();
            this.status = 'pause';
            $('.play-btn').removeClass('pause');
        },
        playTo: function(time) {
            this.audio.currentTime = time;
            this.play();
        },
        getAudio: function(src) {
            this.audio.src = src;
            this.audio.load();
        }
    }

    root.audioManager = new AudioManager();
}(window.Zepto, window.player || (window.player = {})))