import "./App.css";
import "./Firebase/firebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConstAppContext from "./Context/Appcontext";
import HomePage from "./Desktop/Pages/HomePage/HomePage";
import NotFoundPage from "./Desktop/Pages/NotFoundPage/NotFoundPage";
import ProdcutPage from "./Desktop/Pages/ProductPage/ProductPage";
import TemporadasPage from "./Desktop/Pages/TemporadasPage/TemporadasPage";
import EquiposPage from "./Desktop/Pages/EquiposPage/EquiposPage";
import DestacadosPage from "./Desktop/Pages/DestacadosPage/DestacadosPage";
import SeguimientoPage from "./Desktop/Pages/SeguimientoPage/SeguimientoPage";
import CheckoutPage from "./Desktop/Pages/CheckoutPage/CheckoutPage";
import PostPaymentPage from "./Desktop/Pages/PostPaymentPage/PostPaymentPage";
import Navbar from "./Desktop/Components/Navbar/Navbar";
import Footer from "./Desktop/Components/Footer/Footer";
import PreguntasFrecuentes from "./Desktop/Components/Footer/Components/PreguntasFrecuentes/Preguntas_Frecuentes";

export default function App() {
  return (
    <ConstAppContext>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/producto/:productId" element={<ProdcutPage />} />
          <Route path="/temporadas/:Temporade" element={<TemporadasPage />} />
          <Route path="/equipos/:Equipo" element={<EquiposPage />} />
          <Route path="/destacados" element={<DestacadosPage />} />
          <Route path="/seguimiento" element={<SeguimientoPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/:postpayment" element={<PostPaymentPage />} />
          <Route
            path="/Preguntas_Frecuentes"
            element={<PreguntasFrecuentes />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ConstAppContext>
  );
}