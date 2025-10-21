import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

import FormCadastroLayout from '../Components/FormCadastroLayout';


const FormField = ({ label, id, type = 'text', placeholder, colSpan = 'col-span-1', helperText }) => (
  <div className={colSpan}>
    <label
      htmlFor={id}
      className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1"
    >
      {label}
    </label>
    {helperText && <p className="text-xs text-gray-500 mb-1">{helperText}</p>}
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export default function CadastroPaciente2() {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />
    
      <main className="flex-grow flex flex-col items-center gap-8 py-10 px-4 sm:px-6 pb-20 lg:pb-40">
        <FormCadastroLayout step={2} title="Dados de endereço">
            
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label="Endereço completo (Rua, avenida e etc.):"
                  id="endereco"
                  placeholder="Ex.: Avenida dos Holandeses, nº 4500"
                  colSpan="md:col-span-3"
                />
                <FormField
                  label="Bairro:"
                  id="bairro"
                  placeholder="Ex.: Centro Histórico"
                  colSpan="md:col-span-1"
                />
                <FormField
                  label="Número da residência:"
                  id="numero"
                  placeholder="Ex.: 50"
                  colSpan="md:col-span-1"
                />
                <FormField
                  label="CEP:"
                  id="cep"
                  placeholder="65000-000"
                  colSpan="md:col-span-1"
                />
            </div>

        </FormCadastroLayout>
      </main>

      <Footer />
    </div>
  );
}