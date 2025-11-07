import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import Logo from "../assets/Logo.png"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  colSpan = "col-span-1",
  helperText,
  value,
  onChange,
  required = false,
  isPassword = false,
  onToggleVisibility,
}) => (
  <div className={colSpan}>
    <label
      htmlFor={id}
      className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {helperText && (
      <p className="text-[15px] text-[#0F276D] mb-1">{helperText}</p>
    )}

    <div className="relative w-full">
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-10"
        value={value}
        onChange={onChange}
        required={required}
      />

      {/* ícone de olho */}
      {isPassword && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
          onClick={onToggleVisibility}
        >
          {type === "password" ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
    </div>
  </div>
);

export default function CadastroUsuario() {
  const navigate = useNavigate();

  // estado armazenado localmente
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [error, setError] = useState("");

  // estado para controlar a visibilidade de cada campo
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // função para atualizar o estado local
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //  função de envio que processo os dados locais
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Verificação de senhas
    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não conferem. Por favor, tente novamente.");
      return;
    }

    // Verificação de segurança
    if (formData.senha.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    try {
      const response = axios.post("http://localhost:3000/api/usuarios", formData)
      console.log("Usuário cadastrado com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error); 
      setError("Ocorreu um erro ao cadastrar o usuário. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center gap-8 py-10 px-4 sm:px-6 pb-20 lg:pb-40">
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
              Cadastro de Novo Usuário
            </h3>
            <h5 className="text-[#0A1B4B] font-normal text-[16px] mt-4">
              Preencha seus dados abaixo para criar uma conta.
            </h5>
          </div>

          <form
            className="max-w-4xl mx-auto mt-10 space-y-6"
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B] mb-6 text-center">
              Dados do Usuário
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-end">
              <FormField
                label="Nome completo"
                id="nome"
                placeholder="Digite seu nome e sobrenome"
                colSpan="md:col-span-2"
                value={formData.nome}
                onChange={handleChange}
                required
              />
              <FormField
                label="CPF"
                id="cpf"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleChange}
                required
              />
              <FormField
                label="E-mail"
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <FormField
                label="Senha"
                placeholder="Mínimo de 8 caracteres"
                helperText="Crie uma senha com no mínimo 8 caracteres."
                value={formData.senha}
                onChange={handleChange}
                required
                type={showPassword ? "text" : "password"}
                isPassword={true}
                onToggleVisibility={() => setShowPassword(!showPassword)}
                id="senha"
              />

              <FormField
                label="Confirmar Senha"
                id="confirmarSenha"
                placeholder="Repita sua senha"
                helperText="Repita sua senha para confirmar"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
                type={showConfirmPassword ? "text" : "password"}
                isPassword={true}
                onToggleVisibility={() =>
                setShowConfirmPassword(!showConfirmPassword)
                }
              />
            </div>

            {/* Exibição de Erro */}
            {error && (
              <p className="text-sm text-center font-semibold text-red-600">
                {error}
              </p>
            )}

            <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4 lg:gap-[24px] pt-6 border-t">
              <button
                type="submit"
                className="w-full lg:w-[612px] h-[56px] flex justify-center items-center bg-white text-[#193FB0] font-bold text-lg border border-[#193FB0] rounded-[5px] shadow-[0_8px_16px_rgba(113,146,255,0.25)] hover:bg-[#193FB0] hover:text-white transition-all duration-300"
              >
                Cadastrar
              </button>
              <button
                type="button"
                className="w-full lg:w-[612px] h-[56px] flex justify-center items-center bg-white text-[#BE3E1A] font-bold text-lg border border-[#BE3E1A] rounded-[5px] hover:bg-[#BE3E1A] hover:text-white transition-all duration-300"
                onClick={() => navigate("/")}
              >
                Cancelar
              </button>
            </div>
            <h6 className="text-center font-bold text-[16px] text-[#0A1B4B]">
              Suas informações são confidenciais e protegidas.
            </h6>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
