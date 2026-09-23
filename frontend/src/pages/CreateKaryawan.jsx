import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createKaryawan } from "../services/karyawanService";

const CreateKaryawan = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nomorkary: "",
    namakary: "",
    pendidikan: "S1", 
    jeniskelamin: "Laki-laki",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createKaryawan(form);

      alert("Karyawan berhasil ditambahkan");
      navigate("/karyawan");
    } catch (error) {
      setError("Terjadi kesalahan saat menambah data karyawan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-xl font-bold mb-8 text-gray-800">
          Form Tambah Karyawan
        </h1>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow">
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 mb-4">
              <label
                htmlFor="nomorkary"
                className="text-gray-700 text-sm font-medium"
              >
                Nomor Karyawan
              </label>
              <input
                type="text"
                name="nomorkary"
                id="nomorkary"
                className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={form.nomorkary}
                onChange={handleChange}
                placeholder="Masukkan nomor karyawan (cth: K001)"
                required
              />
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <label
                htmlFor="namakary"
                className="text-gray-700 text-sm font-medium"
              >
                Nama Karyawan
              </label>
              <input
                type="text"
                name="namakary"
                id="namakary"
                className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={form.namakary}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <label
                htmlFor="pendidikan"
                className="text-gray-700 text-sm font-medium"
              >
                Pendidikan
              </label>
              <select
                name="pendidikan"
                id="pendidikan"
                className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={form.pendidikan}
                onChange={handleChange}
                required
              >
                <option value="SMA">SMA</option>
                <option value="D3">D3</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 mb-6">
              <label
                htmlFor="jeniskelamin"
                className="text-gray-700 text-sm font-medium"
              >
                Jenis Kelamin
              </label>
              <select
                name="jeniskelamin"
                id="jeniskelamin"
                className="border border-gray-300 px-4 py-2 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={form.jeniskelamin}
                onChange={handleChange}
                required
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div className="flex gap-x-2 justify-end">
              <Link
                to="/karyawan"
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

export default CreateKaryawan;