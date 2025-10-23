import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCadastro } from "../CadastroContext";
import Header from "../Components/Header";
import Logo from "../assets/Logo.png";
import Footer from "../Components/Footer";

const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  colSpan = "col-span-1",
  helperText,
  value,
  onChange,
}) => (
  <div className={colSpan}>
    <label
      htmlFor={id}
      className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1"
    >
      {label}
    </label>
    {helperText && (
      <p className="text-[15px] text-[#0F276D] mb-1">{helperText}</p>
    )}
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default function CadastroPaciente() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCadastro();

  //  Inicializa o estado local buscando dados de 'formData.paciente.*'
  const [localData, setLocalData] = useState({
    nome: formData.paciente.nome || "",
    dataNascimento: formData.paciente.dataNascimento || "",
    cpf: formData.paciente.cpf || "",
    telefone: formData.paciente.telefone || "",
    email: formData.paciente.email || "",
    sexo: formData.paciente.sexo || "",
    condicaoSaude: formData.paciente.condicaoSaude || "",
    condicaoSaudeOutro: formData.paciente.condicaoSaudeOutro || "", //
    deficiencia: formData.paciente.deficiencia || "",
    deficienciaOutro: formData.paciente.deficienciaOutro || "",
    observacoes: formData.paciente.observacoes || "",
  });

  // Função para atualizar os estados locais
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
  };

  // Função para salvar na mochila
  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData(localData);
    navigate("/second-page-paciente");
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

        {/* Card Principal do Formulário */}
        <div className="w-full max-w-[1344px] bg-white rounded-2xl shadow-[0_8px_16px_rgba(113,146,255,0.25)] p-6 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B]">
              Cadastro de Paciente/Responsável
            </h3>
            <h5 className="text-[#0A1B4B] font-normal text-[16px] mt-4">
              Atendimento social, jurídico e de saúde, rápido e integrado.
            </h5>
          </div>
          <div className="flex items-center justify-center mb-10">
            {/* ... Stepper ... */}
          </div>

          <form className="space-y-10" onSubmit={handleSubmit}>
            {/* Seção: Dados Pessoais */}
            <section>
              <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B] mb-6 text-center">
                Dados Pessoais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label="Nome completo"
                  id="nome"
                  placeholder="Abimael Barros Castro Denifrer"
                  colSpan="md:col-span-3"
                  value={localData.nome}
                  onChange={handleChange}
                />
                <FormField
                  label="Data de nascimento"
                  id="dataNascimento"
                  placeholder="DD/MM/AAAA"
                  type="date"
                  value={localData.dataNascimento}
                  onChange={handleChange}
                />
                <FormField
                  label="CPF"
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={localData.cpf}
                  onChange={handleChange}
                />
                <FormField
                  label="Telefone / Whatsapp"
                  id="telefone"
                  placeholder="(98) 9 1234-5678"
                  value={localData.telefone}
                  onChange={handleChange}
                />
                <div className="md:col-span-1">
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1">
                    <h4>Sexo</h4>
                  </label>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sexo"
                        value="Masculino"
                        checked={localData.sexo === "Masculino"}
                        onChange={handleChange}
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Masculino
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sexo"
                        value="Feminino"
                        checked={localData.sexo === "Feminino"}
                        onChange={handleChange}
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Feminino
                    </label>
                  </div>
                </div>
                <FormField
                  label="E-mail"
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  colSpan="md:col-span-2"
                  value={localData.email}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* Seção: Informações de Saúde */}
            <section>
              <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B] mb-6 text-center">
                Informações Básicas de Saúde
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-2">
                    <h4>Você possui alguma condição de saúde importante?</h4>
                  </label>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="condicaoSaude"
                        value="Diabetes"
                        checked={localData.condicaoSaude === "Diabetes"}
                        onChange={handleChange}
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Diabetes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="condicaoSaude"
                        value="Hipertensão"
                        checked={localData.condicaoSaude === "Hipertensão"}
                        onChange={handleChange}
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Hipertensão
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="condicaoSaude"
                        value="Alergia"
                        checked={localData.condicaoSaude === "Alergia"}
                        onChange={handleChange}
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Alergia
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="condicaoSaude"
                        value="Outro"
                        checked={localData.condicaoSaude === "Outro"}
                        onChange={handleChange}
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Outro
                    </label>
                  </div>
                  <input
                    type="text"
                    name="condicaoSaudeOutro"
                    placeholder="Em caso de outro, qual?"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                    value={localData.condicaoSaudeOutro}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-2">
                    <h4>Possui alguma deficiência?</h4>
                  </label>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="deficiencia"
                        value="Sim"
                        checked={localData.deficiencia === "Sim"}
                        onChange={handleChange}
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Sim
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="deficiencia"
                        value="Não"
                        checked={localData.deficiencia === "Não"}
                        onChange={handleChange}
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Não
                    </label>
                  </div>
                  <input
                    type="text"
                    name="deficienciaOutro"
                    placeholder="Em caso afirmativo, qual?"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                    value={localData.deficienciaOutro}
                    onChange={handleChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="observacoes"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    OBSERVAÇÕES (Se desejar):
                  </label>
                  <textarea
                    id="observacoes"
                    name="observacoes"
                    rows="4"
                    placeholder="Por exemplo: Cadastro individual."
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                    value={localData.observacoes}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </section>

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
