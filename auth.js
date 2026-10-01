// ================================================
//  auth.js — AzerHistory 3D Qeydiyyat / Giriş sistemi
//  (3 dilli — lang.js-dəki tr() funksiyasından istifadə edir)
// ================================================

const _t = (k, fb) => (typeof tr === "function" ? tr(k, fb) : fb);

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
const userAvatar      = document.getElementById("userAvatar");
const logoutBtn       = document.getElementById("logoutBtn");
const authFullName = document.getElementById("authFullName");
const authCountry  = document.getElementById("authCountry");
const fieldFullName = document.getElementById("fieldFullName");
const fieldCountry  = document.getElementById("fieldCountry");

let isLoginMode = true; // true = giriş, false = qeydiyyat

// ─── Modal mətnlərini rejimə və dilə görə yenilə ──
function refreshAuthTexts() {
    if (authTitle) authTitle.textContent = isLoginMode ? _t("auth_login_title", "Giriş Et") : _t("auth_signup_title", "Qeydiyyatdan Keç");
    if (authSubmitBtn && !authSubmitBtn.disabled) {
        authSubmitBtn.textContent = isLoginMode ? _t("auth_login_btn", "Giriş Et") : _t("auth_signup_btn", "Qeydiyyatdan Keç");
    }
    if (authToggleMode) {
        authToggleMode.textContent = isLoginMode
            ? _t("auth_toggle_to_signup", "Hesabın yoxdur? Qeydiyyatdan keç")
            : _t("auth_toggle_to_login", "Artıq hesabın var? Giriş et");
    }
    if (fieldFullName) fieldFullName.style.display = isLoginMode ? "none" : "block";
    if (fieldCountry)  fieldCountry.style.display  = isLoginMode ? "none" : "block";
}
window.addEventListener("langchange", refreshAuthTexts);

// ─── Modalı aç/bağla ──────────────────────────
function openAuthModal() {
    authModal.classList.add("open");
    authError.textContent = "";
    authForm.reset();
}
function closeAuthModal() {
    authModal.classList.remove("open");
}

if (authBtn)        authBtn.addEventListener("click", openAuthModal);
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
        refreshAuthTexts();
    });
}

// ─── Form submit — Giriş və ya Qeydiyyat ──────
if (authForm) {
    authForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        authError.textContent = "";
        authSubmitBtn.disabled = true;
        authSubmitBtn.textContent = _t("auth_wait", "Gözləyin...");

        const email = authEmail.value.trim();
        const password = authPassword.value;

        try {
            if (isLoginMode) {
                const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
                if (error) throw error;
                closeAuthModal();
                updateAuthUI(data.user);
            } else {
                const { data, error } = await supabaseClient.auth.signUp({
                    email, password,
                    options: {
                        data: {
                            full_name: authFullName ? authFullName.value.trim() : "",
                            country: authCountry ? authCountry.value.trim() : "",
                        },
                    },
                });
                if (error) throw error;
                authError.style.color = "#4ADE80";
                authError.textContent = _t("auth_signup_ok", "✅ Qeydiyyat uğurludur! Emailinizi yoxlayın və linkə klik edin.");
                authSubmitBtn.disabled = false;
                refreshAuthTexts();
                return;
            }
        } catch (err) {
            authError.style.color = "#FF6B6B";
            authError.textContent = translateAuthError(err.message);
        }

        authSubmitBtn.disabled = false;
        refreshAuthTexts();
    });
}

// ─── Xəta mesajlarını seçilmiş dilə çevir ─────
function translateAuthError(msg) {
    if (msg.includes("Invalid login credentials")) return _t("err_invalid", "❌ Email və ya şifrə yanlışdır");
    if (msg.includes("Email not confirmed"))        return _t("err_unconfirmed", "❌ Zəhmət olmasa emailinizi təsdiqləyin");
    if (msg.includes("User already registered"))    return _t("err_exists", "❌ Bu email artıq qeydiyyatdan keçib");
    if (msg.includes("Password should be"))         return _t("err_password", "❌ Şifrə ən azı 6 simvol olmalıdır");
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
        if (authBtn)        authBtn.style.display = "none";
        if (userBadge)      userBadge.style.display = "flex";
        if (userEmailLabel) userEmailLabel.textContent = user.email.split("@")[0];
        if (userAvatar)     userAvatar.textContent = user.email[0].toUpperCase();
    } else {
        if (authBtn)   authBtn.style.display = "inline-flex";
        if (userBadge) userBadge.style.display = "none";
    }
}

// ─── Səhifə yüklənəndə cari sessiyanı yoxla ───
(async function initAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    updateAuthUI(session ? session.user : null);
})();

supabaseClient.auth.onAuthStateChange((event, session) => {
    updateAuthUI(session ? session.user : null);
});

window.getCurrentUser = async function () {
    const { data: { session } } = await supabaseClient.auth.getSession();
    return session ? session.user : null;
};
