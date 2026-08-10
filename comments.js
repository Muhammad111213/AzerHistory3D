// ================================================
//  comments.js — Eksponatlara şərh sistemi
// ================================================

// Hər eksponat kartına .comments-section div-i əlavə edəcəyik
// data-artifact="sikke" kimi ID ilə işarələnir

async function loadComments(artifactId, container) {
    container.innerHTML = `<p class="comments-loading">Şərhlər yüklənir...</p>`;

    const { data, error } = await supabaseClient
        .from("comments")
        .select("*")
        .eq("artifact_id", artifactId)
        .order("created_at", { ascending: false });

    if (error) {
        container.innerHTML = `<p class="comments-error">Şərhlər yüklənə bilmədi.</p>`;
        return;
    }

    if (!data || data.length === 0) {
        container.innerHTML = `<p class="comments-empty">Hələ şərh yoxdur. İlk şərhi sən yaz!</p>`;
        return;
    }

    const currentUser = await window.getCurrentUser();

    container.innerHTML = data.map(c => `
        <div class="comment-item" data-comment-id="${c.id}">
            <div class="comment-avatar">${(c.user_email || "?")[0].toUpperCase()}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author">${escapeHtml((c.user_email || "İstifadəçi").split("@")[0])}</span>
                    <span class="comment-date">${formatDate(c.created_at)}</span>
                </div>
                <p class="comment-text">${escapeHtml(c.content)}</p>
            </div>
            ${currentUser && currentUser.id === c.user_id
                ? `<button class="comment-delete" onclick="deleteComment('${c.id}', '${artifactId}')">🗑️</button>`
                : ""}
        </div>
    `).join("");
}

async function submitComment(artifactId, inputEl, container) {
    const content = inputEl.value.trim();
    if (!content) return;

    const user = await window.getCurrentUser();
    if (!user) {
        alert("Şərh yazmaq üçün əvvəlcə giriş edin!");
        document.getElementById("authBtn")?.click();
        return;
    }

    const { error } = await supabaseClient.from("comments").insert({
        user_id: user.id,
        user_email: user.email,
        artifact_id: artifactId,
        content: content,
    });

    if (error) {
        alert("Şərh göndərilə bilmədi: " + error.message);
        return;
    }

    inputEl.value = "";
    loadComments(artifactId, container);
}

async function deleteComment(commentId, artifactId) {
    if (!confirm("Şərhi silmək istədiyinizə əminsiniz?")) return;
    await supabaseClient.from("comments").delete().eq("id", commentId);
    const container = document.querySelector(`[data-comments-for="${artifactId}"]`);
    if (container) loadComments(artifactId, container);
}

// ─── Köməkçi funksiyalar ──────────────────────
function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString("az-AZ", { day: "2-digit", month: "short", year: "numeric" });
}

// ─── Bütün şərh bloklarını səhifə yüklənəndə işə sal ───
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-comments-for]").forEach((container) => {
        const artifactId = container.dataset.commentsFor;
        loadComments(artifactId, container);

        const input = container.parentElement.querySelector(".comment-input");
        const sendBtn = container.parentElement.querySelector(".comment-send-btn");
        if (sendBtn && input) {
            sendBtn.addEventListener("click", () => submitComment(artifactId, input, container));
            input.addEventListener("keypress", (e) => {
                if (e.key === "Enter") submitComment(artifactId, input, container);
            });
        }
    });
});
