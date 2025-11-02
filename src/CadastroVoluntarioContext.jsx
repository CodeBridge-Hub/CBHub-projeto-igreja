import React, { createContext, useState, useContext } from "react";

const CadastroVoluntarioContext = createContext();

export function CadastroVoluntarioProvider({ children }) {
  const [formData, setFormData] = useState({
    voluntario: {
      nome: "",
      data_nascimento: "",
      cpf: "",
      telefone: "",
      sexo: "Masculino",
      email: "",
      turno: "",
      observacoes: "",
      habilidades: "",
    },

    atuacao: {
      area_atuacao: "",
      area_atuacao_outro: "",
    },

    disponibilidade: {
      dia: "",
    },
  });

  // Função para atualizar os dados
  const updateFormData = (newData) => {
    let updatedData;
    setFormData((prevData) => {
      updatedData = { ...prevData };

      // Verifica se os novos dados pertencem a paciente ou endereco
      // if ('nome' in newData || 'profissao' in newData) {
      //   updatedData.paciente = { ...prevData.paciente, ...newData };
      // } else if ('logradouro' in newData || 'bairro' in newData) {
      //   updatedData.endereco = { ...prevData.endereco, ...newData };
      // } else {

      Object.assign(updatedData, newData);
      // }

      console.log("Contexto atualizado:", updatedData);
      return updatedData;
    });

    return updatedData;
  };

  return (
    <CadastroVoluntarioContext.Provider value={{ formData, updateFormData }}>
      {children}
    </CadastroVoluntarioContext.Provider>
  );
}

// Hook useCadastro
export function useCadastro() {
  const context = useContext(CadastroVoluntarioContext);
  if (!context) {
    throw new Error("useCadastro deve ser usado dentro de um CadastroProvider");
  }
  return context;
}
