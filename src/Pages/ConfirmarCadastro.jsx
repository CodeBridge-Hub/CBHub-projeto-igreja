import React from 'react';
import Logo from "../assets/Logo.png";
import TelaFinal from "../assets/TelaFinal.png"; 
// Header e Footer REMOVIDOS para serem injetados pelo StandardLayout
import { Link } from "react-router-dom"; 

const ConfirmarCadastro = () => { 
  return (
    <div className="w-full font-sans">

      {/* REMOVIDO: <Header activeLink="Ação social" /> */}

      {/* TÍTULO */}
      <div className="w-full max-w-7xl mx-auto py-8 px-4 flex items-center justify-center">
        <img src={Logo} alt="Logo" className="w-12 h-12 object-contain mr-3" />
        <h1 className="text-2xl font-bold text-[#253965]">Sistema Integrado de Atendimento</h1>
      </div>

      {/* CONTEÚDO DE CONFIRMAÇÃO */}
      <main className="flex-grow flex justify-center items-center pb-12 px-4">
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-8 md:p-10 border border-gray-200">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Cadastro de Voluntário Concluído!</h3>
            <p className="text-gray-600 text-lg font-medium">
                Sua inscrição foi enviada com sucesso!
            </p>
            <p className="text-gray-500 text-sm">
              Agradecemos seu interesse em se juntar a nós. A administração entrará em contato em breve para os próximos passos.
            </p>
            <img src={TelaFinal} alt="Confirmação" className="mx-auto mt-6 w-48 opacity-90" />
          </div>

          <div className="flex flex-col sm:flex-row w-full pt-10 mt-10 border-t space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Link para a Home */}
            <Link to="/" className="w-full">
              <button
                type="button"
                className="w-full py-2.5 px-4 text-sm font-medium rounded-md text-white bg-[#253965] hover:bg-[#1d2e52] transition"
              >
                Voltar para a Home
              </button>
            </Link>
            {/* Link para fazer Login/Revisar */}
            <Link to="/cadastro" className="w-full">
              <button
                type="button"
                className="w-full py-2.5 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition"
              >
                Ir para a tela de Login
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmarCadastro;