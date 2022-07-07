import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomeAdm from "./routes/admin/Home/";
import HomeUser from "./routes/user/Home/";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeUser />} />
        <Route path="admin" element={<HomeAdm />} />

        <Route path="*" element={<h3>Erro 404: Página não encontrada!</h3>} />
      </Routes>
    </BrowserRouter>
  );
}
