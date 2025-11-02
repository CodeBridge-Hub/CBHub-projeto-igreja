import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useCadastro } from "../CadastroVoluntarioContext";
// Header e Footer REMOVIDOS para serem injetados pelo StandardLayout

// --- Constantes de Estilo ---
const TEXT_DARK_BLUE = "text-[#253965]";
const BG_LIGHT_BLUE = "bg-[#f0f8ff]";

// --- COMPONENTES AUXILIARES REUTILIZÁVEIS ---
const InputField = ({ label, id, type = "text", placeholder, value, onChange, inputMode, pattern, required = false }) => (
  <div className="flex flex-col w-full">
    <label htmlFor={id} className={`text-sm font-medium mb-1 ${TEXT_DARK_BLUE}`}>
      {label}
    </label>
    <input type={type} id={id} value={value} onChange={onChange} placeholder={placeholder} inputMode={inputMode} pattern={pattern} required={required} className={`w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-[#253965] focus:border-[#253965]`} />
  </div>
);

const CheckboxGroup = ({ title, options, name, values, onCheckChange }) => (
  <div>
    <p className={`text-sm font-medium mb-2 ${TEXT_DARK_BLUE}`}>{title}</p>
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {options.map((option) => (
        <div key={option.id} className="flex items-center">
          <input type="checkbox" id={option.id} name={name} onChange={onCheckChange} checked={values === option.id} className="h-4 w-4 rounded border-gray-300 accent-[#253965] focus:ring-[#253965] focus:border-[#253965]" />
          <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);

const RadioGroup = ({ title, name, options, value, onRadioChange }) => (
  <div>
    <p className={`text-sm font-medium mb-2 ${TEXT_DARK_BLUE}`}>{title}</p>
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {options.map((option) => (
        <div key={option.id} className="flex items-center">
          <input type="radio" id={option.id} name={name} onChange={onRadioChange} checked={value === option.id} className="h-4 w-4 border-gray-300 accent-[#253965] focus:ring-[#253965] focus:border-[#253965]" />
          <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);
// --- FIM DOS COMPONENTES AUXILIARES ---

export default function CadastroVoluntario() {
  // const navigate = useNavigate();

  const {formData, updateFormData} = useCadastro();
  const [validationError, setValidationError] = useState("");

  // Mantenha seus Handlers e Validações aqui...
  const handleInputChange = (e, group) => {
  const { id, value } = e.target;
  setLocalData((prev) => ({
    ...prev,
    [group]: {
      ...prev[group],
      [id]: value,
    },
  }));
  setValidationError("");
};


  const handleCheckboxChange = (e) => {
    const { id, checked, name } = e.target;
    setLocalData((prev) => {
      const currentArray = prev[name];

      if (checked) {
        return { ...prev, [name]: [...currentArray, id] };
      } else {
        return { ...prev, [name]: currentArray.filter((item) => item !== id) };
      }
    });
    setValidationError("");
  };

  const handleRadioChange = (e) => {
    setLocalData((prev) => ({ ...prev, turno: e.target.id }));
    setValidationError("");
  };

  const areaAtuacaoOptions = [
    { id: "saude", label: "Saúde (enfermagem, odontologia, etc.)" },
    { id: "juridico", label: "Jurídico" },
    { id: "apoio", label: "Apoio social (acolhimento, triagem, etc.)" },
    { id: "logistica", label: "Organização / Logística" },
    { id: "outro_area", label: "Outro" },
  ];
  const disponibilidadeOptions = [
    { id: "segunda", label: "Segunda-feira" },
    { id: "terca", label: "Terça-feira" },
    { id: "quarta", label: "Quarta-feira" },
    { id: "quinta", label: "Quinta-feira" },
    { id: "sexta", label: "Sexta-feira" },
  ];
  const turnoOptions = [
    { id: "manha", label: "Manhã" },
    { id: "tarde", label: "Tarde" },
    { id: "noite", label: "Noite" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [localData, setLocalData] = useState({
    voluntario: {
      nome: formData.voluntario.nome || "",
      data_nascimento: formData.voluntario.data_nascimento || "",
      cpf: formData.voluntario.cpf || "",
      telefone: formData.voluntario.telefone || "",
      email: formData.voluntario.email || "",
      sexo: formData.voluntario.sexo || "",
      observacoes: formData.voluntario.observacoes || "",
      turno: formData.voluntario.turno || "",
      habilidades: formData.voluntario.habilidades || "",
    },
    atuacao: {
      area_atuacao: formData.atuacao.area_atuacao || "",
      area_atuacao_outro: formData.atuacao.area_atuacao_outro || "",
    },

    disponibilidade: {
      dia: formData.disponibilidade.dia || ""
    }
  });

  return (
    // Apenas o conteúdo central
    <div className={`w-full ${BG_LIGHT_BLUE} font-sans`}>
      {/* TÍTULO DA PÁGINA */}
      <div className="w-full max-w-7xl mx-auto py-8 px-4 flex items-center justify-center">
        <img src={Logo} alt="Logo" className="w-12 h-12 object-contain mr-3" />
        <h4 className={`h-4 text-2xl font-bold ${TEXT_DARK_BLUE}`}>Sistema Integrado de Atendimento</h4>
      </div>

      {/* FORMULÁRIO PRINCIPAL */}
      <main className="flex-grow flex justify-center pb-12 px-4">
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-6 md:p-10 border border-gray-200">
          {/* Título do Formulário */}
          <h3 className={`text-xl font-semibold mb-2 text-center ${TEXT_DARK_BLUE}`}>Cadastro de Voluntário</h3>
          <p className="text-center text-gray-600 mb-8 text-sm">Atendimento social, jurídico e de saúde, rápido e integrado.</p>

          {/* Mensagem de Erro de Validação */}
          {validationError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm" role="alert">
              <strong className="font-bold">Atenção!</strong>
              <span className="block sm:inline ml-2">{validationError}</span>
            </div>
          )}

          {/* Mantenha o seu <form> e campos aqui... */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* --- Seções do Formulário (O conteúdo completo do seu formulário) --- */}
            <div className="border-b pb-6">
              <p className={`font-semibold text-lg ${TEXT_DARK_BLUE} mb-4`}>Dados Cadastrais</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Nome completo" id="nome" value={localData.voluntario.nome} onChange={(e) => handleInputChange(e, "voluntario")} required />
                <InputField label="E-mail" id="email" type="email" placeholder="email@exemplo.com" value={localData.voluntario.email} onChange={(e) => handleInputChange(e, "voluntario")} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <InputField label="Data de nascimento" id="data_nascimento" type="date" value={localData.voluntario.data_nascimento} onChange={(e) => handleInputChange(e, "voluntario")} required />
                <InputField label="CPF" id="cpf" type="tel" placeholder="012.345.678-90" value={localData.voluntario.cpf} onChange={(e) => handleInputChange(e, "voluntario")} pattern="[0-9.\-]*" required />
                <InputField label="Telefone / Whatsapp" id="telefone" type="tel" inputMode="numeric" placeholder="98 9 1234-5678" value={formData.telefone} onChange={(e) => handleInputChange(e, "voluntario")} pattern="[0-9\s\-\(\)]*" required />
              </div>
            </div>

            <div className="border-b pb-6">
              <CheckboxGroup title="Área de Atuação (Selecione uma ou mais)" name="areas" options={areaAtuacaoOptions} onCheckChange={handleCheckboxChange} values={localData.atuacao.area_atuacao} />

              {localData.atuacao.area_atuacao === "outro_area" && (
                <div className="mt-3">
                  <label htmlFor="outro_campo_desc" className={`text-xs ${TEXT_DARK_BLUE}`}>
                    Defina sua área de atuação (ex: Serviços gerais)
                  </label>
                  <input type="text" id="outro_campo_desc" placeholder="Por exemplo: Serviços gerais." value={formData.outro_campo_desc} onChange={handleInputChange} className={`w-full p-2 border border-gray-300 rounded-md text-sm mt-1 focus:ring-[#253965] focus:border-[#253965]`} />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-6">
              <CheckboxGroup title="Disponibilidade (Selecione um ou mais)" name="dias_disponiveis" options={disponibilidadeOptions} onCheckChange={handleCheckboxChange} values={localData.disponibilidade.dia} />
              <RadioGroup title="Turno:" name="turno" options={turnoOptions} onRadioChange={handleRadioChange} value={localData.voluntario.turno} />
            </div>

            <div>
              <InputField label="HABILIDADES / FORMAÇÃO" id="habilidades" placeholder="Por exemplo: Cursando medicina, Cursando Direito." value={localData.habilidades} onChange={handleInputChange} required />
            </div>

            <div>
              <label htmlFor="observacoes" className={`text-sm font-medium mb-1 ${TEXT_DARK_BLUE}`}>
                OBSERVAÇÕES ADICIONAIS <span className="text-gray-500 font-normal">(Opcional)</span>
              </label>
              <textarea
                id="observacoes"
                rows="3"
                placeholder="Por exemplo: Possibilidade de ser voluntário o dia inteiro."
                value={formData.observacoes}
                onChange={handleInputChange}
                className={`w-full p-2 border border-gray-300 rounded-md text-sm resize-none focus:ring-[#253965] focus:border-[#253965]`}
              />
            </div>

            <div className="flex flex-col sm:flex-row w-full pt-6 space-y-2 sm:space-y-0 sm:space-x-4">
              <button type="submit" className={`w-full py-2.5 px-4 text-sm font-medium rounded-md text-white bg-[#253965] hover:bg-[#1d2e52] transition duration-150`}>
                Salvar Cadastro e prosseguir
              </button>

              <Link to="/" className="w-full">
                <button type="button" className="w-full py-2.5 px-4 border border-red-500 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-100 transition duration-150">
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

