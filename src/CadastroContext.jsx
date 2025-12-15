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
      condicao_saude: '',
      condicao_saude_outro: '',
      possui_deficiencia: false,
      deficiencia: '',
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

  // Função para atualizar os dados 
  const updateFormData = (newData) => {
    let updatedData;
    setFormData((prevData) => {
      updatedData = { ...prevData };

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
        condicao_saude: null,
        condicao_saude_outro: null,
        possui_deficiencia: false,
        deficiencia: null,
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