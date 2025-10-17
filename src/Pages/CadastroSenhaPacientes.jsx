import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Logo from "../assets/Logo.png";

export default function CadastroSenha() {
  // estados para a senha e para os requisitos
  const [password, setPassword] = useState("");
  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  // função que valida a senha em tempo real
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Valida cada requisito e atualiza o estado de cada requisito
    setChecks({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
    });
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />

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
              Cadastro de Paciente/Responsável
            </h3>
            <h5 className="text-[#0A1B4B] font-normal text-[16px] mt-4">
              Atendimento social, jurídico e de saúde, rápido e integrado.
            </h5>
          </div>

          <form className="max-w-4xl mx-auto mt-10 space-y-6">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              
                value={password}
                onChange={handlePasswordChange}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Seção de Requisitos da Senha */}
            <div className="text-sm">
              <p className="font-semibold text-gray-700">
                A senha deve conter:
              </p>
              <ul className="list-none list-inside ml-2 tex">
                <li
                  className={checks.length ? "text-blue-600" : "text-red-600"}
                >
                  8 caracteres no mínimo.
                </li>
                <li
                  className={
                    checks.uppercase ? "text-blue-600" : "text-red-600"
                  }
                >
                  1 Letra maiúscula.
                </li>
                <li
                  className={
                    checks.lowercase ? "text-blue-600" : "text-red-600"
                  }
                >
                  1 Letra minúscula.
                </li>
                <li
                  className={checks.number ? "text-blue-600" : "text-red-600"}
                >
                  1 Número.
                </li>
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

      <Footer />
    </div>
  );
}
