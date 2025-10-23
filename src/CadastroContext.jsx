import React, { createContext, useState, useContext } from 'react';

const CadastroContext = createContext();

export function CadastroProvider({ children }) {
  const [formData, setFormData] = useState({
    // Dados do Paciente (Etapas 1 e 3)
    paciente: {
      nome: '',
      dataNascimento: '',
      cpf: '',
      telefone: '',
      sexo: '',
      email: '',
      condicaoSaude: '',
      condicaoSaudeOutro: '',
      deficiencia: '',
      deficienciaOutro: '',
      observacoes: '',
      profissao: '',              
      situacaoEmpregaticia: '', 
      outroSituacao: '',        
    },
    // Dados de Endereço 
    endereco: {
      logradouro: '', 
      bairro: '',
      numero: '',
      cep: '',
    },
    // Senha Etapa 4 
    senha: '',
  });

  // Função para atualizar os dados 
  const updateFormData = (newData) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData };

      // Verifica se os novos dados pertencem a paciente ou endereco
      if ('nome' in newData || 'profissao' in newData) {
        updatedData.paciente = { ...prevData.paciente, ...newData };
      } else if ('logradouro' in newData || 'bairro' in newData) {
        updatedData.endereco = { ...prevData.endereco, ...newData };
      } else {
       
        Object.assign(updatedData, newData);
      }
      
      console.log("Contexto atualizado:", updatedData); 
      return updatedData;
    });
  };

  return (
    <CadastroContext.Provider value={{ formData, updateFormData }}>
      {children}
    </CadastroContext.Provider>
  );
}

// Hook useCadastro 
export function useCadastro() {
  const context = useContext(CadastroContext);
  if (!context) {
    throw new Error('useCadastro deve ser usado dentro de um CadastroProvider');
  }
  return context;
}