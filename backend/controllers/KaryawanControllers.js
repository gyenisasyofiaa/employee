import Karyawan from "../models/KaryawanModels.js";

// GET: Ambil semua data karyawan
export const getKaryawan = async (req, res) => {
  try {
    const response = await Karyawan.findAll();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET: Ambil data karyawan berdasarkan ID
export const getKaryawanById = async (req, res) => {
  try {
    const response = await Karyawan.findOne({
      where: {
        idkary: req.params.id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST: Tambah data karyawan baru
export const createKaryawan = async (req, res) => {
  try {
    // Ambil data karyawan terakhir
    const lastKaryawan = await Karyawan.findOne({
      order: [["idkary", "DESC"]],
    });

    // Tentukan nomor berikutnya
    let nextNumber = 1;

    if (lastKaryawan) {
      nextNumber = lastKaryawan.idkary + 1;
    }

    // Buat nomor karyawan
    const nomorkary = `K${String(nextNumber).padStart(3, "0")}`;

    // Simpan data karyawan
    await Karyawan.create({
      nomorkary,
      namakary: req.body.namakary,
      jeniskelamin: req.body.jeniskelamin,
      jabatan: req.body.jabatan,
      pendidikan: req.body.pendidikan,
    });

    res.status(201).json({
      msg: "Karyawan Created Successfully",
      nomorkary,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// PATCH: Update data karyawan berdasarkan ID
export const updateKaryawan = async (req, res) => {
  try {
    await Karyawan.update(req.body, {
      where: {
        idkary: req.params.id,
      },
    });

    res.status(200).json({
      msg: "Karyawan Updated Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE: Hapus data karyawan berdasarkan ID
export const deleteKaryawan = async (req, res) => {
  try {
    await Karyawan.destroy({
      where: {
        idkary: req.params.id,
      },
    });

    res.status(200).json({
      msg: "Karyawan Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};