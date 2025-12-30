import React from "react";

export default function ModuleCard({ title, icon: Icon, onClick }) {
  return (
    <div className="bg-white rounded-2xl shadow-card-igreja p-6 flex flex-col items-center justify-between hover:scale-105 transition-transform duration-300 h-full min-h-[200px]">
      
      {/* icone e titulo */}
      <div className="flex flex-col items-center text-center gap-4">
        {Icon && (
          <div className="p-4 bg-blue-50 rounded-full">
            <Icon className="text-4xl text-azul-botao" />
          </div>
        )}
        <h3 className="text-xl font-bold text-azul-titulo">
          {title}
        </h3>
      </div>

      {/* botão de ação */}
      <button
        onClick={onClick}
        className="mt-6 w-full py-2 px-4 bg-azul-botao text-white font-bold rounded-[5px] border border-azul-botao hover:bg-white hover:text-azul-botao transition-colors duration-300 cursor-pointer"
      >
        Acessar
      </button>
    </div>
  );
}