import React, { useState, useEffect } from 'react';
import { getKaryawan } from '../services/karyawanService';
import KaryawanTable from '../components/KaryawanTable';
import { Link } from 'react-router-dom';

export default function Karyawan() {
    const [karyawanList, setKaryawanList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State untuk Pencarian dan Filter Terintegrasi
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPendidikan, setFilterPendidikan] = useState('Semua');
    const [filterGender, setFilterGender] = useState('Semua');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getKaryawan();
            setKaryawanList(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Gagal memuat data", error);
            setKaryawanList([]);
        } finally {
            setLoading(false);
        }
    };

    // Logika Filter & Pencarian yang sudah match dengan 'namakary' dan aman dari undefined
    const filteredKaryawan = karyawanList.filter((item) => {
        const nama = item?.namakary || '';
        const matchesSearch = nama.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPendidikan = filterPendidikan === 'Semua' || item?.pendidikan === filterPendidikan;
        const matchesGender = filterGender === 'Semua' || item?.jeniskelamin === filterGender;
        return matchesSearch && matchesPendidikan && matchesGender;
    });

    // Ringkasan Data Dinamis
    const totalKaryawan = karyawanList.length;
    const totalLakiLaki = karyawanList.filter(item => item?.jeniskelamin === 'Laki-laki').length;
    const totalPerempuan = karyawanList.filter(item => item?.jeniskelamin === 'Perempuan').length;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Data Karyawan</h1>
                    <p className="text-sm text-gray-500">Tugas P7 - Frontend & Backend Integration</p>
                </div>
                <Link 
                    to="/karyawan/create" 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                    + Tambah Karyawan
                </Link>
            </div>

            {/* Kotak Ringkasan Data */}
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

            {/* Panel Pencarian dan Filter */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <input
                    type="text"
                    placeholder="Cari berdasarkan nama karyawan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <div className="flex gap-4 w-full md:w-auto">
                    <select
                        value={filterPendidikan}
                        onChange={(e) => setFilterPendidikan(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Semua">Semua Pendidikan</option>
                        <option value="SMA">SMA</option>
                        <option value="D3">D3</option>
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                    </select>

                    <select
                        value={filterGender}
                        onChange={(e) => setFilterGender(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Semua">Semua Gender</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                </div>
            </div>

            {/* Komponen Tabel Karyawan */}
            <KaryawanTable karyawan={filteredKaryawan} loading={loading} />
        </div>
    );
}