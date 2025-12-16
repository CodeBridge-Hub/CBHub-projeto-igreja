import React, { createContext, useState, useContext } from 'react';

const CadastroContext = createContext();

export function CadastroProvider({ children }) {
  const [formData, setFormData] = useState({
    // Dados do Paciente (Etapas 1 e 3)
    paciente: {
      nome: '',
      data_nascimento: '',
      cpf: '',
      telefone: '',
      sexo: 'Masculino',
      escolaridade: '',
      estado_civil: '',
      email: '',
      possui_responsavel: false,
      observacoes: '',
      profissao: '',              
      situacao_empregaticia: '', 
      situacao_empregaticia_outro: '',        
    },
    // Dados de Endereço 
    endereco: {
      rua: '', 
      bairro: '',
      numero: '',
      complemento: '',
      cep: '',
      estado: '',
      cidade: '',
    },
    responsavel: {
      nome_responsavel: '',
      cpf_responsavel: '',
      telefone_responsavel: '',
      parentesco: '',
    },
    // Senha Etapa 4 
    senha: '',
  });

  // função para atualizar os dados 
  const updateFormData = (newData) => {
    let updatedData;
    setFormData((prevData) => {
      // faz uma copia para garantir a imutabilidade
      updatedData = { 
        ...prevData,
        paciente: { ...prevData.paciente },
        endereco: { ...prevData.endereco },
        responsavel: { ...prevData.responsavel }
      };

      // verifica se é dado do Paciente
      if ('nome' in newData || 'profissao' in newData || 'sexo' in newData || 'cpf' in newData) {
        updatedData.paciente = { ...prevData.paciente, ...newData };
      } 
      // verifica se é dado de endereço ( alterado para o padrão rua )
      else if ('rua' in newData || 'bairro' in newData || 'cep' in newData) {
        updatedData.endereco = { ...prevData.endereco, ...newData };
      } 
      // verifica se é dado do responsável
      else if ('nome_responsavel' in newData || 'cpf_responsavel' in newData || 'parentesco' in newData) {
        updatedData.responsavel = { ...prevData.responsavel, ...newData };
      }

      else {
        Object.assign(updatedData, newData);
      }
      
      console.log("Contexto atualizado:", updatedData); 
      return updatedData;
    });

    return updatedData
  };

  const resetFormData = () => {
    setFormData({
      paciente: {
        nome: '',
        data_nascimento: '',
        cpf: '',
        telefone: '',
        sexo: 'Masculino',
        escolaridade: '',
        estado_civil: '',
        email: '',
        possui_responsavel: false,
        observacoes: '',
        profissao: '',              
        situacao_empregaticia: '', 
        situacao_empregaticia_outro: '',        
      },
      endereco: {
        rua: '', 
        bairro: '',
        numero: '',
        complemento: '',
        cep: '',
        estado: '',
        cidade: '',
      },
      responsavel: {
        nome_responsavel: '',
        cpf_responsavel: '',
        telefone_responsavel: '',
        parentesco: '',
      },
      senha: '',
    });
    console.log("Formulário resetado");
  };


  return (
    <CadastroContext.Provider value={{ formData, updateFormData, resetFormData  }}>
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