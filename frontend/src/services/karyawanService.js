import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getKaryawan() {
  const res = await api.get("/karyawan");
  return res.data;
}

export async function getKaryawanById(id) {
  const res = await api.get(`/karyawan/${id}`);
  return res.data;
}

export async function createKaryawan(data) {
  const res= await api.post("/karyawan", data);
  return res.data;
}
export async function updateKaryawan(id, data) {
  const res= await api.patch(`/karyawan/${id}`, data);
  return res.data;
}
export async function deleteKaryawan(id) {
  const res= await api.delete(`/karyawan/${id}`);
  return res.data;
}