import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateLoan from "./pages/CreateLoan";
import EditLoan from "./pages/EditLoan";

const App = () => {
  return(
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/peminjaman" element={<Home />}/>
        <Route path="/peminjaman/create" element={<CreateLoan />}/>
        <Route path="/peminjaman/edit/:id" element={<EditLoan />}/>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
