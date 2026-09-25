import { Link } from "react-router-dom";

const LoanTable = ({ loading, loans = [], onDelete }) => {
  return (
    <div className="max-w-7xl mx-auto border border-slate-200 rounded-md overflow-x-auto bg-white shadow">
      <table className="w-full">
        <thead className="text-slate-900 text-left text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
          <tr className="bg-slate-50">
            <th className="px-4 py-3.5">No</th>
            <th className="px-4 py-3.5">Nama Peminjam</th>
            <th className="px-4 py-3.5">Judul Buku</th>
            <th className="px-4 py-3.5">Kategori</th>
            <th className="px-4 py-3.5">Tanggal Pinjam</th>
            <th className="px-4 py-3.5">Tanggal Kembali</th>
            <th className="px-4 py-3.5">Status</th>
            <th className="px-4 py-3.5">Action</th>
          </tr>
        </thead>

        <tbody className="text-sm divide-y divide-slate-200">
          {loading ? (
            <tr>
              <td className="px-4 py-4 text-center" colSpan={8}>
                Loading...
              </td>
            </tr>
          ) : !loans || loans.length === 0 ? (
            <tr>
              <td className="px-4 py-4 text-center" colSpan={8}>
                Belum ada data peminjaman
              </td>
            </tr>
          ) : (
            loans.map((loan, index) => (
              <tr
                className="hover:bg-slate-50"
                key={loan?.id || index}
              >
                <td className="px-4 py-4 font-medium text-slate-900">
                  {index + 1}
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {loan?.nama_peminjam}
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {loan?.judul_buku}
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {loan?.kategori}
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {loan?.tanggal_pinjam}
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {loan?.tanggal_kembali}
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {loan?.status}
                </td>

                <td className="px-4 py-4 flex items-center gap-2">
                  <Link
                    to={`/peminjaman/detail/${loan?.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium"
                  >
                    Detail
                  </Link>

                  <Link
                    to={`/peminjaman/edit/${loan?.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs font-medium transition"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => onDelete(loan?.id)}
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

export default LoanTable;