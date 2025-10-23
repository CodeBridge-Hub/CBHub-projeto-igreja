import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCadastro } from "../CadastroContext";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FormCadastroLayout from "../Components/FormCadastroLayout";

const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  colSpan = "col-span-1",
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
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-blue-500 focus:border-blue-500"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default function CadastroPaciente3() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCadastro();

  //  começa o estado local buscando dados do formData.paciente*
  const [localData, setLocalData] = useState({
    profissao: formData.paciente.profissao || "",
    situacaoEmpregaticia: formData.paciente.situacaoEmpregaticia || "",
    outroSituacao: formData.paciente.outroSituacao || "",
  });

  // Função handleChange
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
  };

  // Função handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData(localData);
    navigate("/cadastro-senha-pacientes"); // Navega para a última etapa
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
        >
          <div className="space-y-8">
            <FormField
              label="Profissão:"
              id="profissao"
              placeholder="Ex.: Desenvolvedor, Professor, etc."
              colSpan="col-span-full"
              value={localData.profissao}
              onChange={handleChange}
            />

            <div>
              <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-2">
                Situação Empregatícia:
              </label>

              <div className="flex flex-row flex-wrap gap-x-8 gap-y-4 pt-2">
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacaoEmpregaticia"
                    value="Empregado"
                    checked={localData.situacaoEmpregaticia === "Empregado"}
                    onChange={handleChange}
                    className="mr-2 w-5 h-5"
                  />
                  Empregado
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacaoEmpregaticia"
                    value="Desempregado"
                    checked={localData.situacaoEmpregaticia === "Desempregado"}
                    onChange={handleChange}
                    className="mr-2 w-5 h-5"
                  />
                  Desempregado
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacaoEmpregaticia"
                    value="Autônomo"
                    checked={localData.situacaoEmpregaticia === "Autônomo"}
                    onChange={handleChange}
                    className="mr-2 w-5 h-5"
                  />
                  Autônomo
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacaoEmpregaticia"
                    value="Aposentado"
                    checked={localData.situacaoEmpregaticia === "Aposentado"}
                    onChange={handleChange}
                    className="mr-2 w-5 h-5"
                  />
                  Aposentado
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacaoEmpregaticia"
                    value="Outro"
                    checked={localData.situacaoEmpregaticia === "Outro"}
                    onChange={handleChange}
                    className="mr-2 w-5 h-5"
                  />
                  Outro
                </label>
              </div>
            </div>

            <div>
              <input
                id="outroSituacao"
                name="outroSituacao"
                placeholder="Caso tenha selecionado outro, defina no campo. Exemplo: Beneficiário."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={localData.outroSituacao}
                onChange={handleChange}
              />
            </div>
          </div>
        </FormCadastroLayout>
      </main>

      <Footer />
    </div>
  );
}
