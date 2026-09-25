import Peminjaman from "../models/loanModel.js";

// GET: Ambil semua data peminjaman
export const getLoans = async (req, res) => {
  try {
    const response = await Peminjaman.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

// GET: Ambil data peminjaman berdasarkan ID
export const getLoanById = async (req, res) => {
  try {
    const response = await Peminjaman.findOne({
      where: { id: req.params.id }
    });
    if (!response) return res.status(404).json({ msg: "Data peminjaman tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

// POST: Tambah data peminjaman baru
export const createLoan = async (req, res) => {
  try {
    await Peminjaman.create(req.body);
    res.status(201).json({ msg: "Loan Created" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}

// PATCH: Update data peminjaman berdasarkan ID
export const updateLoan = async (req, res) => {
    try {
        await Peminjaman.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Loan Updated" });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
}

// DELETE: Hapus data peminjaman berdasarkan ID
export const deleteLoan = async (req, res) => {
    try {
        await Peminjaman.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Loan Deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

// Method tambahan untuk menampilkan data peminjaman berdasarkan kategori buku
export const getLoansByCategory = async (req, res) => {
    try {
        const response = await Peminjaman.findAll({
            where: {
                kategori: req.params.kategori
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
