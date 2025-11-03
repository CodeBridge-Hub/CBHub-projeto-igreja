import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Providers
import { CadastroProvider } from "./CadastroContext";
import { CadastroEspecialProvider } from "./context/CadastroEspecialContext";
import { CadastroVoluntarioProvider } from "./CadastroVoluntarioContext";

// Componentes de Proteção de Rota
import PrivateRoute, { UserRoute } from "./components/PrivateRoute";

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
import CadastroEspecial from "./Pages/CadastroEspecial";
import CadastroUsuario from "./Pages/CadastroUsuario";
import Pacientes from "./Pages/Pacientes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Layouts e Utilitários: USANDO 'MainLayout' (nome antigo/desejado)
import MainLayout from "./components/MainLayout";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Rota Home: LandingPage */}
        <Route path="/" element={<LandingPage />} />

        {/* Rotas que usam MainLayout - Protegidas */}
        <Route element={<MainLayout />}>
          <Route 
            path="/CadastroOptions" 
            element={
              <PrivateRoute>
                <CadastroOptions />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/cadastro-voluntario" 
            element={
              <PrivateRoute>
                <CadastroVoluntarioProvider>
                  <CadastroVoluntario />
                </CadastroVoluntarioProvider>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/cadastro-senha" 
            element={
              <PrivateRoute>
                <CadastroSenha />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/confirmar-cadastro" 
            element={
              <PrivateRoute>
                <ConfirmarCadastro />
              </PrivateRoute>
            } 
          />
        </Route>

        {/* Rotas do cadastro de paciente com o Provider - Acessíveis por ADMIN e USER */}
        <Route
          path="/cadastro-pacientes"
          element={
            <UserRoute>
              <CadastroProvider>
                <CadastroPacientes />
              </CadastroProvider>
            </UserRoute>
          }
        />
        <Route
          path="/second-page-paciente"
          element={
            <UserRoute>
              <CadastroProvider>
                <SecondPagePaciente />
              </CadastroProvider>
            </UserRoute>
          }
        />
        <Route
          path="/cadastro-pacientes3"
          element={
            <UserRoute>
              <CadastroProvider>
                <CadastroPacientes3 />
              </CadastroProvider>
            </UserRoute>
          }
        />
        <Route
          path="/cadastro-senha-pacientes"
          element={
            <PrivateRoute>
              <CadastroProvider>
                <CadastroSenhaPacientes />
              </CadastroProvider>
            </PrivateRoute>
          }
        />
        
        {/* Rota do cadastro especial - Protegida */}
        <Route
          path="/cadastro-especial"
          element={
            <PrivateRoute>
              <CadastroEspecialProvider>
                <CadastroEspecial />
              </CadastroEspecialProvider>
            </PrivateRoute>
          }
        />
        <Route
          path="/pacientes"
          element={
            <PrivateRoute>
                <Pacientes />
            </PrivateRoute>
          }
        />

        {/* Rotas que não precisam de layout */}
        <Route path="/login-igreja" element={<LoginIgreja />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
