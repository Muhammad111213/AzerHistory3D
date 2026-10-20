/* ================================================ */
/*  likes.js — Eksponatlara bəyənmə (♡) sistemi     */
/*  Hər eksponatın şərh blokunun üstünə düymə qoyur */
/* ================================================ */
(function () {
    const _l = (k, fb) => (typeof tr === "function" ? tr(k, fb) : fb);
    const state = {}; // artifact_id -> { count, liked }
    const ids = [];

    function render(id) {
        const s = state[id] || { count: 0, liked: false };
        document.querySelectorAll('.like-btn[data-artifact="' + id + '"]').forEach((btn) => {
            btn.classList.toggle("liked", s.liked);
            btn.setAttribute("aria-pressed", s.liked ? "true" : "false");
            btn.title = _l("like_tooltip", "Bəyən");
            btn.querySelector(".like-heart").textContent = s.liked ? "♥" : "♡";
            btn.querySelector(".like-count").textContent = s.count;
        });
    }

    // Düymələri JS ilə əlavə edirik — HTML-ə toxunmağa ehtiyac yoxdur
    function buildButtons() {
        document.querySelectorAll("[data-comments-for]").forEach((list) => {
            const id = list.dataset.commentsFor;
            const wrapper = list.closest(".comments-wrapper");
            if (!wrapper || ids.includes(id)) return;
            const bar = document.createElement("div");
            bar.className = "like-bar";
            bar.innerHTML =
                '<button type="button" class="like-btn" data-artifact="' + id + '">' +
                '<span class="like-heart">♡</span><span class="like-count">0</span></button>';
            wrapper.parentElement.insertBefore(bar, wrapper);
            ids.push(id);
            state[id] = { count: 0, liked: false };
            render(id);
        });
    }

    async function loadLikes() {
        if (!ids.length) return;
        const user = await window.getCurrentUser();
        const { data, error } = await supabaseClient
            .from("likes")
            .select("artifact_id, user_id")
            .in("artifact_id", ids);
        if (error) {
            console.warn("Bəyənmələr yüklənmədi:", error.message);
            return;
        }
        ids.forEach((id) => (state[id] = { count: 0, liked: false }));
        (data || []).forEach((r) => {
            if (!state[r.artifact_id]) return;
            state[r.artifact_id].count++;
            if (user && r.user_id === user.id) state[r.artifact_id].liked = true;
        });
        ids.forEach(render);
    }

    document.addEventListener("click", async (e) => {
        const btn = e.target.closest(".like-btn");
        if (!btn || btn.disabled) return;
        const id = btn.dataset.artifact;

        const user = await window.getCurrentUser();
        if (!user) {
            // Giriş etməyibsə — giriş pəncərəsini aç
            const loginBtn = document.getElementById("authBtn");
            if (loginBtn) loginBtn.click();
            return;
        }

        const s = state[id] || (state[id] = { count: 0, liked: false });
        const wasLiked = s.liked;

        // Əvvəl ekranı yenilə (sürətli hiss olunsun), sonra bazaya yaz
        s.liked = !wasLiked;
        s.count += wasLiked ? -1 : 1;
        render(id);
        btn.disabled = true;

        let error = null;
        if (wasLiked) {
            ({ error } = await supabaseClient
                .from("likes").delete().eq("user_id", user.id).eq("artifact_id", id));
        } else {
            ({ error } = await supabaseClient
                .from("likes").insert({ user_id: user.id, artifact_id: id }));
            if (error && error.code === "23505") error = null; // artıq bəyənilib
        }
        btn.disabled = false;

        if (error) {
            // Alınmadısa geri qaytar
            s.liked = wasLiked;
            s.count += wasLiked ? 1 : -1;
            render(id);
            console.warn("Bəyənmə alınmadı:", error.message);
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        buildButtons();
        loadLikes();
    });

    // Giriş / çıxış olanda ürəklərin vəziyyətini yenilə
    if (typeof supabaseClient !== "undefined") {
        supabaseClient.auth.onAuthStateChange(() => setTimeout(loadLikes, 0));
    }
    window.addEventListener("langchange", () => ids.forEach(render));
})();
