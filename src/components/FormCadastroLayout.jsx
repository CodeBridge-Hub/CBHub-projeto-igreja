import React from "react";

export default function FormCadastroLayout({
   step = 1, 
   title, 
   children, 
   onSubmit, 
   onCancel, 
   submitText = "Salvar Cadastro e prosseguir",
   isSubmitDisabled = false  
}) {

  // Função para estilizar as etapas do stepper
  const getStepClass = (currentStep) => {
    if (currentStep === step) {
      return "bg-[#1D4BD1] text-white";
    } else if (currentStep < step) {
      return "bg-green-500 text-white";
    }
    return "border-2 border-gray-300 text-gray-400";
  };

  return (
    <div className="w-full max-w-[1344px] bg-white rounded-2xl shadow-[0_8px_16px_rgba(113,146,255,0.25)] p-6 sm:p-8 md:p-12">
      {/* Títulos do Card */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B]">
          Cadastro de Paciente/Responsável
        </h3>
        <h5 className="text-[#0A1B4B] font-normal text-[16px] mt-4">
          Atendimento social, jurídico e de saúde, rápido e integrado.
        </h5>
      </div>

      <div className="flex items-center justify-center mb-10">
        <div className="flex items-center">
          <span
            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${getStepClass(
              1
            )}`}
          >
            1
          </span>

          <span
            className={`ml-2 font-semibold hidden md:inline ${
              step >= 1 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Dados pessoais
          </span>
        </div>

        <div className="w-16 md:w-24 h-px bg-gray-300 mx-2 md:mx-4 hidden md:block"></div>
        <div className="flex items-center">
          <span
            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${getStepClass(
              2
            )}`}
          >
            2
          </span>

          <span
            className={`ml-2 font-semibold hidden md:inline ${
              step >= 2 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Endereço
          </span>
        </div>

        <div className="w-16 md:w-24 h-px bg-gray-300 mx-2 md:mx-4 hidden md:block"></div>
        <div className="flex items-center">
          <span
            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${getStepClass(
              3
            )}`}
          >
            3
          </span>

          <span
            className={`ml-2 font-semibold hidden md:inline ${
              step >= 3 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Dados de Ocupação
          </span>
        </div>
      </div>

      <form className="space-y-10" onSubmit={onSubmit}>
        <section>
          <h3 className="text-xl font-bold text-[#0A1B4B] mb-6 text-center pl-4">
            {title}
          </h3>
          {children}
        </section>

        {/* Botões de Ação */}
        <div className="flex justify-center items-center pt-6 border-t">
          <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4 lg:gap-[24px]">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`w-full lg:w-[612px] h-[56px] flex justify-center items-center
                         font-bold text-lg rounded-[5px] transition-all duration-300
                         ${isSubmitDisabled
                           ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                           : 'bg-white text-[#193FB0] border border-[#193FB0] shadow-[0_8px_16px_rgba(113,146,255,0.25)] hover:bg-[#193FB0] hover:text-white'
                         }`}
            >
              {/* 3. Usamos o texto dinâmico */}
              {submitText}
            </button>

            <button
              type="button"
              className="w-full lg:w-[612px] h-[56px] flex justify-center items-center
                         bg-white text-[#BE3E1A] font-bold text-lg
                         border border-[#BE3E1A] rounded-[5px]
                         hover:bg-[#BE3E1A] hover:text-white
                         transition-all duration-300"
                         // 4. Conectamos a função 'onCancel'
              onClick={onCancel}
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
  );
}
