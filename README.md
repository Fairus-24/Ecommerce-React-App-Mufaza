# Ecommerce React App (Mufaza)

Proyek ini adalah sebuah aplikasi ecommerce yang dikembangkan menggunakan React. Aplikasi ini dibuat menggunakan [Create React App](https://github.com/facebook/create-react-app).

## Fitur Utama

- Dibangun dengan React dan React DOM
- Menggunakan React Router untuk navigasi halaman
- Pengelolaan state dan data produk
- Struktur proyek modern untuk aplikasi web
- Dukungan pengujian menggunakan React Testing Library dan Jest
- Konfigurasi siap untuk pengembangan dan produksi

## Struktur Direktori

- `src/` – Berisi seluruh kode sumber aplikasi React
- `public/` – Berisi file-file publik dan entry point aplikasi
- `package.json` – Mendefinisikan dependensi, script, dan metadata proyek

## Dependensi Utama

Berdasarkan file `package.json`, beberapa dependensi utama yang digunakan:

- `react` ^18.3.1
- `react-dom` ^18.3.1
- `react-router-dom` ^7.0.2
- `react-scripts` 5.0.1
- `axios` ^1.7.9
- Pengujian: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jest`, dll.

## Website Demo

Aplikasi ini dapat diakses secara online di:
[https://ecommercereactappfairus.netlify.app](https://ecommercereactappfairus.netlify.app)

## Uji Coba Autentikasi

Untuk mencoba fitur autentikasi pada aplikasi ini, kamu dapat menggunakan kredensial berikut:

- **Email:**
  ```bash
  john@gmail.com
  ```
- **Password:**
  ```bash
  m38rmF$
  ```

Silakan login dengan data di atas untuk menguji proses autentikasi.

## Cara Instalasi & Menjalankan

1. **Clone repository**
   ```bash
   git clone https://github.com/Fairus-24/Ecommerce-React-App-Mufaza.git
   cd Ecommerce-React-App-Mufaza
   ```

2. **Install dependensi**
   ```bash
   npm install
   ```

3. **Jalankan aplikasi**
   ```bash
   npm start
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat aplikasi.

## Script yang Tersedia

- `npm start` – Menjalankan aplikasi dalam mode pengembangan.
- `npm test` – Menjalankan unit test dengan React Testing Library.
- `npm run build` – Membuild aplikasi untuk produksi.
- `npm run eject` – Mengekstrak konfigurasi build (tidak dapat dibatalkan).

## Testing

Aplikasi ini sudah terkonfigurasi untuk testing menggunakan React Testing Library dan Jest. Jalankan perintah `npm test` untuk mulai melakukan pengujian.

## Deployment

Aplikasi dapat dideploy ke berbagai layanan hosting web statis seperti Vercel, Netlify, GitHub Pages, dll. Gunakan script `npm run build` untuk menghasilkan build produksi.

## Dokumentasi Tambahan

Untuk mempelajari lebih lanjut tentang Create React App dan fitur-fitur React, silakan kunjungi:
- [Dokumentasi React](https://reactjs.org/)
- [Dokumentasi Create React App](https://create-react-app.dev/docs/getting-started/)
