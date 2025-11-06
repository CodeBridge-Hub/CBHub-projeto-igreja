import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logo from "../assets/Logo.png";

export default function AdministracaoGeral() {
  const navigate = useNavigate();

  const handleNavigate = (rota) => {
    navigate(rota);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-10">
        {/* Título e Logo */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 text-center sm:text-left">
          <img
            src={Logo}
            alt="Logo da Instituição"
            className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px]"
          />
          <h2 className="font-bold text-[#060F2A] text-2xl sm:text-3xl lg:text-4xl">
            Painel de Administração Geral
          </h2>
        </div>

        {/* Card central */}
        <div className="bg-white rounded-2xl shadow-[0_8px_16px_rgba(113,146,255,0.25)] p-10 w-full max-w-[600px] text-center">
          <h3 className="text-2xl font-bold text-[#0A1B4B] mb-8">
            Gerenciar Registros
          </h3>

          <div className="flex flex-col gap-6">
            <button
              onClick={() => handleNavigate("/admin/pacientes")}
              className="bg-[#0A1B4B] hover:bg-[#122a6d] text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all"
            >
              Pacientes
            </button>

            <button
              onClick={() => handleNavigate("/admin/voluntarios")}
              className="bg-[#0A1B4B] hover:bg-[#122a6d] text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all"
            >
              Voluntários
            </button>

            <button
              onClick={() => handleNavigate("/admin/funcionarios")}
              className="bg-[#0A1B4B] hover:bg-[#122a6d] text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all"
            >
              Funcionários da Igreja
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
