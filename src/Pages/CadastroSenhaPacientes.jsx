import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCadastro } from "../CadastroContext";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Logo from "../assets/Logo.png";

export default function CadastroSenhaPacientes() {
  // hooks
  const navigate = useNavigate();
  const { formData, updateFormData } = useCadastro();

  // estados de senha em um unico estado local
  const [localData, setLocalData] = useState({
    senha: formData.senha || "",
    repetirSenha: "",
  });

  // estados para os requisitos
  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  // Estado para a mensagem de erro de "senhas não conferem"
  const [passwordError, setPasswordError] = useState("");

  // useEffect para rodar a validação
  // roda toda vez que localData.senha ou localData.repetirSenha mudam
  useEffect(() => {
    const newPassword = localData.senha;

    // Atualiza o checklist
    setChecks({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
    });

    // Atualiza a mensagem de confirmação
    if (localData.repetirSenha && newPassword !== localData.repetirSenha) {
      setPasswordError("As senhas não conferem.");
    } else if (
      localData.repetirSenha &&
      newPassword === localData.repetirSenha
    ) {
      setPasswordError("As senhas conferem!");
    } else {
      setPasswordError(""); // Limpa a mensagem
    }
  }, [localData.senha, localData.repetirSenha]);

  // Função handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificações de segurança antes de enviar
    if (localData.senha !== localData.repetirSenha) {
      alert("Erro: As senhas não conferem!");
      return;
    }
    if (
      !checks.length ||
      !checks.uppercase ||
      !checks.lowercase ||
      !checks.number
    ) {
      alert("Erro: A senha não cumpre todos os requisitos.");
      return;
    }

    //  Salva a senha final na mochila --> CadastroContext
    updateFormData({ senha: localData.senha });

    const finalData = { ...formData, senha: localData.senha };

    // Navega o usuário para a página de login
    navigate("/login-igreja");
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

          {/* Conectando o form ao handleSubmit */}
          <form
            className="max-w-4xl mx-auto mt-10 space-y-6"
            onSubmit={handleSubmit}
          >
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
                value={localData.senha}
                onChange={handleChange}
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
                value={localData.repetirSenha}
                onChange={handleChange}
              />
            </div>

            {/* mostrar o erro de "senhas não conferem" */}
            {passwordError && (
              <p
                className={`text-sm text-center font-semibold ${
                  passwordError === "As senhas conferem!"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {passwordError}
              </p>
            )}

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
                onClick={() => navigate("/")}
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
