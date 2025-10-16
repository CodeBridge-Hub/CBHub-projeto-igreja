import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes de Páginas
import LandingPage from "./Pages/LandingPage";
import CadastroVoluntario from "./Pages/CadastroVoluntario";
import CadastroSenha from "./Pages/CadastroSenha";
import ConfirmarCadastro from "./Pages/ConfirmarCadastro"; 

// Layouts e Utilitários: USANDO 'MainLayout' (nome antigo/desejado)
import MainLayout from "./Components/MainLayout"; 
import ScrollToTop from "./Components/ScrollToTop"; 

function App() {
    return (
        <Router>
            <ScrollToTop /> 
            <Routes>
                
                {/* Rota Home: LandingPage */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Rotas de Cadastro: Usam o MainLayout */}
                <Route element={<MainLayout />}>
                    <Route path="/cadastro" element={<CadastroVoluntario />} />
                    <Route path="/cadastro-senha" element={<CadastroSenha />} />
                    <Route path="/confirmar-cadastro" element={<ConfirmarCadastro />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App;