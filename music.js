/* ================================================ */
/*  music.js — Səhifələr arası davam edən musiqi    */
/* ================================================ */
(function () {
    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");
    if (!music || !musicBtn) return;

    const KEY = "azerhistory_music";

    function save() {
        localStorage.setItem(KEY, JSON.stringify({
            playing: !music.paused,
            time: music.currentTime,
        }));
    }

    // Səhifə açılanda əvvəlki vəziyyəti bərpa et
    try {
        const saved = JSON.parse(localStorage.getItem(KEY) || "null");
        if (saved) {
            music.currentTime = saved.time || 0;
            if (saved.playing) {
                music.play()
                    .then(() => { musicBtn.innerHTML = "⏸ Pause"; })
                    .catch(() => {});
            }
        }
    } catch (e) {}

    musicBtn.addEventListener("click", () => {
        if (music.paused) {
            music.play().then(() => {
                musicBtn.innerHTML = "⏸ Pause";
                save();
            }).catch(() => {});
        } else {
            music.pause();
            musicBtn.innerHTML = "🎵 Musiqi";
            save();
        }
    });

    music.addEventListener("timeupdate", () => {
        if (!music.paused) save();
    });
    window.addEventListener("beforeunload", save);
})();
