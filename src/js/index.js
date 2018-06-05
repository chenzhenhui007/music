var $ = window.Zepto
var root = window.player
var $scope = $(document.body)
var index = 0
var songList
var audio = new root.audioControl()

function bindEvent() {
    // console.log(index)
    // console.log(index)

    $scope.on("play:change", function (event, index) {

        audio.getAudio(songList[index].audio)

        if (audio.status == 'play') {
            audio.play()
            root.process.start()
        }
        // console.log(root)
        root.process.renderAllTime(songList[index].duration)
        root.render(songList[index])
        root.process.updata(0)

    })

    $scope.on('click', '.play_btn', function () {


        if (audio.status == 'pause') {
            root.process.start()
            audio.play()
        } else {
            root.process.stop()
            audio.pause()
        }
        $(this).toggleClass('pause_btn');
    })

    $scope.on('click', '.prev_btn', function () {
        if (index == 0) {
            index = songList.length - 1
        } else {
            index--
        }

        $scope.trigger("play:change", index)

    })

    $scope.on('click', '.next_btn', function () {
        if (index == songList.length - 1) {
            index = 0
        } else {
            index++
        }
        $scope.trigger("play:change", index)
    })
}

function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            root.render(data[0])
            songList = data
            bindTouch()
            bindEvent()
            // console.log(index)
            $scope.trigger("play:change", index)
        },
        eror: function () {
            console.log('error');
        }
    })
}

function bindTouch() {
    var $slider = $scope.find('.slider_pointer'),
        offset = $scope.find('.plan_wrapper').offset()
    left = offset.left,
        width = offset.width
    $slider.on('touchstart', function () {
        root.process.stop()
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX
        var per = (x - left) / width
        if (per < 0) { per = 0 }
        if (per > 1) { per = 0.98 }
        root.process.updata(per)
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX
        var per = (x - left) / width
        if (per < 0) { per = 0 }
        if (per > 1) { per = 0.98 }
        var curTime = per * curDuration
       audio.jumpToplay(curTime)
       $scope.find('.play_btn').addClass('pause_btn');
       root.process.start(per)
    })
}

getData("../mock/data.json");