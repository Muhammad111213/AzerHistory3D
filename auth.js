// ================================================
//  auth.js — AzerHistory 3D Qeydiyyat / Giriş sistemi
// ================================================

// ─── DOM elementləri ──────────────────────────
const authBtn        = document.getElementById("authBtn");
const authModal       = document.getElementById("authModal");
const authModalClose  = document.getElementById("authModalClose");
const authForm        = document.getElementById("authForm");
const authEmail       = document.getElementById("authEmail");
const authPassword    = document.getElementById("authPassword");
const authSubmitBtn   = document.getElementById("authSubmitBtn");
const authToggleMode  = document.getElementById("authToggleMode");
const authError       = document.getElementById("authError");
const authTitle       = document.getElementById("authTitle");
const userBadge       = document.getElementById("userBadge");
const userEmailLabel  = document.getElementById("userEmailLabel");
const logoutBtn       = document.getElementById("logoutBtn");

let isLoginMode = true; // true = giriş, false = qeydiyyat

// ─── Modalı aç/bağla ──────────────────────────
function openAuthModal() {
    authModal.classList.add("open");
    authError.textContent = "";
    authForm.reset();
}
function closeAuthModal() {
    authModal.classList.remove("open");
}

if (authBtn)       authBtn.addEventListener("click", openAuthModal);
if (authModalClose) authModalClose.addEventListener("click", closeAuthModal);
if (authModal) {
    authModal.addEventListener("click", (e) => {
        if (e.target === authModal) closeAuthModal();
    });
}

// ─── Giriş / Qeydiyyat rejimini dəyiş ─────────
if (authToggleMode) {
    authToggleMode.addEventListener("click", () => {
        isLoginMode = !isLoginMode;
        authError.textContent = "";
        if (isLoginMode) {
            authTitle.textContent = "Giriş Et";
            authSubmitBtn.textContent = "Giriş Et";
            authToggleMode.textContent = "Hesabın yoxdur? Qeydiyyatdan keç";
        } else {
            authTitle.textContent = "Qeydiyyatdan Keç";
            authSubmitBtn.textContent = "Qeydiyyatdan Keç";
            authToggleMode.textContent = "Artıq hesabın var? Giriş et";
        }
    });
}

// ─── Form submit — Giriş və ya Qeydiyyat ──────
if (authForm) {
    authForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        authError.textContent = "";
        authSubmitBtn.disabled = true;
        authSubmitBtn.textContent = "Gözləyin...";

        const email = authEmail.value.trim();
        const password = authPassword.value;

        try {
            if (isLoginMode) {
                // GİRİŞ
                const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email, password,
                });
                if (error) throw error;
                closeAuthModal();
                updateAuthUI(data.user);
            } else {
                // QEYDİYYAT
                const { data, error } = await supabaseClient.auth.signUp({
                    email, password,
                });
                if (error) throw error;
                authError.style.color = "#4ADE80";
                authError.textContent = "✅ Qeydiyyat uğurludur! Emailinizi yoxlayın və linkə klik edin.";
                authSubmitBtn.disabled = false;
                authSubmitBtn.textContent = isLoginMode ? "Giriş Et" : "Qeydiyyatdan Keç";
                return;
            }
        } catch (err) {
            authError.style.color = "#FF6B6B";
            authError.textContent = translateAuthError(err.message);
        }

        authSubmitBtn.disabled = false;
        authSubmitBtn.textContent = isLoginMode ? "Giriş Et" : "Qeydiyyatdan Keç";
    });
}

// ─── Xəta mesajlarını Azərbaycan dilinə çevir ─
function translateAuthError(msg) {
    if (msg.includes("Invalid login credentials")) return "❌ Email və ya şifrə yanlışdır";
    if (msg.includes("Email not confirmed"))        return "❌ Zəhmət olmasa emailinizi təsdiqləyin";
    if (msg.includes("User already registered"))    return "❌ Bu email artıq qeydiyyatdan keçib";
    if (msg.includes("Password should be"))         return "❌ Şifrə ən azı 6 simvol olmalıdır";
    return "❌ " + msg;
}

// ─── Çıxış ─────────────────────────────────────
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        await supabaseClient.auth.signOut();
        updateAuthUI(null);
    });
}

// ─── UI-ni giriş vəziyyətinə görə yenilə ──────
function updateAuthUI(user) {
    if (user) {
        if (authBtn)      authBtn.style.display = "none";
        if (userBadge)    userBadge.style.display = "flex";
        if (userEmailLabel) userEmailLabel.textContent = user.email.split("@")[0];
    } else {
        if (authBtn)      authBtn.style.display = "inline-flex";
        if (userBadge)    userBadge.style.display = "none";
    }
}

// ─── Səhifə yüklənəndə cari sessiyanı yoxla ───
(async function initAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    updateAuthUI(session ? session.user : null);
})();

// ─── Sessiya dəyişəndə UI-ni yenilə ───────────
supabaseClient.auth.onAuthStateChange((event, session) => {
    updateAuthUI(session ? session.user : null);
});

// Digər fayllardan istifadə üçün qlobal export
window.getCurrentUser = async function () {
    const { data: { session } } = await supabaseClient.auth.getSession();
    return session ? session.user : null;
};
