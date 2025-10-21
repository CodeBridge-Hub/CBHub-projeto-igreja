import React, { createContext, useState, useContext } from 'react';

// Cria o Provedor 
const CadastroContext = createContext();

export function CadastroProvider({ children }) {
  // Este é o estado que vai guardar todos os dados de todas as etapas do cadastro
  const [formData, setFormData] = useState({
    // Etapa 1: Dados Pessoais e Saúde
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
    // Etapa 2: Endereço (SecondPagePaciente)
    endereco: '',
    bairro: '',
    numero: '',
    cep: '',
    // Etapa 3: Ocupação (CadastroPacientes3)
    profissao: '',
    situacaoEmpregaticia: '',
    // Etapa 4: Senha (CadastroSenhaPacientes)
    senha: '',
  });

  // Função para atualizar os dados
  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  // O Provedor disponibiliza o formData e a função updateFormData
  return (
    <CadastroContext.Provider value={{ formData, updateFormData }}>
      {children}
    </CadastroContext.Provider>
  );
}

// Cria um Hook customizado para facilitar o acesso
export function useCadastro() {
  const context = useContext(CadastroContext);
  if (!context) {
    throw new Error('useCadastro deve ser usado dentro de um CadastroProvider');
  }
  return context;
}