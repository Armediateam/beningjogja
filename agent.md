# Project Context & AI Instructions

## 1. System Directive (WAJIB DIBACA)
**Setiap kali saya memberikan prompt, instruksi, atau meminta perubahan kode, kamu WAJIB membaca seluruh isi file `agent.md` ini terlebih dahulu sebelum melakukan tindakan atau menulis kode apa pun.** Jangan pernah membuat asumsi di luar konteks file ini. 

## 2. Client & Business Data
- **Nama Brand:** Bening Villa & Bening Private Pool
- **Domain:** Beningjogja.com
- **Tagline:** Enjoy relaxation with family & friends
- **Tahun Berdiri:** 2026
- **Pendiri:** Dedy Raikhan
- **Deskripsi:** Usaha di bidang hospitality dan pariwisata di Yogyakarta. Menyediakan layanan villa dengan private pool serta penyewaan private pool per jam yang nyaman, bersih, dan terjangkau.
- **Visi Utama:** Menjadi destinasi wisata air dan pengelola villa estetik pilihan utama yang menghadirkan kebahagiaan, kesehatan, serta pelayanan ramah dengan standar fasilitas terbaik.
- **Misi Utama:** Menjaga kebersihan air agar higienis dan menyediakan hunian sementara yang nyaman, aman, serta berkesan bagi pelanggan.
- **Filosofi & Nilai:** Hospitabilitas Otentik (Menyambut tamu layaknya keluarga, tulus, hangat). Filosofi Air (Fleksibilitas dan Penyucian). Dikelola oleh profesional muda berpengalaman.
- **Kontak & Lokasi:**
  - Email: dedyraikhanarwan@gmail.com
  - Telepon/WA: 087780656710 / +62 878-7277-7596
  - Alamat: Keputren, Pleret, Bantul, Yogyakarta

## 3. Website Requirements & Scope
- **Tujuan Utama:** Reservasi villa dan private pool (Sarana Booking).
- **Jenis Layanan:** Sewa villa dan kolam renang privat (Hospitality).
- **Sistem Checkout:** Semua sistem pembayaran dan konfirmasi checkout diarahkan langsung ke WhatsApp. Tidak menggunakan payment gateway internal.

## 4. Technical & Design Guidelines
- **Tech Stack:** Gunakan Laravel Starter Kit dengan React (Inertia.js), Tailwind CSS, dan komponen dari shadcn/ui.
- **UI/UX Rules:** Terapkan layout yang *compact*, gunakan komposisi rata tengah (centered layouts), dan maksimalkan latar belakang solid white untuk menonjolkan estetika foto villa dan kolam renang.
- **Aset Logo:** Referensi logo dapat diambil dari tautan Google Drive klien (ID: 1ibpLMmDEdWJqB8m3o8KbTsNHwNnQluVe).
- **Strict Design Rule:** TIDAK BOLEH merubah desain apa pun (padding, warna, margin, dll). Semua desain harus mutlak mengikuti *default* dari shadcn/ui. Jangan pernah mengarang desain atau styling sendiri; cukup gunakan utilitas dan komponen bawaan shadcn/ui sebagaimana adanya.
