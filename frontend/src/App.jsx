import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Karyawan from "./pages/Karyawan";
import CreateKaryawan from "./pages/CreateKaryawan";
import DetailKaryawan from "./pages/DetailKaryawan";
import EditKaryawan from "./pages/EditKaryawan";
import LaporanKaryawan from "./pages/LaporanKaryawan";

const App = () => {
  return(
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/karyawan" element={<Home />}/>
        <Route path="/karyawan" element={<Karyawan />}/>
        <Route path="/karyawan/create" element={<CreateKaryawan />}/>
        <Route path="/karyawan/edit/:id" element={<EditKaryawan />}/>
        <Route path="/karyawan/:id/" element={<DetailKaryawan />}/>
        <Route path="/karyawan/laporan" element={<LaporanKaryawan />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
