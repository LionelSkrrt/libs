# 📚 Perpustakaan - REST API Peminjaman Buku

REST API sederhana untuk layanan pencatatan transaksi peminjaman buku perpustakaan oleh anggota, dilengkapi dengan operasi CRUD dan fitur filter query.

## 🔗 Tautan Penting
- **Base URL Vercel**: `https://<nama-proyek-anda>.vercel.app`
- **Repository GitHub**: `https://github.com/<username>/<nama-repo>`

---

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

---

## 📋 Struktur Data / Skema Database (`loans`)

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BIGSERIAL | Primary Key, Auto Increment |
| `member_name` | VARCHAR(100) | Nama anggota (Wajib) |
| `member_id` | VARCHAR(50) | Nomor induk anggota (Wajib) |
| `book_title` | VARCHAR(255) | Judul buku yang dipinjam (Wajib) |
| `book_isbn` | VARCHAR(50) | Nomor ISBN buku (Opsional) |
| `loan_date` | DATE | Tanggal peminjaman (Default: Tanggal saat ini) |
| `due_date` | DATE | Tenggat waktu pengembalian (Wajib) |
| `return_date` | DATE | Tanggal aktual buku dikembalikan |
| `status` | VARCHAR(20) | Status: `'Dipinjam'`, `'Kembali'`, `'Terlambat'` |
| `notes` | TEXT | Catatan tambahan |
| `created_at` | TIMESTAMPTZ | Waktu data dibuat |
| `updated_at` | TIMESTAMPTZ | Waktu data terakhir diperbarui |

---

## 🚀 Endpoint API & Contoh Request / Response

### 1. Menampilkan Semua Peminjaman (Filter Query)
- **URL**: `GET /api/loans`
- **Query Params**: `status`, `member_id`, `book_title`
- **Contoh Request**: `GET /api/loans?status=Terlambat`

### 2. Menampilkan Detail Peminjaman
- **URL**: `GET /api/loans/:id`

### 3. Menambahkan Peminjaman Baru
- **URL**: `POST /api/loans`
- **Body**:
```json
{
  "member_name": "Siti Rahma",
  "member_id": "LIB-202402",
  "book_title": "The Pragmatic Programmer",
  "due_date": "2024-10-20"
}
```

### 4. Memperbarui Data Peminjaman
- **URL**: `PUT /api/loans/:id`
- **Body**:
```json
{
  "status": "Kembali",
  "return_date": "2024-10-15"
}
```

### 5. Menghapus Data Peminjaman
- **URL**: `DELETE /api/loans/:id`

---

## 💻 Panduan Instalasi Lokal

1. **Install Dependensi**
   ```bash
   npm install
   ```

2. **Konfigurasi Environment Variable**
   Salin `.env.example` ke `.env` lalu isi kredensial Supabase Anda.

3. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
