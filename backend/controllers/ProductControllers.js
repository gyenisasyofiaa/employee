import Product from "../models/ProductModels.js";

// GET: Ambil semua data produk
export const getProducts = async(req, res) => {
  try {
    const response = await Product.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// GET: Ambil produk berdasarkan ID
export const getProductsById = async(req, res) => {
  try {
    const response = await Product.findOne({
      where: { id: req.params.id }
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// POST: Tambah produk baru
export const createProduct = async(req, res) => {
  try {
    await Product.create(req.body);
    res.status(201).json({ msg: "Created Product" });
  } catch (error) {
    console.log(error.message);
  }
}

// PATCH: Update produk berdasarkan ID
export const updateProduct = async (req, res) => {
    try {
        await Product.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Product Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

// DELETE: Hapus produk berdasarkan ID
export const deleteProduct = async (req, res) => {
    try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Product Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}

// Method baru untuk menampilkan produk berdasarkan kategori
export const getProductsByCategory = async (req, res) => {
    try {
        const response = await Product.findAll({
            where: {
                Category: req.params.Category
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};