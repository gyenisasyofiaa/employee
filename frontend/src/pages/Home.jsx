import { Link } from "react-router-dom";
import KaryawanTable from "../components/KaryawanTable";
import { useEffect, useState } from "react";
import {
  deleteKaryawan,
  getKaryawan,
} from "../services/karyawanService";

const Home = () => {
  const [karyawans, setKaryawans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [jeniskelamin, setJeniskelamin] = useState("");

  useEffect(() => {
    async function loadKaryawan() {
      try {
        setLoading(true);
        const data = await getKaryawan();
        setKaryawans(Array.isArray(data) ? data : []);
      } catch (error) {
        setError("Gagal memuat data karyawan.");
        setKaryawans([]);
      } finally {
        setLoading(false);
      }
    }

    loadKaryawan();
  }, []);

  async function handleDelete(id) {
    const targetKaryawan = karyawans.find(
      (item) => item.idkary === id
    );

    if (
      !window.confirm(
        `Yakin ingin menghapus data karyawan ${targetKaryawan?.nomorkary || ''} ini?`
      )
    ) {
      return;
    }

    try {
      setError("");
      await deleteKaryawan(id);
      setKaryawans((prev) => prev.filter((item) => item.idkary !== id));
    } catch (error) {
      setError("Gagal menghapus data karyawan.");
    }
  }


  const totalKaryawan = karyawans.length;
  const totalLakiLaki = karyawans.filter(
    (item) => item?.jeniskelamin === "Laki-laki"
  ).length;
  const totalPerempuan = karyawans.filter(
    (item) => item?.jeniskelamin === "Perempuan"
  ).length;

  // Mengambil jenis kelamin yang berbeda secara dinamis untuk opsi filter
  const jeniskelamins = [
    ...new Set(
      karyawans.map((k) => k?.jeniskelamin).filter(Boolean)
    ),
  ];

  // Filter aman
  const filteredKaryawan = karyawans.filter((karyawan) => {
    const nama = karyawan?.namakary || "";
    const matchSearch = nama.toLowerCase().includes(search.toLowerCase());

    const matchPendidikan =
      pendidikan === "" ||
      karyawan?.pendidikan === pendidikan;

    const matchJenisKelamin =
      jeniskelamin === "" ||
      karyawan?.jeniskelamin === jeniskelamin;

    return (
      matchSearch &&
      matchPendidikan &&
      matchJenisKelamin
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-10">
        <div className="mb-5 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Manajemen Data Karyawan
            </h1>
            <p className="text-sm text-gray-500">Tugas P7 - Frontend & Backend Integration</p>
          </div>
          <div className="flex gap-2">
            <Link 
              to="/karyawan/laporan" 
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
            >
              Lihat Laporan
            </Link>
            <Link 
              to="/karyawan/create" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              + Tambah Karyawan
            </Link>
        </div>  
      </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <p className="text-sm text-gray-500">Total Karyawan</p>
            <p className="text-2xl font-bold text-gray-800">{totalKaryawan}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-indigo-500">
            <p className="text-sm text-gray-500">Karyawan Laki-laki</p>
            <p className="text-2xl font-bold text-gray-800">{totalLakiLaki}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-pink-500">
            <p className="text-sm text-gray-500">Karyawan Perempuan</p>
            <p className="text-2xl font-bold text-gray-800">{totalPerempuan}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-5">
            {error}
          </div>
        )}

        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col gap-3 md:flex-row md:items-end justify-between">
          <div className="flex-1">
            <label
              htmlFor="search"
              className="block text-sm text-gray-700 mb-1"
            >
              Cari Karyawan
            </label>
            <input
              id="search"
              type="text"
              placeholder="🔍 Cari nama karyawan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 bg-white px-3 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="pendidikan"
              className="block text-sm text-gray-700 mb-1"
            >
              Pendidikan
            </label>
            <select
              id="pendidikan"
              value={pendidikan}
              onChange={(e) => setPendidikan(e.target.value)}
              className="border border-gray-300 bg-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua</option>
              <option value="SMA">SMA</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="jeniskelamin"
              className="block text-sm text-gray-700 mb-1"
            >
              Jenis Kelamin
            </label>
            <select
              id="jeniskelamin"
              value={jeniskelamin}
              onChange={(e) => setJeniskelamin(e.target.value)}
              className="border border-gray-300 bg-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Jenis Kelamin</option>
              {jeniskelamins.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <KaryawanTable
          loading={loading}
          karyawan={filteredKaryawan}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Home;