import { Link } from "react-router-dom";

const KaryawanTable = ({ loading, karyawan = [], onDelete }) => {
  return (
    <div className="max-w-7xl mx-auto border border-slate-200 rounded-md overflow-x-auto bg-white shadow">
      <table className="w-full">
        <thead className="text-slate-900 text-left text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
          <tr className="bg-slate-50">
            <th className="px-4 py-3.5">No</th>
            <th className="px-4 py-3.5">No Karyawan</th>
            <th className="px-4 py-3.5">Nama Karyawan</th>
            <th className="px-4 py-3.5">Pendidikan</th>
            <th className="px-4 py-3.5">Jenis Kelamin</th>
            <th className="px-4 py-3.5">Action</th>
          </tr>
        </thead>

        <tbody className="text-sm divide-y divide-slate-200">
          {loading ? (
            <tr>
              <td className="px-4 py-4 text-center" colSpan={6}>
                Loading...
              </td>
            </tr>
          ) : !karyawan || karyawan.length === 0 ? (
            <tr>
              <td className="px-4 py-4 text-center" colSpan={6}>
                Belum ada data karyawan
              </td>
            </tr>
          ) : (
            karyawan.map((karyawan, index) => (
              <tr
                className="hover:bg-slate-50"
                key={karyawan?.idkary || index}
              >
                <td className="px-4 py-4 font-medium text-slate-900">
                  {index + 1}
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {karyawan?.nomorkary}
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {karyawan?.namakary}
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {karyawan?.pendidikan}
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {karyawan?.jeniskelamin}
                </td>

                <td className="px-4 py-4 flex items-center gap-2">
                  <Link
                    to={`/karyawan/${karyawan?.idkary}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium"
                  >
                    Detail
                  </Link>

                  <Link
                    to={`/karyawan/edit/${karyawan.idkary}`} // Sesuaikan dengan path edit di App.jsx Anda
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs font-medium transition"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => onDelete(karyawan?.idkary)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KaryawanTable;