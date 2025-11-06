import React, { useState, useEffect, useCallback } from "react";
import axios from "../services/axios.js";

const SERVICOS = [
  { id: 1, nome: 'Médico', cor: 'blue' },
  { id: 2, nome: 'Veterinário', cor: 'teal' },
  { id: 3, nome: 'Jurídico', cor: 'indigo' }
];

const Veterinaria = () => {
  const [servicoSelecionado, setServicoSelecionado] = useState(1);
  const [senhaAtual, setSenhaAtual] = useState(null);
  const [proximaSenha, setProximaSenha] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSenhas = useCallback(async () => {
    try {
      const [currentResponse, nextResponse] = await Promise.all([
        // axios.get(`http://localhost:3000/api/atendimentos/current/${servicoSelecionado}`),
        axios.get(`http://localhost:3000/api/atendimentos/next-available/${servicoSelecionado}`)
      ]);
      // setSenhaAtual(currentResponse.data);
      setProximaSenha(currentResponse.data);
    } catch (error) {
      if (error.response?.data?.mensagem === "Nenhum atendimento disponível encontrado para o serviço especificado.") {
        console.log("Nenhum atendimento disponível para o serviço selecionado.");
        setProximaSenha(null);
      }
      console.error("Erro ao buscar senhas:", error);
    }
  }, [servicoSelecionado]);

  useEffect(() => {
    fetchSenhas();
    // Atualiza a cada 30 segundos
    const interval = setInterval(fetchSenhas, 30000);
    return () => clearInterval(interval);
  }, [servicoSelecionado, fetchSenhas]);

  const chamarProximaSenha = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`http://localhost:3000/api/atendimentos/call-next/${servicoSelecionado}`);
      await fetchSenhas(); // Atualiza ambas as senhas
    } catch (error) {
      console.error("Erro ao chamar próxima senha:", error);
      setError("Não foi possível chamar a próxima senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Painel de Atendimento
          </h1>
          <p className="text-lg text-gray-600">
            Sistema de Controle de Senhas
          </p>
        </div>

        {/* Filtro de tipo de serviço */}
        <div className="flex justify-center mb-8">
          <select
            value={servicoSelecionado}
            onChange={(e) => setServicoSelecionado(Number(e.target.value))}
            className="w-64 px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {SERVICOS.map((servico) => (
              <option key={servico.id} value={servico.id}>
                {servico.nome}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {/* Próxima Senha */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 w-full max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Próxima Senha</h2>
          {proximaSenha ? (
            <div className="text-center">
              <span className="text-5xl font-bold text-gray-800 font-mono">
                {proximaSenha.cod}
              </span>
              <div className="mt-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${SERVICOS.find(s => s.id === servicoSelecionado)?.cor}-100 text-${SERVICOS.find(s => s.id === servicoSelecionado)?.cor}-800`}>
                  {SERVICOS.find(s => s.id === servicoSelecionado)?.nome}
                </span>
              </div>
              <div className="mt-6">
                <button
                  onClick={chamarProximaSenha}
                  disabled={loading}
                  className={`
                    inline-flex items-center px-6 py-3 rounded-lg text-white text-base font-semibold
                    transition-all duration-200 transform
                    ${loading
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-md'
                    }
                  `}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Chamando...
                    </>
                  ) : (
                    'Chamar Próxima Senha'
                  )}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xl text-gray-500 text-center">
              Não há senhas na fila
            </p>
          )}
        </div>

        {/* Senha em Atendimento */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Em Atendimento</h2>
          {senhaAtual ? (
            <div className="text-center">
              <span className="text-7xl font-bold text-gray-800 font-mono">
                {senhaAtual.cod}
              </span>
              <div className="mt-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${SERVICOS.find(s => s.id === servicoSelecionado)?.cor}-100 text-${SERVICOS.find(s => s.id === servicoSelecionado)?.cor}-800`}>
                  {SERVICOS.find(s => s.id === servicoSelecionado)?.nome}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-2xl text-gray-500 text-center">
              Nenhuma senha em atendimento
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Veterinaria;
