window.onload = function () {
    const player = document.querySelector("section.player"),
          source = player.querySelector("audio"),
          btn = player.querySelector(".btn"),
          prgbar = player.querySelector(".prgbar"),
          timeline = player.querySelector(".timeline");
    source.oncanplay = function () {
        let total = Math.round(this.duration);
        timeline.innerHTML = "0:0:0/" + formatTime(total);
    }
    btn.onclick = function () {
        if (source.paused) {
            source.play();
            this.innerHTML = "停止";
        } else {
            source.pause();
            this.innerHTML = "播放";
        }
    }

    source.ontimeupdate = function () {
        let total = Math.round(this.duration),
            current = Math.round(this.currentTime)
        timeline.innerHTML = formatTime(current) + "/" + formatTime(total);
        let rate = Math.floor(current / total * 100);
        prgbar.value = rate;
    }

    source.onended = function () {
        timeline.innerHTML = "00/00";
        prgbar.value = 0;
        btn.innerHTML = "播放";
    }

    function formatTime(total) {
        let secs = total % 60;
        let mins = ((total % 3600) - secs) / 60;
        let hours = Math.floor(total / 3600);
        return `${hours}:${mins}:${secs}`;
    }
}
