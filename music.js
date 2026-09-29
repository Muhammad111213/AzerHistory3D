/* ================================================ */
/*  music.js — Səhifələr arası davam edən musiqi    */
/* ================================================ */
(function () {
    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");
    if (!music || !musicBtn) return;

    const KEY = "azerhistory_music";
    const _m = (k, fb) => (typeof tr === "function" ? tr(k, fb) : fb);

    function label() {
        return music.paused ? "🎵 " + _m("music", "Musiqi") : "⏸ " + _m("pause", "Pause");
    }
    function refreshLabel() { musicBtn.innerHTML = label(); }

    function save() {
        localStorage.setItem(KEY, JSON.stringify({ playing: !music.paused, time: music.currentTime }));
    }

    // Səhifə açılanda əvvəlki vəziyyəti bərpa et
    try {
        const saved = JSON.parse(localStorage.getItem(KEY) || "null");
        if (saved) {
            music.currentTime = saved.time || 0;
            if (saved.playing) {
                music.play().then(refreshLabel).catch(() => {});
            }
        }
    } catch (e) {}

    musicBtn.addEventListener("click", () => {
        if (music.paused) {
            music.play().then(() => { refreshLabel(); save(); }).catch(() => {});
        } else {
            music.pause();
            refreshLabel();
            save();
        }
    });

    music.addEventListener("timeupdate", () => { if (!music.paused) save(); });
    window.addEventListener("beforeunload", save);
    window.addEventListener("langchange", refreshLabel);
})();
