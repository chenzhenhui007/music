(function ($, root) {
    function controlManger(len) {
        this.audio = new Audio();
        
        this.index = index
        this.len = 0
    }

    controlManger.prototype = {
        prev: function () {

        },
        next: function () {

        },
        getIndex: function () {
            var index = this.index;
            var len = this.len
            var curIndex = (index + len + val) % len
            this.index = curIndex
            return curIndex
        },
        playTo: function (time) {
            console.log('playto')
            console.log(audio)
            this.audio.currentTime = time;
            
            console.log(audio.currentTime)
            audio.play()
        }
    }
    root.controlManger = controlManger

})(window.Zepto, window.player || (window.player = {}))