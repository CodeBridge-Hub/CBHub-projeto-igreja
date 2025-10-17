import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FormCadastroLayout from "../Components/FormCadastroLayout";

const FormField = ({ label, id, placeholder, colSpan = "col-span-1" }) => (
  <div className={colSpan}>
    <label
      htmlFor={id}
      className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export default function CadastroPaciente3() {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center gap-8 py-10 px-4 sm:px-6">
        <FormCadastroLayout step={3} title="Dados de Ocupação">
          <div className="space-y-8">
            <FormField
              label="Profissão:"
              id="profissao"
              placeholder="Ex.: Desenvolvedor, Professor, etc."
              colSpan="col-span-full"
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
                    className="mr-2 w-5 h-5"
                  />{" "}
                  Empregado
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacao"
                    className="mr-2 w-5 h-5"
                  />{" "}
                  Desempregado
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacao"
                    className="mr-2 w-5 h-5"
                  />{" "}
                  Autônomo
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacao"
                    className="mr-2 w-5 h-5"
                  />{" "}
                  Aposentado
                </label>
                <label className="flex items-center text-[#0F276D]">
                  <input
                    type="radio"
                    name="situacao"
                    className="mr-2 w-5 h-5"
                  />{" "}
                  Outro
                </label>
              </div>
            </div>

            <div>
              <input
                id="outro"
                placeholder="Caso tenha selecionado outro, defina no campo. Exemplo: Beneficiário."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </FormCadastroLayout>
      </main>

      <Footer />
    </div>
  );
}
