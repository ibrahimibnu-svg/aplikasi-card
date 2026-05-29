# Jurnal Vibecoding & Rekayasa Perangkat Lunak

**Nama:** [IBRAHIM IBNU ABBAS]

**Kelas:** [11]

**Nama Proyek:** Aplikasi Buku Tahunan Siswa (Array of Objects)

**Link Vercel:** [Tautan Live Vercel]

---

## 🏗️ 1. Definisi Stack & Arsitektur

*Jelaskan perencanaan tingkat tinggi (high-level planning) dari aplikasimu sebelum mulai menulis kode. Seorang arsitek perangkat lunak harus tahu alat apa yang dipakai dan di mana meletakkannya.*

- **Lingkungan Pengembangan:** ReactJS dengan Vite
- **Routing:** Tidak digunakan — aplikasi ini bersifat single page tanpa navigasi antar halaman
- **Styling:** CSS Modules (`.module.css`) — satu file CSS per komponen agar tidak terjadi konflik class name
- **Manajemen State:** `useState` (React Hook) — untuk menyimpan nilai search query dan filter kelas yang dipilih
- **Data:** Array of Objects lokal di `src/data/siswa.js` — tanpa API atau database
- **AI Code Editor / LLM Assistant:** Claude (Anthropic)

---

**Alasan Pemisahan Komponen:**

*Tuliskan alasan logismu mengapa kamu membagi komponen seperti Header, Footer, atau Card. Bagaimana struktur folder `src/components` milikmu?*

> Saya membagi aplikasi menjadi beberapa komponen dengan alasan berikut:
>
> **SearchBar.jsx** — Dipisah karena memiliki satu tanggung jawab tunggal: mengelola input pencarian nama siswa. Komponen ini tidak perlu tahu tentang data siswa sama sekali — cukup menerima nilai `searchQuery` dan fungsi `setSearchQuery` dari parent via props.
>
> **FilterDropdown.jsx** — Dipisah karena logika filter kelas sepenuhnya independen dari logika pencarian nama. Dengan memisahkannya, saya bisa mengembangkan atau mengubah filter kelas tanpa risiko merusak fitur pencarian.
>
> **StudentCard.jsx** — Ini adalah komponen paling penting untuk dipisah karena bersifat **reusable**. Satu komponen ini dirender berulang untuk setiap object dalam array menggunakan `.map()`. Tidak ada data yang di-hardcode di dalamnya — semua properti (nama, kelas, jurusan, hobi, motto) diterima dari parent via props.
>
> **CardGrid.jsx** — Bertugas sebagai wrapper layout grid dan melakukan `.map()` pada array siswa. Dipisah dari `App.jsx` agar `App.jsx` tetap bersih dan hanya mengurus state serta logika filter — bukan urusan tampilan grid.
>
> **StudentCount.jsx** — Dipisah untuk menampilkan jumlah siswa yang sedang tampil secara dinamis. Komponen ini bereaksi langsung terhadap perubahan panjang array hasil filter.

**Struktur folder `src/components`:**

```
src/
├── data/
│   └── siswa.js                  ← Array of Objects, min. 8 siswa
├── components/
│   ├── SearchBar/
│   │   ├── SearchBar.jsx
│   │   └── SearchBar.module.css
│   ├── FilterDropdown/
│   │   ├── FilterDropdown.jsx
│   │   └── FilterDropdown.module.css
│   ├── StudentCard/
│   │   ├── StudentCard.jsx       ← Reusable, menerima 1 object siswa via props
│   │   └── StudentCard.module.css
│   ├── CardGrid/
│   │   ├── CardGrid.jsx          ← Melakukan .map() dan render StudentCard
│   │   └── CardGrid.module.css
│   └── StudentCount/
│       ├── StudentCount.jsx
│       └── StudentCount.module.css
├── App.jsx                       ← State utama + logika filter
├── App.module.css
└── main.jsx
```

---

## 🗣️ 2. Strategi Prompting

*Vibecoding membutuhkan kemampuan komunikasi yang jelas dengan AI. Tuliskan 1 atau 2 prompt andalan yang kamu gunakan untuk membangun fitur kompleks.*

**Prompt 1 (Fokus pada Logika / State):**

> "Buatkan logika filter di App.jsx menggunakan useState untuk dua kondisi yang berjalan bersamaan:
> 1. `searchQuery` — filter nama siswa secara case-insensitive dan real-time setiap karakter diketik.
> 2. `selectedKelas` — filter berdasarkan kelas (XII-A, XII-B, XII-C), atau tampilkan semua jika nilainya string kosong.
>
> Kedua kondisi harus terpenuhi sekaligus (bukan salah satu). Hasil filter diteruskan ke komponen CardGrid sebagai props. Jika array hasil filter kosong, tampilkan pesan 'Tidak ada siswa yang cocok.' Sertakan juga cara menampilkan jumlah siswa yang sedang tampil secara dinamis."

**Prompt 2 (Fokus pada UI / Komponen Card):**

> "Buatkan komponen React bernama StudentCard.jsx yang menerima satu object siswa sebagai props. Object siswa memiliki properti: id, nama, kelas, jurusan, hobi, dan motto. Tampilkan:
> - Avatar lingkaran berisi inisial dua huruf dari nama siswa
> - Nama lengkap siswa
> - Kelas siswa
> - Badge jurusan dengan warna berbeda: IPA = biru, IPS = hijau, Bahasa = ungu
> - Hobi dan motto
>
> Gunakan CSS Modules untuk styling. Komponen tidak boleh memiliki data hardcode — semua data berasal dari props. Tambahkan komentar di baris yang menggunakan props untuk menunjukkan pemahaman konsep."

---

**Hasil Evaluasi Prompt:**

*Apakah AI langsung memberikan kode yang benar? Atau kamu harus mengoreksi prompt tersebut? Jelaskan.*

> **Prompt 1** perlu 1 kali iterasi. Pada percobaan pertama, AI menghasilkan logika filter dengan operator `||` (OR) sehingga cukup salah satu kondisi yang terpenuhi — padahal seharusnya keduanya harus terpenuhi. Setelah saya tambahkan kalimat "Kedua kondisi harus terpenuhi sekaligus (bukan salah satu)", AI langsung memperbaiki operator menjadi `&&` dan hasilnya sesuai harapan.
>
> **Prompt 2** langsung menghasilkan kode yang benar di percobaan pertama. AI memahami konteks props dan CSS Modules dengan baik karena prompt menyebutkan secara eksplisit bahwa tidak boleh ada data hardcode dan harus menggunakan CSS Modules. Koreksi kecil hanya dilakukan pada nama class CSS agar konsisten dengan konvensi camelCase.
>
> **Pelajaran:** Semakin spesifik constraint yang disebutkan di dalam prompt (tidak boleh hardcode, gunakan CSS Modules, kondisi AND bukan OR), semakin sedikit iterasi yang dibutuhkan. Ambiguitas di prompt selalu berujung pada hasil yang perlu diperbaiki.

---

## 🐛 3. Log Problem Solving

*Programmer sejati belajar dari error warna merah. Ceritakan minimal 1 masalah/bug paling menantang yang kamu temui selama satu pekan ini.*

- **Deskripsi Error / Bug:**

    > Saat fitur search dan filter kelas digunakan bersamaan, hasilnya tidak akurat. Ketika saya memilih kelas XII-A di dropdown dan mengetik nama di search bar, siswa dari kelas lain tetap muncul selama namanya cocok dengan keyword. Filter kelas seolah-olah diabaikan begitu search bar diisi.

- **Langkah Investigasi:**

    > Saya menambahkan `console.log("Filtered:", filteredSiswa)` tepat sebelum `return` di `App.jsx` untuk melihat isi array hasil filter setiap render. Saya juga mencetak nilai `searchQuery` dan `selectedKelas` ke konsol untuk memastikan state terbaca dengan benar.
    >
    > Dari log, terlihat bahwa nilai `selectedKelas` terbaca benar sebagai `'XII-A'`, namun array hasil filter tetap memasukkan siswa dari kelas lain. Ini mengarahkan saya untuk memeriksa logika `.filter()` lebih teliti — dan di situlah masalahnya ditemukan: operator `||` yang seharusnya `&&`.

- **Kolaborasi dengan AI:**

    > Saya memberikan prompt berikut ke AI:
    >
    > *"Saya punya bug di logika filter React. Berikut kodenya:*
    > ```js
    > const filtered = siswa.filter(s =>
    >   s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    >   (selectedKelas === '' || s.kelas === selectedKelas)
    > );
    > ```
    > *Filter kelas dan search seharusnya bekerja bersamaan — keduanya harus terpenuhi — tapi sekarang cukup salah satu yang cocok. Tolong analisa dan perbaiki logikanya."*
    >
    > AI langsung mengidentifikasi masalahnya ada pada operator `||` di antara dua kondisi, dan menjelaskan perbedaan `||` (OR) vs `&&` (AND) dalam konteks filter ini.

- **Solusi Akhir:**

    > Ternyata masalahnya sangat sederhana namun berdampak besar: operator `||` harus diganti menjadi `&&` agar kedua kondisi wajib terpenuhi sekaligus. Logika yang benar adalah:
    >
    > ```js
    > const filtered = siswa.filter(s =>
    >   s.nama.toLowerCase().includes(searchQuery.toLowerCase()) &&
    >   (selectedKelas === '' || s.kelas === selectedKelas)
    > );
    > ```
    >
    > Kondisi `(selectedKelas === '' || s.kelas === selectedKelas)` berarti: jika tidak ada filter kelas yang dipilih (string kosong), semua kelas lolos. Jika ada pilihan, hanya kelas yang cocok yang lolos. Dengan `&&`, siswa hanya muncul apabila namanya mengandung keyword DAN kelasnya sesuai filter — itulah perilaku yang diharapkan.

---

## 🎯 4. Refleksi Pribadi

*Setelah 1 pekan mengerjakan proyek ini dengan metode Vibecoding, pelajaran berharga apa yang kamu dapatkan tentang peran manusia sebagai 'Arsitek' dibandingkan AI sebagai 'Asisten Pengetik'?*

> Selama mengerjakan Aplikasi Card ini, saya menyadari bahwa perbedaan terbesar antara sekadar "memakai AI" dan benar-benar "berkolaborasi dengan AI" terletak pada siapa yang memegang keputusan arsitektur.
>
> AI sangat pandai menulis implementasi — membuat komponen, menangani props, menyusun CSS Modules dengan rapi. Namun keputusan seperti *"data harus dipisah ke file `siswa.js` yang terpisah"*, *"komponen StudentCard harus reusable dan tidak boleh hardcode"*, atau *"filter harus menggunakan AND bukan OR"* — semua keputusan itu harus datang dari saya sebagai arsitek. AI tidak bisa membuat keputusan desain tersebut tanpa diarahkan.
>
> Momen paling berkesan adalah saat menemukan bug operator `||` vs `&&`. Bug itu tidak akan pernah ditemukan oleh AI sendiri karena AI hanya menulis apa yang saya minta — dan saya tidak cukup spesifik di prompt pertama. Itu mengajarkan saya bahwa kualitas output AI berbanding lurus dengan kualitas pemikiran saya sebelum menulis prompt.
>
> Pelajaran terbesar dari satu pekan ini: **Vibecoding bukan tentang minta kode ke AI lalu menjalankannya**. Vibecoding adalah tentang berpikir seperti arsitek terlebih dahulu — merancang struktur folder, mendefinisikan batasan komponen, menentukan alur data — baru kemudian mendelegasikan penulisan kode ke AI dengan instruksi yang presisi. Manusia tetap di kemudi; AI hanya mengeksekusi.