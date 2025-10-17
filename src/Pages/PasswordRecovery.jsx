import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Logo from "../assets/Logo.png";

export default function PasswordRecovery() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Enviar instruções de recuperação");
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Header />

      <main className="flex flex-col items-center gap-8 py-10 px-4 sm:px-6 flex-grow">
      
        <div className="w-full max-w-[1344px] p-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-center sm:text-left">
          <img src={Logo} alt="Logo da Instituição" className="h-16 w-16" />
          
          <h2 className="font-bold text-[#060F2A] text-2xl sm:text-3xl lg:text-[40px]">
            Sistema Integrado de Atendimento
          </h2>
        </div>

        {/* Card */}
      
        <div className="w-full max-w-[1344px] bg-white rounded-[16px] shadow-[0_8px_16px_rgba(113,146,255,0.25)] p-6 md:p-10 flex flex-col items-center gap-6">
          <div className="text-center">
    
            <h3 className="font-bold text-[#0A1B4B] text-2xl sm:text-3xl">
              Recuperação de Senha
            </h3>
            <p className="text-[#0A1B4B] font-normal text-[16px] mt-4">
              Informe uma de suas credenciais abaixo para recuperar o acesso
            </p>
          </div>

          {/* Formulário */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl flex flex-col gap-5 mt-4"
          >
            <div>
              <h4 className="text-[20px] font-bold text-[#0F276D] mb-2 text-center sm:text-left">
                Nome completo ou E-mail
              </h4>
              <input
                id="credential"
                name="credential"
                type="text"
                placeholder="Digite seu nome completo ou e-mail"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
              />
            </div>

            <h5 className="font-normal text-center text-[16px] text-[#0A1B4B]">
              Informe seu CPF ou E-mail para enviarmos as instruções de redefinição.
            </h5>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 pt-4">
              <button
                type="submit"
                className="w-full md:w-[380px] h-[56px] flex items-center justify-center py-3 px-4 border border-[#183FB0] rounded-md cursor-pointer font-semibold text-[18px] text-[#0F276D] hover:bg-blue-600 hover:text-white bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
              >
                Enviar instruções
              </button>

              <button
                type="button"
              
                className="w-full md:w-[380px] h-[56px] flex items-center justify-center py-3 px-4 border border-[#183FB0] rounded-md cursor-pointer font-semibold text-[18px] text-[#0F276D] hover:bg-blue-600 hover:text-white bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
              >
                <a href="/" className="flex items-center">
                  Lembrei minha senha! Fazer Login
                </a>
              </button>
            </div>
          </form>

          <h5 className="font-normal mt-2 text-[16px] text-[#000000] text-center">
            Caso tenha dificuldades, entre em contato com nossa equipe.
          </h5>
        </div>
      </main>

      <Footer />
    </div>
  );
}
