# AzerHistory 3D — Deploy Təlimatı
## GitHub + Vercel ilə Tam Pulsuz

---

## 📁 ADDIM 1: Layihə qovluğu düzən

Bütün faylların bir qovluqda olduğuna əmin ol:

```
AzerHistory3D/
│
├── FLL.html          ← Əsas səhifə
├── FLL.css           ← Stillər
├── FLL.js            ← JavaScript
├── FLL.py            ← Flask backend (YENİLƏNDİ)
├── timeline.html     ← Zaman xətti
├── timeline.css
├── timeline.js
│
├── vercel.json       ← Vercel konfiq (YENİ)
├── requirements.txt  ← Python paketlər (YENİ)
│
├── loqo.png
├── at.png
├── bicak.png
├── manna.png
├── xerite2.png
├── music.mp3
├── sikke.glb
├── cene_sumuyu.glb
└── dulusculuq.glb
```

---

## 🐙 ADDIM 2: GitHub-a yüklə

1. **github.com**-a gir → sağ üstdə **"+"** → **"New repository"**
2. Repository adı: `AzerHistory3D`
3. **Public** seç (Vercel Free üçün lazımdır)
4. **"Create repository"** bas

Sonra kompüterdə terminal aç, layihə qovluğuna keç:

```bash
cd /layihənin/yolu/AzerHistory3D

git init
git add .
git commit -m "İlk yükləmə"
git branch -M main
git remote add origin https://github.com/SƏNİN_ADIN/AzerHistory3D.git
git push -u origin main
```

> ⚠️ `SƏNİN_ADIN` yerinə öz GitHub istifadəçi adını yaz

---

## ▲ ADDIM 3: Vercel-ə qoş

1. **vercel.com**-a get
2. **"Sign Up"** → **"Continue with GitHub"** seç → GitHub hesabınla gir
3. Dashboard-da **"Add New Project"** bas
4. `AzerHistory3D` repo-sunu tap → **"Import"** bas
5. Parametrlər:
   - **Framework Preset:** `Other`
   - **Root Directory:** `.` (nöqtə — kök qovluq)
   - Başqa heçnəyi dəyişmə
6. **"Deploy"** bas → 1-2 dəqiqə gözlə ✅

Hazır! Sənə belə bir link veriləcək:
```
https://azer-history3d.vercel.app
```

---

## 🔄 ADDIM 4: Kodu güncəllədikdə

Sadəcə:
```bash
git add .
git commit -m "Yeniləmə"
git push
```
Vercel **avtomatik** yenidən deploy edir!

---

## 🗺️ ADDIM 5: Öz domain qoşmaq (istəsən)

Vercel dashboard → layihəni aç → **"Settings"** → **"Domains"**

Pulsuz subdomain: `azerhistory3d.vercel.app` ✅

Öz domain ($10-15/il):
- **namecheap.com** və ya **godaddy.com**-dan al
- Vercel-ə əlavə et → avtomatik SSL sertifikatı qurulur

---

## 🗄️ ADDIM 6: Supabase (Gələcək üçün)

Hələlik lazım deyil. Şərh, like, qeydiyyat əlavə etmək istədikdə:

1. **supabase.com** → "Start for free" → GitHub ilə gir
2. "New project" → adı: `azerhistory3d`
3. Pulsuz tier: 500MB DB, 50,000 istifadəçi
4. API key alacaqsın → `FLL.js`-ə əlavə edəcəyik

---

## ✅ Xülasə

| Mərhələ | Nə lazımdır | Qiymət |
|---------|------------|--------|
| GitHub | Hesab | Pulsuz |
| Vercel | GitHub hesabı | Pulsuz |
| Domain | Namecheap/GoDaddy | ~$10/il |
| Supabase | Hesab | Pulsuz |

**"AzerHistory3D" Google-da görsənmək üçün:**
Deploy etdikdən 1-4 həftə sonra Google indiksləyir.
Sürətləndirmək üçün: Google Search Console-a saytı əlavə et (tamamilə pulsuzdur).
