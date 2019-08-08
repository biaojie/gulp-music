(function($, root){
    function Control(len){
        this.index = 0;
        this.len = len;
    }
    Control.prototype = {
        prev: function() {
            // if(this.index == 0){
            //     this.index = len;
            // }else{
            //     this.index--;
            // }
            return this.getIndex(-1);
        },
        next: function() {
            // if(this.index == len){
            //     this.index = 0;
            // }else{
            //     this.index++;
            // }
            return this.getIndex(1);
        },
        getIndex: function(val){
            var index = this.index;
            var len = this.len
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }

    root.controlIndex = Control;
}(window.Zepto, window.player || (window.player = {})))