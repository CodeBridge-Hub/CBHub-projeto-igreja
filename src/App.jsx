import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 1. Importe o Provider da mochila
import { CadastroProvider } from "./CadastroContext";
import { CadastroVoluntarioProvider } from "./CadastroVoluntarioContext";

// Componentes de Páginas
import LandingPage from "./Pages/LandingPage";
import CadastroOptions from "./Pages/CadastroOptions";
import CadastroVoluntario from "./Pages/CadastroVoluntario";
import CadastroSenha from "./Pages/CadastroSenha";
import ConfirmarCadastro from "./Pages/ConfirmarCadastro";
import CadastroPacientes from "./Pages/CadastroPacientes";
import CadastroPacientes3 from "./Pages/CadastroPacientes3";
import CadastroSenhaPacientes from "./Pages/CadastroSenhaPacientes";
import LoginIgreja from "./Pages/LoginIgreja";
import PasswordRecovery from "./Pages/PasswordRecovery";
import SecondPagePaciente from "./Pages/SecondPagePaciente";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
 feature/modify-landingPage
                    <Route path="/CadastroOptions" element={<CadastroOptions />} />
                    <Route path="/cadastro" element={<CadastroVoluntario />} />

                    {/* <Route path="/cadastro" element={<CadastroVoluntario />} /> */}

                    <Route path="/cadastro-senha" element={<CadastroSenha />} />
                    <Route path="/confirmar-cadastro" element={<ConfirmarCadastro />} />
                    
                </Route>

               {/* rotas do cadastro de paciente com o Provider */}

               <Route 
                    path="/cadastro-voluntario"
                    element={
                        <CadastroVoluntarioProvider>
                            <CadastroVoluntario />
                        </CadastroVoluntarioProvider>
                    }
                />
                <Route
                    path="/cadastro-pacientes"
                    element={
                        <CadastroProvider>
                            <CadastroPacientes />
                        </CadastroProvider>
                    }
                />
                <Route
                    path="/second-page-paciente"
                    element={
                        <CadastroProvider>
                            <SecondPagePaciente />
                        </CadastroProvider>
                    }
                />
                <Route
                    path="/cadastro-pacientes3"
                    element={
                        <CadastroProvider>
                            <CadastroPacientes3 />
                        </CadastroProvider>
                    }
                />
                 <Route
                    path="/cadastro-senha-pacientes"
                    element={
                        <CadastroProvider>
                            <CadastroSenhaPacientes />
                        </CadastroProvider>
                    }
                />

                {/* Rotas que não precisam*/}
                <Route path="/login-igreja" element={<LoginIgreja />} />
                <Route path="/password-recovery" element={<PasswordRecovery />} />

            </Routes>
             <ToastContainer position="top-right" autoClose={3000} />
        </Router>
        
    );
}

export default App;