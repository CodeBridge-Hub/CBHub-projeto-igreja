import React from "react";

export default function FormCadastroLayout({
  step = 1,
  title,
  children,
  onSubmit,
  onCancel,
  submitText = "Salvar Cadastro e prosseguir",
  isSubmitDisabled = false,
  submitLoading = false,
}) {

  // Função para estilizar as etapas do stepper
  const getStepClass = (currentStep) => {
    if (currentStep === step) {
      return "bg-azul-botao text-white";
    } else if (currentStep < step) {
      return "bg-green-500 text-white";
    }
    return "border-2 border-gray-300 text-gray-400";
  };

  return (
    <div className="w-full max-w-[1344px] bg-white rounded-2xl shadow-card-igreja p-6 sm:p-8 md:p-12">
      {/* Títulos do Card */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-[28px] font-bold text-azul-titulo">
          Cadastro de Paciente/Responsável
        </h3>
        <h5 className="text-azul-titulo font-normal text-[16px] mt-4">
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
          <h3 className="text-xl font-bold text-azul-titulo mb-6 text-center pl-4">
            {title}
          </h3>
          {children}
        </section>

        {/* Botões de Ação */}
        <div className="flex justify-center items-center pt-6 border-t">
          <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4 lg:gap-[24px]">
            <button
              type="submit"
              disabled={isSubmitDisabled || submitLoading}
              aria-busy={submitLoading}
              className={`w-full lg:w-[612px] h-[56px] flex justify-center items-center
                         font-bold text-lg rounded-[5px] transition-all duration-300
                         ${isSubmitDisabled || submitLoading
                           ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                           : 'bg-white text-azul-botao border border-azul-botao shadow-card-igreja hover:bg-azul-botao hover:text-white'
                         }`}
            >
              {submitLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Salvando...
                </>
              ) : (
                submitText
              )}
            </button>

            <button
              type="button"
              className="w-full lg:w-[612px] h-[56px] flex justify-center items-center
                         bg-white text-vermelho-aviso font-bold text-lg
                         border border-vermelho-aviso rounded-[5px]
                         hover:bg-vermelho-aviso hover:text-white
                         transition-all duration-300"
                         // 4. Conectamos a função 'onCancel'
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
        <h6 className="text-center font-bold text-[16px] text-azul-titulo">
          Suas informações são confidenciais e protegidas.
        </h6>
      </form>
    </div>
  );
}
