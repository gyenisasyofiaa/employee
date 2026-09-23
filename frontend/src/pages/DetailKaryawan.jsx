import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getKaryawanById } from "../services/karyawanService";

const DetailKaryawan = () => {
  const { id } = useParams();
  const [karyawan, setKaryawan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDetail() {
      try {
        const data = await getKaryawanById(id);
        setKaryawan(data);
      } catch (error) {
        setError("Gagal memuat data detail karyawan.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Memuat data...</div>;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-red-100 text-red-700 p-4 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          Detail Informasi Karyawan
        </h2>

        {karyawan ? (
          <div className="space-y-4 text-gray-700">
            <div>
              <span className="block text-sm text-gray-500 font-medium">Nomor Karyawan</span>
              <p className="text-lg font-semibold">{karyawan.nomorkary}</p>
            </div>
            <div>
              <span className="block text-sm text-gray-500 font-medium">Nama Lengkap</span>
              <p className="text-lg font-semibold">{karyawan.namakary}</p>
            </div>
            <div>
              <span className="block text-sm text-gray-500 font-medium">Pendidikan Terakhir</span>
              <p className="text-lg font-semibold">{karyawan.pendidikan}</p>
            </div>
            <div>
              <span className="block text-sm text-gray-500 font-medium">Jenis Kelamin</span>
              <p className="text-lg font-semibold">{karyawan.jeniskelamin}</p>
            </div>
          </div>
        ) : (
          <p>Data karyawan tidak ditemukan.</p>
        )}

        <div className="mt-8">
          <Link
            to="/karyawan"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            ← Kembali ke Daftar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailKaryawan;