import React, { useState } from "react";
// Header e Footer REMOVIDOS para serem injetados pelo StandardLayout
import Logo from "../assets/Logo.png"; 
import { useNavigate } from "react-router-dom"; 

const DARK_BLUE_HEX = "bg-[#253965]";
const TEXT_DARK_BLUE = "text-[#253965]";

export default function CadastroSenha() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [erro, setErro] = useState("");

  const validarSenha = (s) => {
    // A regex garante: mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(s);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro("");

    if (!validarSenha(senha)) {
      setErro("A senha não atende a todos os requisitos listados.");
      return;
    }
    
    if (senha !== repetirSenha) {
      setErro("As senhas digitadas não coincidem.");
      return;
    }

    console.log("Senha definida com sucesso! Prosseguindo...");
    navigate("/confirmar-cadastro"); 
  };

  const handleCancel = () => {
    navigate("/cadastro"); 
  };

  return (
    // Apenas o container de conteúdo
    <div className="w-full"> 
      {/* REMOVIDO: <Header /> */}

      <main className="flex-grow flex flex-col items-center gap-8 py-10 px-4 sm:px-6">
        <div className="w-full max-w-[1344px] flex flex-col sm:flex-row justify-center items-center gap-4 text-center sm:text-left">
          <img
            src={Logo}
            alt="Logo da Instituição"
            className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px]"
          />

          <h2 className="font-bold text-[#060F2A] text-2xl sm:text-3xl lg:text-4xl">
            Sistema Integrado de Atendimento
          </h2>
        </div>

        {/* Card Principal */}
        <div className="w-full max-w-[1344px] bg-white rounded-2xl shadow-[0_8px_16px_rgba(113,146,255,0.25)] p-6 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B]">
              Cadastro de Senha
            </h3>
            <h5 className="text-[#0A1B4B] font-normal text-[16px] mt-4">
              Defina uma senha segura para acessar o sistema.
            </h5>
          </div>
          
          {/* Mensagem de Erro de Validação */}
          {erro && (
            <div className="max-w-4xl mx-auto mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center font-medium">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-10 space-y-6">
            <div>
              <label
                htmlFor="senha"
                className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-2"
              >
                Insira uma senha para o login:
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="************"
                value={senha}
                onChange={(e) => setSenha(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="repetirSenha"
                className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-2"
              >
                Repita a senha:
              </label>
              <input
                type="password"
                id="repetirSenha"
                name="repetirSenha"
                placeholder="************"
                value={repetirSenha}
                onChange={(e) => setRepetirSenha(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Seção de Requisitos da Senha */}
            <div className="text-red-600 text-sm">
              <p className="font-semibold">A senha deve conter:</p>
              <ul className="list-disc list-inside ml-2">
                <li>8 caracteres no mínimo.</li>
                <li>1 Letra maiúscula.</li>
                <li>1 Letra minúscula.</li>
                <li>1 Número.</li>
              </ul>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4 lg:gap-[24px] pt-6 border-t">
              <button
                type="submit"
                className="w-full lg:w-[612px] h-[56px] flex justify-center items-center
                           bg-white text-[#193FB0] font-bold text-lg
                           border border-[#193FB0] rounded-[5px]
                           shadow-[0_8px_16px_rgba(113,146,255,0.25)]
                           hover:bg-[#193FB0] hover:text-white 
                           transition-all duration-300"
              >
                Cadastrar senha
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="w-full lg:w-[612px] h-[56px] flex justify-center items-center
                           bg-white text-[#BE3E1A] font-bold text-lg
                           border border-[#BE3E1A] rounded-[5px]
                           hover:bg-[#BE3E1A] hover:text-white 
                           transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* REMOVIDO: <Footer /> */}
    </div>
  );
}