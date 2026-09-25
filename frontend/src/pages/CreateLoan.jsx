import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createLoan } from "../services/loanService";

const CreateLoan = () => {
  const navigate = useNavigate();

  // 1. STATE FORM: Menyimpan data input peminjaman buku dengan nilai default awal
  const [form, setForm] = useState({
    nama_peminjam: "",
    judul_buku: "",
    kategori: "Fiksi", 
    tanggal_pinjam: "",
    tanggal_kembali: "",
    status: "Dipinjam",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 2. HANDLE CHANGE: Memperbarui state form secara dinamis saat user mengetik/memilih opsi
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  // 3. SUBMIT DATA: Mengirim data form baru ke backend/database
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createLoan(form);

      alert("Data peminjaman berhasil ditambahkan");
      navigate("/peminjaman");
    } catch (error) {
      setError("Terjadi kesalahan saat menambah data peminjaman");
    } finally {
      setLoading(false);
    }
  }

  // 4. RENDER UI: Tampilan form tambah peminjaman buku
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-xl font-bold mb-8 text-gray-800">
          Form Tambah Peminjaman Buku
        </h1>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow">
          {/* Pesan Error jika gagal */}
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Input Nama Peminjam */}
            <div className="flex flex-col gap-1 mb-4">
              <label
                htmlFor="nama_peminjam"
                className="text-gray-700 text-sm font-medium"
              >
                Nama Peminjam
              </label>
              <input
                type="text"
                name="nama_peminjam"
                id="nama_peminjam"
                className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={form.nama_peminjam}
                onChange={handleChange}
                placeholder="Masukkan nama peminjam"
                required
              />
            </div>

            {/* Input Judul Buku */}
            <div className="flex flex-col gap-1 mb-4">
              <label
                htmlFor="judul_buku"
                className="text-gray-700 text-sm font-medium"
              >
                Judul Buku
              </label>
              <input
                type="text"
                name="judul_buku"
                id="judul_buku"
                className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={form.judul_buku}
                onChange={handleChange}
                placeholder="Masukkan judul buku"
                required
              />
            </div>

            {/* Dropdown Kategori Buku */}
            <div className="flex flex-col gap-1 mb-4">
              <label
                htmlFor="kategori"
                className="text-gray-700 text-sm font-medium"
              >
                Kategori
              </label>
              <select
                name="kategori"
                id="kategori"
                className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={form.kategori}
                onChange={handleChange}
                required
              >
                <option value="Fiksi">Fiksi</option>
                <option value="Non-Fiksi">Non-Fiksi</option>
                <option value="Sains">Sains</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Sejarah">Sejarah</option>
              </select>
            </div>

            {/* Input Tanggal Pinjam */}
            <div className="flex flex-col gap-1 mb-4">
              <label
                htmlFor="tanggal_pinjam"
                className="text-gray-700 text-sm font-medium"
              >
                Tanggal Pinjam
              </label>
              <input
                type="date"
                name="tanggal_pinjam"
                id="tanggal_pinjam"
                className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={form.tanggal_pinjam}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Tanggal Kembali */}
            <div className="flex flex-col gap-1 mb-4">
              <label
                htmlFor="tanggal_kembali"
                className="text-gray-700 text-sm font-medium"
              >
                Tanggal Kembali
              </label>
              <input
                type="date"
                name="tanggal_kembali"
                id="tanggal_kembali"
                className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={form.tanggal_kembali}
                onChange={handleChange}
                required
              />
            </div>

            {/* Dropdown Status Peminjaman */}
            <div className="flex flex-col gap-1 mb-6">
              <label
                htmlFor="status"
                className="text-gray-700 text-sm font-medium"
              >
                Status
              </label>
              <select
                name="status"
                id="status"
                className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="Dipinjam">Dipinjam</option>
                <option value="Dikembalikan">Dikembalikan</option>
              </select>
            </div>

            {/* Tombol Aksi (Batal & Simpan) */}
            <div className="flex gap-x-2 justify-end">
              <Link
                to="/"
                className="border border-gray-300 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm font-medium transition"
              >
                Batal
              </Link>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLoan;