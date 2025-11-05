import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Logo from "../assets/Logo.png";
import Footer from "../Components/Footer";

// Componente com value, onChange e disabled para controlar
const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  colSpan = "col-span-1",
  helperText,
  value,
  onChange,
  disabled = false,
  required = false,
}) => (
  <div className={colSpan}>
    <label
      htmlFor={id}
      className={`block text-lg md:text-[20px] font-bold mb-1 ${
        disabled ? "text-gray-400" : "text-[#0F276D]"
      }`}
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {helperText && (
      <p className="text-[15px] text-[#0F276D] mb-1">{helperText}</p>
    )}
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
    />
  </div>
);

const RadioGroup = ({ label, name, options, selectedValue, onChange }) => (
  <div>
    <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-2">
      {label}
    </label>
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            className="mr-2 w-5 h-5 accent-[#1D4BD1]"
          />
          {option.label}
        </label>
      ))}
    </div>
  </div>
);

export default function DependentesGeral() {
  const navigate = useNavigate();

  // armazena todos os dados do formulário
  const [formData, setFormData] = useState({
    // Dependente
    nomeDependente: "",
    dataNascimento: "",
    // Responsável
    usarMeusDados: "nao",
    nomeResponsavel: "",
    telefoneResponsavel: "",
    // Saúde
    alergia: "nao",
    alergiaQual: "",
    condicaoSaude: "nao",
    condicaoSaudeQual: "",
    observacoes: "",
  });

  // estado de erro para validação
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // checkbox Usar meus dados
    if (name === "usarMeusDados") {
      const usar = value === "sim";
      setFormData((prev) => ({
        ...prev,
        usarMeusDados: value,
        nomeResponsavel: usar ? "Maria da Luz Silva (Meu Usuário)" : "",
        telefoneResponsavel: usar ? "98 9 1234-5678 (Meu Telefone)" : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // função para salvar localmente
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // validação dos campos obrigatórios
    if (!formData.nomeDependente || !formData.dataNascimento) {
      setError(
        "Nome completo e Data de nascimento do dependente são obrigatórios."
      );
      return;
    }
    if (
      formData.usarMeusDados === "nao" &&
      (!formData.nomeResponsavel || !formData.telefoneResponsavel)
    ) {
      setError(
        "Nome e Telefone do responsável são obrigatórios se você não usar seus dados."
      );
      return;
    }

    // navigate("/");
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center gap-8 py-10 px-4 sm:px-6 pb-20 lg:pb-40">
        {" "}
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
        {/* Card Principal do formulário */}
        <div className="w-full max-w-[1344px] bg-white rounded-2xl shadow-[0_8px_16px_rgba(113,146,255,0.25)] p-6 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B]">
              Cadastro de Dependente para Atendimento Geral
            </h3>
            <h5 className="text-[#0A1B4B] font-normal text-[16px] mt-4">
              Preencha os dados básicos do dependente para o atendimento.
              <br />
              Campos com * no fim significam campos obrigatórios.
            </h5>
          </div>

          <form className="space-y-10" onSubmit={handleSubmit}>
            {/* dados do dependente */}
            <section>
              <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B] mb-6 text-center">
                Dados do Dependente
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label="Nome completo"
                  id="nomeDependente"
                  name="nomeDependente"
                  placeholder="Nome e sobrenomes do dependente"
                  colSpan="md:col-span-3"
                  value={formData.nomeDependente}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Data de nascimento"
                  id="dataNascimento"
                  name="dataNascimento"
                  placeholder="DD/MM/AAAA"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  required
                />
              </div>
            </section>

            {/* dados do responsável */}
            <section>
              <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B] mb-6 text-center">
                Dados do Responsável
              </h3>

              {/* checkbox Usar meus dados */}
              <div className="mb-4">
                <RadioGroup
                  label="Nome da Mãe / Responsável*"
                  name="usarMeusDados"
                  selectedValue={formData.usarMeusDados}
                  onChange={handleChange}
                  options={[
                    { value: "sim", label: "Usar os dados do meu cadastro" },
                    { value: "nao", label: "Inserir manualmente" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label="Nome da Mãe / Responsável*"
                  id="nomeResponsavel"
                  name="nomeResponsavel"
                  placeholder="[Nome, Sobrenome, Último nome]"
                  colSpan="md:col-span-2"
                  value={formData.nomeResponsavel}
                  onChange={handleChange}
                  disabled={formData.usarMeusDados === "sim"}
                  required={formData.usarMeusDados === "nao"}
                />
                <FormField
                  label="Telefone / Whatsapp*"
                  id="telefoneResponsavel"
                  name="telefoneResponsavel"
                  placeholder="98 9 1234-5678"
                  colSpan="md:col-span-1"
                  value={formData.telefoneResponsavel}
                  onChange={handleChange}
                  disabled={formData.usarMeusDados === "sim"}
                  required={formData.usarMeusDados === "nao"}
                />
              </div>
            </section>

            {/*informações de saude */}
            <section>
              <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B] mb-6 text-center">
                Informações de Saúde
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <RadioGroup
                    label="O dependente possui alguma alergia? Se sim, qual?*"
                    name="alergia"
                    selectedValue={formData.alergia}
                    onChange={handleChange}
                    options={[
                      { value: "nao", label: "Não" },
                      { value: "sim", label: "Sim" },
                    ]}
                  />
                  <input
                    type="text"
                    name="alergiaQual"
                    placeholder="[Campo de Texto]"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.alergiaQual}
                    onChange={handleChange}
                    disabled={formData.alergia === "nao"}
                  />
                </div>
                {/* Condição de Saúde */}
                <div>
                  <RadioGroup
                    label="Possui alguma condição de saúde ou usa medicação contínua?*"
                    name="condicaoSaude"
                    selectedValue={formData.condicaoSaude}
                    onChange={handleChange}
                    options={[
                      { value: "nao", label: "Não" },
                      { value: "sim", label: "Sim" },
                    ]}
                  />
                  <input
                    type="text"
                    name="condicaoSaudeQual"
                    placeholder="[Campo de Texto]"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.condicaoSaudeQual}
                    onChange={handleChange}
                    disabled={formData.condicaoSaude === "nao"}
                  />
                </div>
                {/* Observações */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="observacoes"
                    className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1"
                  >
                    OBSERVAÇÕES (Se desejar):
                  </label>
                  <textarea
                    id="observacoes"
                    name="observacoes"
                    rows="4"
                    placeholder="[Campo de Texto]"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.observacoes}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Exibição de Erro */}
            {error && (
              <p className="text-sm text-center font-semibold text-red-600">
                {error}
              </p>
            )}

            {/* Botões de Ação */}
            <div className="flex justify-center items-center pt-6 border-t">
              <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4 lg:gap-[24px]">
                <button
                  type="submit"
                  className="w-full lg:w-[612px] h-[56px] flex justify-center items-center bg-white text-[#193FB0] font-bold text-lg border border-[#193FB0] rounded-[5px] shadow-[0_8px_16px_rgba(113,146,255,0.25)] hover:bg-[#193FB0] hover:text-white transition-all duration-300"
                >
                  Salvar Cadastro e prosseguir
                </button>
                <button
                  type="button"
                  className="w-full lg:w-[612px] h-[56px] flex justify-center items-center bg-white text-[#BE3E1A] font-bold text-lg border border-[#BE3E1A] rounded-[5px] hover:bg-[#BE3E1A] hover:text-white transition-all duration-300"
                  onClick={() => navigate("/")}
                >
                  Cancelar
                </button>
              </div>
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
