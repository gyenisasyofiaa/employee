import { Link, useNavigate, useParams } from "react-router-dom";
import { getKaryawanById, updateKaryawan } from "../services/karyawanService";
import { useEffect, useState } from "react";

const EditKaryawan = () => {
  const [karyawan, setKaryawan] = useState({
    namakary: "",
    pendidikan: "",
    jeniskelamin: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setKaryawan({ ...karyawan, [name]: value });
  }

  useEffect(() => {
    async function loadKaryawan() {
      try {
        const data = await getKaryawanById(id);
        setKaryawan(data);
      } catch (error) {
        setError("Gagal memuat data karyawan.");
      } finally {
        setLoading(false);
      }
    }

    loadKaryawan();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await updateKaryawan(id, {...karyawan});

      navigate("/karyawan");
    } catch (error) {
      setError("Gagal memperbarui data karyawan.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-xl font-bold mb-8 text-gray-800">
          Form Edit Karyawan
        </h1>

        <div className="w-1/2">
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-5">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-gray-600">Memuat data Karyawan...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 mb-3">
                <label
                  htmlFor="namakary"
                  className="text-gray-800"
                >
                  Nama Karyawan
                </label>

                <input
                  type="text"
                  name="namakary"
                  id="namakary"
                  className="border border-gray-500 px-4 py-2 text-sm rounded outline-none"
                  value={karyawan.namakary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 mb-3">
                <label
                  htmlFor="pendidikan"
                  className="text-gray-800"
                >
                  Pendidikan
                </label>

                <input
                  type="text"
                  name="pendidikan"
                  id="pendidikan"
                  placeholder="S1 Teknik Informatika"
                  className="border border-gray-500 px-4 py-2 text-sm rounded outline-none placeholder:font-semibold placeholder:text-gray-400"
                  value={karyawan.pendidikan}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 mb-3">
                <label
                  htmlFor="jeniskelamin"
                  className="text-gray-800"
                >
                  Jenis Kelamin
                </label>

                <input
                  type="text"
                  name="jeniskelamin"
                  id="jeniskelamin"
                  className="border border-gray-500 px-4 py-2 text-sm rounded outline-none"
                  value={karyawan.jeniskelamin}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex gap-x-1 justify-end">
                <Link
                  to="/"
                  className="border border-gray-600 bg-gray-200 text-gray-800 px-3 py-2 rounded hover:bg-red-600 hover:border-red-600 hover:text-white"
                >
                  Batal
                </Link>

                <button
                  className="bg-blue-600 text-white px-3 py-2 rounded transition hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
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

export default EditKaryawan;