import { Link, useNavigate, useParams } from "react-router-dom";
import { getLoanById, updateLoan } from "../services/loanService";
import { useEffect, useState } from "react";

const EditLoan = () => {
  // 1. STATE & ROUTER: Inisialisasi state form, tangkap ID dari URL, dan siapkan navigasi
  const [loan, setLoan] = useState({
    nama_peminjam: "",
    judul_buku: "",
    kategori: "",
    tanggal_pinjam: "",
    tanggal_kembali: "",
    status: "",
  });

  const { id } = useParams(); // Mengambil ID dari parameter URL (contoh: /peminjaman/edit/5)
  const navigate = useNavigate(); // Hook untuk berpindah halaman setelah sukses

  const [loading, setLoading] = useState(true);   // Status saat mengambil data awal
  const [saving, setSaving] = useState(false);    // Status saat tombol update diklik
  const [error, setError] = useState("");         // Menampung pesan error jika gagal

  // 2. HANDLE CHANGE: Mengubah state form secara dinamis saat user mengetik atau memilih opsi
  function handleChange(e) {
    const { name, value } = e.target;
    setLoan({ ...loan, [name]: value });
  }

  // 3. LOAD DATA (GET BY ID): Mengambil data lama berdasarkan ID saat halaman pertama kali dibuka
  useEffect(() => {
    async function loadLoan() {
      try {
        const data = await getLoanById(id);
        
        // Masukkan data lama ke state agar muncul di form. 
        // Tanggal dipotong (.split("T")[0]) agar formatnya sesuai dengan input type="date" (YYYY-MM-DD)
        setLoan({
          nama_peminjam: data.nama_peminjam || "",
          judul_buku: data.judul_buku || "",
          kategori: data.kategori || "Fiksi",
          tanggal_pinjam: data.tanggal_pinjam ? data.tanggal_pinjam.split("T")[0] : "",
          tanggal_kembali: data.tanggal_kembali ? data.tanggal_kembali.split("T")[0] : "",
          status: data.status || "Dipinjam",
        });
      } catch (error) {
        setError("Gagal memuat data peminjaman buku.");
      } finally {
        setLoading(false); // Matikan status loading setelah data selesai dimuat
      }
    }

    loadLoan();
  }, [id]);

  // 4. SUBMIT (UPDATE): Mengirim data yang telah diubah ke server/database menggunakan PATCH/PUT
  async function handleSubmit(e) {
    e.preventDefault(); // Mencegah halaman refresh otomatis saat form disubmit

    try {
      setSaving(true);
      setError("");

      // Kirim data terbaru ke database berdasarkan ID
      await updateLoan(id, { ...loan });

      alert("Data peminjaman berhasil diperbarui");
      navigate("/"); // Kembali ke halaman utama setelah sukses
    } catch (error) {
      setError("Gagal memperbarui data peminjaman.");
    } finally {
      setSaving(false);
    }
  }

  // 5. RENDER UI: Tampilan antarmuka form edit
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-xl font-bold mb-8 text-gray-800">
          Form Edit Peminjaman Buku
        </h1>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow">
          {/* Tampilkan pesan error jika ada */}
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-5 text-sm">
              {error}
            </div>
          )}

          {/* Kondisi: Jika data masih diambil dari server, tampilkan teks loading */}
          {loading ? (
            <p className="text-gray-600">Memuat data peminjaman...</p>
          ) : (
            // Jika data sudah siap, tampilkan form edit
            <form onSubmit={handleSubmit}>
              {/* Input Nama Peminjam */}
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="nama_peminjam" className="text-gray-700 text-sm font-medium">
                  Nama Peminjam
                </label>
                <input
                  type="text"
                  name="nama_peminjam"
                  id="nama_peminjam"
                  className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500"
                  value={loan.nama_peminjam}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Input Judul Buku */}
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="judul_buku" className="text-gray-700 text-sm font-medium">
                  Judul Buku
                </label>
                <input
                  type="text"
                  name="judul_buku"
                  id="judul_buku"
                  className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500"
                  value={loan.judul_buku}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Dropdown Kategori */}
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="kategori" className="text-gray-700 text-sm font-medium">
                  Kategori
                </label>
                <select
                  name="kategori"
                  id="kategori"
                  className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={loan.kategori}
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
                <label htmlFor="tanggal_pinjam" className="text-gray-700 text-sm font-medium">
                  Tanggal Pinjam
                </label>
                <input
                  type="date"
                  name="tanggal_pinjam"
                  id="tanggal_pinjam"
                  className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500"
                  value={loan.tanggal_pinjam}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Input Tanggal Kembali */}
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="tanggal_kembali" className="text-gray-700 text-sm font-medium">
                  Tanggal Kembali
                </label>
                <input
                  type="date"
                  name="tanggal_kembali"
                  id="tanggal_kembali"
                  className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500"
                  value={loan.tanggal_kembali}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Dropdown Status */}
              <div className="flex flex-col gap-1 mb-6">
                <label htmlFor="status" className="text-gray-700 text-sm font-medium">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={loan.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Dipinjam">Dipinjam</option>
                  <option value="Dikembalikan">Dikembalikan</option>
                </select>
              </div>

              {/* Tombol Aksi */}
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
                  disabled={saving}
                >
                  {saving ? "Menyimpan..." : "Update"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditLoan;