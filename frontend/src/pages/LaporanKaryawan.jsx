import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getKaryawan } from '../services/karyawanService';

export default function LaporanKaryawan() {
    const [karyawanList, setKaryawanList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchLaporan() {
            try {
                setLoading(true);
                const data = await getKaryawan();
                setKaryawanList(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('Gagal memuat data laporan karyawan.');
            } finally {
                setLoading(false);
            }
        }
        fetchLaporan();
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-gray-600">Memuat laporan...</div>;
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto mt-10 bg-red-100 text-red-700 p-4 rounded text-sm">
                {error}
            </div>
        );
    }

    const totalKaryawan = karyawanList.length;
    const totalLakiLaki = karyawanList.filter(item => item?.jeniskelamin === 'Laki-laki').length;
    const totalPerempuan = karyawanList.filter(item => item?.jeniskelamin === 'Perempuan').length;

    const countPendidikan = (jenjang) => {
        return karyawanList.filter(item => {
            const pendidikanKaryawan = item?.pendidikan || '';
            return pendidikanKaryawan.toUpperCase().includes(jenjang);
        }).length;
    };

    const listPendidikan = ['SMA', 'D3', 'S1', 'S2', 'S3'];

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-100">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Laporan Karyawan</h1>
                    <p className="text-sm text-gray-500">Soal 3 - Kategori Sukar (P7)</p>
                </div>
                <Link 
                    to="/karyawan" 
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition"
                >
                    ← Kembali ke Daftar Karyawan
                </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow mb-6 border-l-4 border-blue-600">
                <h2 className="text-sm text-gray-500 font-medium">Total Karyawan Keseluruhan</h2>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalKaryawan}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">
                    <h2 className="text-sm text-gray-500 font-medium">Karyawan Laki-laki</h2>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{totalLakiLaki}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-pink-500">
                    <h2 className="text-sm text-gray-500 font-medium">Karyawan Perempuan</h2>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{totalPerempuan}</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 bg-gray-50 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">Ringkasan Berdasarkan Pendidikan</h2>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b text-gray-700 text-sm">
                            <th className="p-3 font-semibold">Pendidikan</th>
                            <th className="p-3 font-semibold text-right">Jumlah Karyawan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPendidikan.map((pend) => (
                            <tr key={pend} className="border-b hover:bg-gray-50">
                                <td className="p-3 text-gray-800 font-medium">{pend}</td>
                                <td className="p-3 text-gray-800 text-right font-bold">{countPendidikan(pend)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}