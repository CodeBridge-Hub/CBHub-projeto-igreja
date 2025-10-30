import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCadastro } from "../CadastroContext";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FormCadastroLayout from "../Components/FormCadastroLayout";
import axios from "../services/axios.js"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  colSpan = "col-span-1",
  value,
  onChange,
  error,
  required = false,
  helperText,
}) => {
  const showError = Boolean(error);
  return (
    <div className={colSpan}>
      <label htmlFor={id} className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {helperText && !showError && <p className="text-xs text-gray-500 mb-1">{helperText}</p>}
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-2xl focus:ring-blue-500 focus:border-blue-500 ${showError ? 'border-red-500' : 'border-gray-300'}`}
        value={value}
        onChange={onChange}
      />
      <div className="min-h-[1.25rem] mt-1">
        {showError ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          helperText && <p className="text-[15px] text-[#0F276D] font-semibold">{helperText}</p>
        )}
      </div>
    </div>
  );
};

export default function CadastroPaciente3() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCadastro();

  //  começa o estado local buscando dados do formData.paciente*
  const [localData, setLocalData] = useState({
    profissao: formData.paciente.profissao || "",
    situacao_empregaticia: formData.paciente.situacao_emregaticia || "",
    situacao_empregaticia_outro: formData.paciente.situacao_empregaticia_outro || "",
  });

  const [errors, setErrors] = useState({});

  // Validações
  const validateProfissao = (profissao) => {
    if (!profissao || profissao.trim() === "") return ""; // opcional
    if (profissao.trim().length < 3) return "Digite uma profissão válida";
    return "";
  };

  const validateSituacaoEmpregaticia = (situacao) => {
    if (!situacao || situacao.trim() === "") return "Selecione a situação empregatícia";
    const opcoes = ["Empregado", "Desempregado", "Autônomo", "Aposentado", "Outro"];
    if (!opcoes.includes(situacao)) return "Selecione uma opção válida";
    return "";
  };

  const validateSituacaoEmpregaticiaOutro = (outro, situacao) => {
    if (situacao !== "Outro") return "";
    if (!outro || outro.trim() === "") return "Por favor, especifique a situação";
    if (outro.trim().length < 3) return "Descrição muito curta";
    return "";
  };

  const hasFormErrors = () => {
    const hasValidationErrors = Object.values(errors).some((v) => v && v !== "");
    const situacaoMissing = !localData.situacao_empregaticia || localData.situacao_empregaticia.trim() === "";
    const situacaoOutroMissing = localData.situacao_empregaticia === "Outro" && (!localData.situacao_empregaticia_outro || localData.situacao_empregaticia_outro.trim() === "");
    return hasValidationErrors || situacaoMissing || situacaoOutroMissing;
  };

  // Função handleChange
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));

    // validações em tempo real
    if (name === "profissao") {
      setErrors((prev) => ({ ...prev, profissao: validateProfissao(value) }));
    }
    if (name === "situacao_empregaticia") {
      setErrors((prev) => ({
        ...prev,
        situacao_empregaticia: validateSituacaoEmpregaticia(value),
        situacao_empregaticia_outro: validateSituacaoEmpregaticiaOutro(localData.situacao_empregaticia_outro, value),
      }));
    }
    if (name === "situacao_empregaticia_outro") {
      setErrors((prev) => ({ ...prev, situacao_empregaticia_outro: validateSituacaoEmpregaticiaOutro(value, localData.situacao_empregaticia) }));
    }
  };

  // Função handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    // validações finais
    const profissaoError = validateProfissao(localData.profissao);
    const situacaoError = validateSituacaoEmpregaticia(localData.situacao_empregaticia);
    const situacaoOutroError = validateSituacaoEmpregaticiaOutro(localData.situacao_empregaticia_outro, localData.situacao_empregaticia);

    const newErrors = {
      profissao: profissaoError,
      situacao_empregaticia: situacaoError,
      situacao_empregaticia_outro: situacaoOutroError,
    };
    setErrors((prev) => ({ ...prev, ...newErrors }));

    const hasErrorsNow = Object.values(newErrors).some((v) => v && v !== "");
    if (hasErrorsNow) return;

    const data = updateFormData(localData);
    console.log("Dados da etapa 3 enviados:", data);
    try {
      const response = axios.post("http://localhost:3000/api/pacientes/create", data)
      console.log("Resposta do servidor:", response.data);
      toast.success("Paciente cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados do paciente:", error);
      toast.error("Erro ao cadastrar paciente. Tente novamente.");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center gap-8 py-10 px-4 sm:px-6">
        <FormCadastroLayout
          step={3}
          title="Dados de Ocupação"
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")} // Volta para a home
          isSubmitDisabled={hasFormErrors()}
          submitText={hasFormErrors() ? "Preencha todos os campos obrigatórios" : undefined}
        >
          <div className="space-y-8">
            <FormField
              label="Profissão:"
              id="profissao"
              placeholder="Ex.: Desenvolvedor, Professor, etc."
              colSpan="col-span-full"
              value={localData.profissao}
              onChange={handleChange}
              error={errors.profissao}
              helperText="Opcional: informe sua profissão"
            />

            <div>
              <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-2">
                Situação Empregatícia:
              </label>

              <div className="flex flex-row flex-wrap gap-x-8 gap-y-4 pt-2">
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacao_empregaticia"
                    value="Empregado"
                    checked={localData.situacao_empregaticia === "Empregado"}
                    onChange={handleChange}
                    className="mr-2 w-5 h-5"
                  />
                  Empregado
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacao_empregaticia"
                    value="Desempregado"
                    checked={localData.situacao_empregaticia === "Desempregado"}
                    onChange={handleChange}
                    className="mr-2 w-5 h-5"
                  />
                  Desempregado
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacao_empregaticia"
                    value="Autônomo"
                    checked={localData.situacao_empregaticia === "Autônomo"}
                    onChange={handleChange}
                    className="mr-2 w-5 h-5"
                  />
                  Autônomo
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacao_empregaticia"
                    value="Aposentado"
                    checked={localData.situacao_empregaticia === "Aposentado"}
                    onChange={handleChange}
                    className="mr-2 w-5 h-5"
                  />
                  Aposentado
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacao_empregaticia"
                    value="Outro"
                    checked={localData.situacao_empregaticia === "Outro"}
                    onChange={handleChange}
                    className="mr-2 w-5 h-5"
                  />
                  Outro
                </label>
              </div>
            </div>

            <div>
              {errors.situacao_empregaticia && (
                <p className="text-sm text-red-600">{errors.situacao_empregaticia}</p>
              )}
              {localData.situacao_empregaticia === 'Outro' && (
                <FormField
                  id="situacao_empregaticia_outro"
                  placeholder="Caso tenha selecionado outro, defina no campo. Exemplo: Beneficiário."
                  colSpan="col-span-full"
                  value={localData.situacao_empregaticia_outro}
                  onChange={handleChange}
                  error={errors.situacao_empregaticia_outro}
                />
              )}
            </div>
          </div>
        </FormCadastroLayout>
      </main>

      <Footer />
    </div>
  );
}
