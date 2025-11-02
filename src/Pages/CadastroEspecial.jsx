import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCadastroEspecial } from "../context/CadastroEspecialContext";
import Logo from "../assets/Logo.png";

const TEXT_DARK_BLUE = "text-[#253965]";
const BG_LIGHT_BLUE = "bg-[#f0f8ff]";

const InputField = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  inputMode,
  pattern,
  required = false,
}) => (
  <div className="flex flex-col w-full">
    <label
      htmlFor={id}
      className={`text-sm font-medium mb-1 ${TEXT_DARK_BLUE}`}
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      inputMode={inputMode}
      pattern={pattern}
      required={required}
      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-[#253965] focus:border-[#253965]"
    />
  </div>
);

const RadioGroup = ({ title, name, options, value, onRadioChange }) => (
  <div>
    <p className={`text-sm font-medium mb-2 ${TEXT_DARK_BLUE}`}>{title}</p>
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {options.map((option) => (
        <div key={option.id} className="flex items-center">
          <input
            type="radio"
            id={option.id}
            name={name}
            onChange={onRadioChange}
            checked={value === option.id}
            className="h-4 w-4 border-gray-300 accent-[#253965] focus:ring-[#253965] focus:border-[#253965]"
          />
          <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);

const CadastroEspecial = () => {
  const navigate = useNavigate();

  const { dadosEspeciais, updateDadosEspeciais } = useCadastroEspecial(); // Acessa os dados do contexto

  const [formData, setFormData] = useState({
    nome_crianca: dadosEspeciais.paciente_especial.nome || "",
    nome_mae: dadosEspeciais.paciente_especial.nome_responsavel || "",
    telefone_mae: dadosEspeciais.paciente_especial.telefone || "",
    diagnostico: dadosEspeciais.ficha_sensorial.diagnostico || "",
    reforcador: dadosEspeciais.ficha_sensorial.reforcador || "",
    nao_gosta: dadosEspeciais.ficha_sensorial.nao_gosta || "",
    alergia: dadosEspeciais.ficha_sensorial.alergia || "",
    verbal: dadosEspeciais.ficha_sensorial.verbal || "",
    observacao: dadosEspeciais.ficha_sensorial.observacao || "",
  });

  const [validationError, setValidationError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setValidationError("");
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, verbal: e.target.id }));
    setValidationError("");
  };

  const verbalOptions = [
    { id: "sim", label: "SIM" },
    { id: "nao", label: "NÃO" },
  ];

  const validateForm = () => {
    const requiredFields = ["nome_crianca", "nome_mae", "telefone_mae"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        const fieldNames = {
          nome_crianca: "Nome da criança",
          nome_mae: "Nome da mãe",
          telefone_mae: "Telefone",
        };

        setValidationError(
          `O campo "${fieldNames[field] || field}" é obrigatório.`
        );
        return false;
      }
    }
    if (!formData.verbal) {
      setValidationError("Selecione se a criança é 'Verbal' (SIM ou NÃO).");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const dadosPaciente = {
        nome: formData.nome_crianca,
        nome_responsavel: formData.nome_mae,
        telefone: formData.telefone_mae,
      };

      const dadosFicha = {
        diagnostico: formData.diagnostico,
        reforcador: formData.reforcador,
        nao_gosta: formData.nao_gosta,
        alergia: formData.alergia,
        verbal: formData.verbal,
        observacao: formData.observacao,
      }; // Salva os dois blocos de dados na mochila

      updateDadosEspeciais(dadosPaciente);
      updateDadosEspeciais(dadosFicha);
      console.log("Dados do Cadastro Especial Salvos:", {
        ...dadosPaciente,
        ...dadosFicha,
      });
      navigate("/cadastro-senha"); // Navega para a próxima etapa
    } else {
      console.error("Formulário incompleto ou inválido.");
    }
  };
  return (
    <div className={`w-full ${BG_LIGHT_BLUE} font-sans`}>
      <div className="w-full max-w-7xl mx-auto py-8 px-4 flex items-center justify-center">
        <img src={Logo} alt="Logo" className="w-12 h-12 object-contain mr-3" />
        <h4 className={`h-4 text-2xl font-bold ${TEXT_DARK_BLUE}`}>
          Sistema Integrado de Atendimento
        </h4>
      </div>

      <main className="flex-grow flex justify-center pb-12 px-4">
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-6 md:p-10 border border-gray-200">
          <h3
            className={`text-xl font-semibold mb-2 text-center ${TEXT_DARK_BLUE}`}
          >
            Ficha de Cadastro
          </h3>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Sala de Acomodação e Regulação Sensorial
          </p>

          {validationError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm"
              role="alert"
            >
              <strong className="font-bold">Atenção!</strong>
              <span className="block sm:inline ml-2">{validationError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="border-b pb-6 space-y-4">
              <p className={`font-semibold text-lg ${TEXT_DARK_BLUE} mb-4`}>
                Dados da Criança e Responsável
              </p>
              <InputField
                label="Nome da criança:"
                id="nome_crianca"
                value={formData.nome_crianca}
                onChange={handleInputChange}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Nome da mãe:"
                  id="nome_mae"
                  value={formData.nome_mae}
                  onChange={handleInputChange}
                  required
                />
                <InputField
                  label="Telefone ( )"
                  id="telefone_mae"
                  type="tel"
                  inputMode="numeric"
                  placeholder="(99) 9 9999-9999"
                  value={formData.telefone_mae}
                  onChange={handleInputChange}
                  pattern="[0-9\s\-\(\)]*"
                  required
                />
              </div>
            </div>

            <div className="border-b pb-6 space-y-4">
              <p className={`font-semibold text-lg ${TEXT_DARK_BLUE} mb-4`}>
                Informações Relevantes
              </p>
              <InputField
                label="Diagnóstico:"
                id="diagnostico"
                value={formData.diagnostico}
                onChange={handleInputChange}
                placeholder="Ex: TEA Nível 1"
              />
              <InputField
                label="Reforçador/ o que a criança gosta de brincar?"
                id="reforcador"
                value={formData.reforcador}
                onChange={handleInputChange}
                placeholder="Ex: Carrinhos, bolhas de sabão, música"
              />
              <InputField
                label="O que a criança não gosta? (Barulho, luz, brinquedo)"
                id="nao_gosta"
                value={formData.nao_gosta}
                onChange={handleInputChange}
                placeholder="Ex: Luz forte, sons altos, toque"
              />
              <InputField
                label="Alergia:"
                id="alergia"
                value={formData.alergia}
                onChange={handleInputChange}
                placeholder="Ex: Poeira, amendoim, lactose (ou 'Nenhuma')"
              />
            </div>

            <div className="space-y-6">
              <RadioGroup
                title="Verbal:"
                name="verbal"
                options={verbalOptions}
                onRadioChange={handleRadioChange}
                value={formData.verbal}
              />
              <div>
                <label
                  htmlFor="observacao"
                  className={`text-sm font-medium mb-1 ${TEXT_DARK_BLUE}`}
                >
                  Observação{" "}
                  <span className="text-gray-500 font-normal">(Opcional)</span>
                </label>
                <textarea
                  id="observacao"
                  rows="3"
                  placeholder="Alguma informação adicional importante?"
                  value={formData.observacao}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none focus:ring-[#253965] focus:border-[#253965]"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full pt-6 space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm font-medium rounded-md text-white bg-[#253965] hover:bg-[#1d2e52] transition duration-150"
              >
                Salvar Cadastro
              </button>
              <Link to="/" className="w-full">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 border border-red-500 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-100 transition duration-150"
                >
                  Voltar para a Home
                </button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CadastroEspecial;
