# Essenhub

Manajer link aplikasi: simpan, kelompokkan, dan buka semua aplikasimu dari satu tempat (PWA).

## Stack
Full HTML: semua kode (HTML/CSS/JavaScript) dan konfigurasi Firebase ada di satu file `index.html`, tanpa file `.js` terpisah. Memakai Firebase Authentication (email/kata sandi) dan Cloud Firestore.

## Setup Firebase
1. **Authentication** → Sign-in method → aktifkan **Email/Password**.
2. **Authentication** → Settings → Authorized domains → tambahkan `USERNAME.github.io`.
3. **Firestore Database** → Rules → tempel isi `firestore.rules` → **Publish**.

## Deploy ke GitHub Pages
Upload semua file ke repo, lalu Settings → Pages → Branch `main` / root.
Update berikutnya cukup mengganti `index.html`.

## Struktur data
`users/{uid}/apps/{id}`: name, url, cat, desc, icon, pinned, opens, lastOpened, createdAt

## Ikon otomatis
Jika kolom ikon kosong, Essenhub mencoba memuat `icons/icon-192.png` dari folder aplikasi tujuan; jika tidak ada, ditampilkan huruf awal berwarna.
