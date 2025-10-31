import React, { createContext, useState, useContext } from "react";

export const CadastroEspecialContext = createContext();

// Criar Provider
export const CadastroEspecialProvider = ({ children }) => {
  const [dadosEspeciais, setDadosEspeciais] = useState({
    paciente_especial: {
      // Dados do paciente especial primeiro passo
      nome: "",
      nome_responsavel: "",
      telefone: "",
    },

    ficha_sensorial: {
      // Dados da ficha sensorial segundo passo
      diagnostico: "",
      reforcador: "",
      nao_gosta: "",
      alergia: "",
      verbal: "",
      observacao: "",
    },
  });

  // Função para atualizar os dados
  const updateDadosEspeciais = (newData) => {
    setDadosEspeciais((prevData) => {
      const updatedData = { ...prevData };

      // Verifica se os novos dados pertencem à Etapa 1
      if ('nome' in newData || 'nome_responsavel' in newData) {
        updatedData.paciente_especial = {
          ...prevData.paciente_especial,
          ...newData,
        };
      }
      // Verifica se os novos dados pertencem à Etapa 2
      else if ('diagnostico' in newData || 'reforcador' in newData) {
        updatedData.ficha_sensorial = {
          ...prevData.ficha_sensorial,
          ...newData,
        };
      }
      // Se não pertencer a nenhum
      else {
        Object.assign(updatedData, newData);
      }
      
      console.log("Contexto ESPECIAL atualizado:", updatedData); // Para debug
      return updatedData;
    });
  };

  // Disponibiliza os Dados
  const value = { dadosEspeciais, updateDadosEspeciais };

  return (
    <CadastroEspecialContext.Provider value={value}>
      {children}
    </CadastroEspecialContext.Provider>
  );
};

// hook
export function useCadastroEspecial() {
  const context = useContext(CadastroEspecialContext);
  if (!context) {
    throw new Error('useCadastroEspecial deve ser usado dentro de um CadastroEspecialProvider');
  }
  return context;
}