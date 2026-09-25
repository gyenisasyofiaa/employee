import { Link } from "react-router-dom";
import LoanTable from "../components/LoanTable";
import { useEffect, useState } from "react";
import {
  deleteLoan,
  getLoans,
} from "../services/loanService";

const Home = () => {
  // 1. STATE MANAGEMENT: Menyimpan data, status loading, error, dan input filter
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [status, setStatus] = useState("");

  // 2. FETCH DATA: Mengambil data peminjaman dari database saat halaman pertama kali dibuka
  useEffect(() => {
    async function loadLoans() {
      try {
        setLoading(true);
        const data = await getLoans();
        setLoans(Array.isArray(data) ? data : []);
      } catch (error) {
        setError("Gagal memuat data peminjaman.");
        setLoans([]);
      } finally {
        setLoading(false);
      }
    }

    loadLoans();
  }, []);

  // 3. HAPUS DATA: Menghapus data peminjaman berdasarkan ID dengan konfirmasi
  async function handleDelete(id) {
    const targetLoan = loans.find(
      (item) => item.id === id
    );

    if (
      !window.confirm(
        `Yakin ingin menghapus data peminjaman oleh ${targetLoan?.nama_peminjam || ''} ini?`
      )
    ) {
      return;
    }

    try {
      setError("");
      await deleteLoan(id);
      setLoans((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError("Gagal menghapus data peminjaman.");
    }
  }

  // 4. STATISTIK: Menghitung total keseluruhan dan per status untuk kartu dashboard
  const totalLoans = loans.length;
  const totalDipinjam = loans.filter(
    (item) => item?.status === "Dipinjam"
  ).length;
  const totalDikembalikan = loans.filter(
    (item) => item?.status === "Dikembalikan"
  ).length;

  // Mengambil kategori yang berbeda secara dinamis untuk opsi filter
  const kategoris = [
    ...new Set(
      loans.map((l) => l?.kategori).filter(Boolean)
    ),
  ];

  // 5. FILTER DATA: Menyaring data berdasarkan nama peminjam/judul buku, kategori, dan status
  const filteredLoans = loans.filter((loan) => {
    const namaPeminjam = loan?.nama_peminjam || "";
    const judulBuku = loan?.judul_buku || "";
    const matchSearch =
      namaPeminjam.toLowerCase().includes(search.toLowerCase()) ||
      judulBuku.toLowerCase().includes(search.toLowerCase());

    const matchKategori =
      kategori === "" ||
      loan?.kategori === kategori;

    const matchStatus =
      status === "" ||
      loan?.status === status;

    return (
      matchSearch &&
      matchKategori &&
      matchStatus
    );
  });

  // 6. RENDER TAMPILAN (UI) dengan Desain Lebih Modern
  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header & Tombol Navigasi (Tambah Peminjaman) */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Daftar Peminjaman Buku
            </h1>
            <p className="text-sm text-gray-500 mt-1">Perpustakaan Digital</p>
          </div>
          <Link 
            to="/peminjaman/create" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Peminjaman
          </Link> 
        </div>

        {/* Kotak Statistik Ringkasan dengan Desain Kartu & Ikon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Peminjaman</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalLoans}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Status Dipinjam</p>
              <p className="text-3xl font-bold text-amber-600 mt-1">{totalDipinjam}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Status Dikembalikan</p>
              <p className="text-3xl font-bold text-emerald-600 mt-1">{totalDikembalikan}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Notifikasi Error jika gagal */}
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl p-4 mb-6 text-sm flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Form Pencarian dan Filter Data yang Lebih Rapi */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              id="search"
              type="text"
              placeholder="Cari nama peminjam atau judul buku..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              id="kategori"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full md:w-44 px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              <option value="">Semua Kategori</option>
              {kategoris.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full md:w-44 px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              <option value="">Semua Status</option>
              <option value="Dipinjam">Dipinjam</option>
              <option value="Dikembalikan">Dikembalikan</option>
            </select>
          </div>
        </div>

        {/* Komponen Tabel untuk Menampilkan Data Peminjaman */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <LoanTable
            loading={loading}
            loans={filteredLoans}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;