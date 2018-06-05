(function ($, root) {
    var $scope = $(document.body)
    // var curDuration
    var frameId
    var startTime
    var lastTime = 0
    var allTime

    function formatTime(duration) {
        duration = Math.round(duration)
        var minute = Math.floor(duration / 60)
        var second = duration - minute * 60
        if (minute < 10) {
            minute = '0' + minute
        }
        if (second < 10) {
            second = '0' + second
        }
        return minute + ':' + second
    }

    function renderAllTime(duration) {
        lastTime = 0
        curDuration = duration
        allTime = formatTime(duration)
        $scope.find('.all_time').html(allTime)
    }

    function updata(percent) {
        var curTime = percent * curDuration;
        curTime = formatTime(curTime)
        $scope.find('.cur_time').html(curTime)

        var per = (percent - 1) * 100 + '%'
        $scope.find('.plan_top').css({
            'transform': 'translateX(' + per + ')'
        })

    }

    function start(per) {
        cancelAnimationFrame(frameId)
        startTime = new Date().getTime()
        function frame() {
            var curTime = new Date().getTime()
            var percent = lastTime + (curTime - startTime) / (curDuration * 1000)
            if (percent < 1) {
                frameId = requestAnimationFrame(frame)
                if (per) {
                    
                    var i = 0
                    if (i == 0) {
                        lastTime = per
                        i++
                    }
                    
                    updata(percent)
                } else {
                    
                    updata(percent)
                }
            } else {
                cancelAnimationFrame(frameId)
                $scope.find(".next-btn").trigger("click")
            }
        }
        frame()
    }

    function stop() {
        var stopTime = new Date().getTime()
        lastTime = lastTime + (stopTime - startTime) / (curDuration * 1000)
        cancelAnimationFrame(frameId)
    }

    root.process = {
        renderAllTime: renderAllTime,
        updata: updata,
        start: start,
        stop: stop,
        // curDuration:curDuration,
    }

})(window.Zepto, window.player || (window.player = {}))

