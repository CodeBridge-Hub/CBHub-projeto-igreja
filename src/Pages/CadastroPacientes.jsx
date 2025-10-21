import React from "react";
import Header from "../Components/Header";
import Logo from "../assets/Logo.png";
import Footer from "../Components/Footer";

const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  colSpan = "col-span-1",
  helperText,
}) => (
  <div className={colSpan}>
    <label
      htmlFor={id}
      className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1"
    >
      {label}
    </label>
    {helperText && (
      <p className="text-[15px] text-[#0F276D] mb-1">{helperText}</p>
    )}
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export default function CadastroPaciente() {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center gap-8 py-10 px-4 sm:px-6">
        <div className="w-full max-w-[1344px] flex flex-col sm:flex-row justify-center items-center gap-4 text-center sm:text-left">
          <img
            src={Logo}
            alt="Logo da Instituição"
            className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px]"
          />

          <h2 className="font-bold text-[#060F2A] text-2xl sm:text-3xl lg:text-4xl">
            Sistema Integrado de Atendimento
          </h2>
        </div>

        {/* Card Principal do Formulário */}
        <div className="w-full max-w-[1344px] bg-white rounded-2xl shadow-[0_8px_16px_rgba(113,146,255,0.25)] p-6 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B]">
              Cadastro de Paciente/Responsável
            </h3>
            <h5 className="text-[#0A1B4B] font-normal text-[16px] mt-4">
              Atendimento social, jurídico e de saúde, rápido e integrado.
            </h5>
          </div>

          {/* Stepper de Progresso */}

          <div className="flex items-center justify-center mb-10">
            <div className="flex items-center">
              <span className="w-10 h-10 flex items-center justify-center bg-[#1D4BD1] text-white rounded-full font-bold">
                1
              </span>
              <span className="ml-2 font-semibold text-blue-600 hidden md:inline">
                Dados pessoais
              </span>
            </div>
            <div className="w-16 md:w-24 h-px bg-gray-300 mx-2 md:mx-4"></div>
            <div className="flex items-center">
              <span className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 text-gray-400 rounded-full font-bold">
                2
              </span>
              <span className="ml-2 text-gray-400 hidden md:inline">
                Endereço
              </span>
            </div>
            <div className="w-16 md:w-24 h-px bg-gray-300 mx-2 md:mx-4"></div>
            <div className="flex items-center">
              <span className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 text-gray-400 rounded-full font-bold">
                3
              </span>
              <span className="ml-2 text-gray-400 hidden md:inline">
                Dados de Ocupação
              </span>
            </div>
          </div>

          <form className="space-y-10">
            {/* Seção: Dados Pessoais */}
            <section>
              <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B] mb-6 text-center">
                Dados Pessoais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label="Nome completo"
                  id="nome"
                  placeholder="Abimael Barros Castro Denifrer"
                  colSpan="md:col-span-3"
                />
                <FormField
                  label="Data de nascimento"
                  id="dataNascimento"
                  placeholder="DD/MM/AAAA"
                  type="date"
                />
                <FormField label="CPF" id="cpf" placeholder="000.000.000-00" />
                <FormField
                  label="Telefone / Whatsapp"
                  id="telefone"
                  placeholder="(98) 9 1234-5678"
                />
                <div className="md:col-span-1">
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1">
                    <h4>Sexo</h4>
                  </label>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sexo"
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Masculino
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sexo"
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Feminino
                    </label>
                  </div>
                </div>
                <FormField
                  label="E-mail"
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  colSpan="md:col-span-2"
                />
              </div>
            </section>

            {/* Seção: Informações de Saúde */}
            <section>
              <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B] mb-6 text-center">
                Informações Básicas de Saúde
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-2">
                    <h4>Você possui alguma condição de saúde importante?</h4>
                  </label>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="condicao"
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Diabetes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="condicao"
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Hipertensão
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="condicao"
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Alergia
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="condicao"
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Outro
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Em caso de outro, qual?"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-2">
                    <h4>Possui alguma deficiência?</h4>
                  </label>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="deficiencia"
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Sim
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="deficiencia"
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Não
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Em caso afirmativo, qual?"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="observacoes"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    OBSERVAÇÕES (Se desejar):
                  </label>
                  <textarea
                    id="observacoes"
                    rows="4"
                    placeholder="Por exemplo: Cadastro individual."
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Botões de Ação */}
            <div className="flex justify-center items-center pt-6 border-t">
              <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4 lg:gap-[24px]">
                <button
                  type="submit"
                  className="w-full lg:w-[612px] h-[56px] flex justify-center items-center bg-white text-[#193FB0] font-bold text-lg border border-[#193FB0] rounded-[5px] shadow-[0_8px_16px_rgba(113,146,255,0.25)] hover:bg-[#193FB0] hover:text-white transition-all duration-300"
                >
                  Salvar Cadastro e prosseguir
                </button>
                <button
                  type="button"
                  className="w-full lg:w-[612px] h-[56px] flex justify-center items-center bg-white text-[#BE3E1A] font-bold text-lg border border-[#BE3E1A] rounded-[5px] hover:bg-[#BE3E1A] hover:text-white transition-all duration-300"
                >
                  Cancelar
                </button>
              </div>
            </div>

            <h6 className="text-center font-bold text-[16px] text-[#0A1B4B]">
              Suas informações são confidenciais e protegidas.
            </h6>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
