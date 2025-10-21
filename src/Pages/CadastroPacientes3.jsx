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
  onChange  
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
  
  // Chama os hooks
  const navigate = useNavigate();
  const { formData, updateFormData } = useCadastro();

  //  Cria o estado local para os campos dessa página
  const [localData, setLocalData] = useState({
    profissao: formData.profissao || '',
    situacao: formData.situacao || '', 
    outro: formData.outro || '',     
  });

  // Cria a função handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  // Cria a função handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData(localData); 
    navigate('/cadastro-senha-pacientes'); // Navega para a próxima etapa
  };
  
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center gap-8 py-10 px-4 sm:px-6">
        
        <FormCadastroLayout 
          step={3} 
          title="Dados de Ocupação"
          onSubmit={handleSubmit}
          onCancel={() => navigate('/')} // Volta para a home
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
                    name="situacao"
                    value="Empregado" 
                    checked={localData.situacao === "Empregado"} 
                    onChange={handleChange} 
                    className="mr-2 w-5 h-5"
                  />
                  Empregado
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacao"
                    value="Desempregado" 
                    checked={localData.situacao === "Desempregado"} 
                    onChange={handleChange} 
                    className="mr-2 w-5 h-5"
                  />
                  Desempregado
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacao"
                    value="Autônomo" 
                    checked={localData.situacao === "Autônomo"} 
                    onChange={handleChange} 
                    className="mr-2 w-5 h-5"
                  />
                  Autônomo
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacao"
                    value="Aposentado" 
                    checked={localData.situacao === "Aposentado"} 
                    onChange={handleChange}
                    className="mr-2 w-5 h-5"
                  />
                  Aposentado
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacao"
                    value="Outro" 
                    checked={localData.situacao === "Outro"}
                    onChange={handleChange}
                    className="mr-2 w-5 h-5"
                  />
                  Outro
                </label>
              </div>
            </div>

            <div>
              <input
                id="outro"
                name="outro" 
                placeholder="Caso tenha selecionado outro, defina no campo. Exemplo: Beneficiário."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={localData.outro}
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