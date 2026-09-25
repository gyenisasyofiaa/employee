import express from "express";
import { 
  getLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
  getLoansByCategory
} from "../controllers/loanController.js";

const router = express.Router();

router.get('/peminjaman', getLoans);
router.get('/peminjaman/:id', getLoanById);
router.post('/peminjaman', createLoan);
router.patch('/peminjaman/:id', updateLoan);
router.delete('/peminjaman/:id', deleteLoan);

// Opsional jika ingin menambahkan route kategori
router.get('/peminjaman/kategori/:kategori', getLoansByCategory);

export default router;