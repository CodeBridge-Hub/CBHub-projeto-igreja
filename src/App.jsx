import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes de Páginas
import LandingPage from "./Pages/LandingPage";
import CadastroVoluntario from "./Pages/CadastroVoluntario";
import CadastroSenha from "./Pages/CadastroSenha";
import ConfirmarCadastro from "./Pages/ConfirmarCadastro";
import CadastroPacientes from "./Pages/CadastroPacientes";
import CadastroPacientes3 from "./Pages/CadastroPacientes3";
import CadastroSenhaPacientes from "./Pages/CadastroSenhaPacientes";
import LoginIgreja from "./Pages/LoginIgreja";
import PasswordRecovery from "./Pages/PasswordRecovery";
import SecondPagePaciente from "./Pages/SecondPagePaciente";

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

                    {/* Rota das novas páginas */}
                    <Route path="/cadastro-pacientes" element={<CadastroPacientes />} />
                    <Route path="/cadastro-pacientes3" element={<CadastroPacientes3 />} />
                    <Route path="/cadastro-senha-pacientes" element={<CadastroSenhaPacientes />} />
                    <Route path="/login-igreja" element={<LoginIgreja />} />
                    <Route path="/password-recovery" element={<PasswordRecovery />} />
                    <Route path="/second-page-paciente" element={<SecondPagePaciente />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App;