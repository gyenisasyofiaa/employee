import express from "express";
import { 
  getKaryawan,
  getKaryawanById,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan
} from "../controllers/KaryawanControllers.js";

const router = express.Router();

router.get('/karyawan', getKaryawan);
router.get('/karyawan/:id', getKaryawanById);
router.post('/karyawan', createKaryawan);
router.patch('/karyawan/:id', updateKaryawan);
router.delete('/karyawan/:id', deleteKaryawan);

export default router;