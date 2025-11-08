import React, { useState, useEffect, useCallback } from "react";
import axios from "../services/axios.js";
import { io } from "socket.io-client";

const socket = io("https://portaligrejaback.siaeserver.com");

const Veterinaria = () => {
  const [senhaAtual, setSenhaAtual] = useState(null);
  const [proximaSenha, setProximaSenha] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [atendimento, setAtendimento] = useState(null);
  const [filaExibicao, setFilaExibicao] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [setores, setSetores] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState();
  const [setorSelecionado, setSetorSelecionado] = useState();

  // Buscar serviços
  useEffect(() => {
    axios
      .get("https://portaligrejaback.siaeserver.com/api/servicos")
      .then((res) => {
        setServicos(res.data);
        console.log("Serviços recebidos:", res.data); // aqui sim
      })
      .catch((err) => console.error("Erro ao buscar serviços:", err));
  }, []);

  // Buscar setores
  // Ao trocar de serviço
  useEffect(() => {
    // Limpa setores e senhas enquanto carrega os novos dados
    setSetores([]);
    setSetorSelecionado(""); // limpa seleção de setor
    setProximaSenha(null);
    setSenhaAtual(null);
    setAtendimento(null);

    if (!servicoSelecionado) return;

    // Buscar setores do serviço selecionado
    axios
      .get(`https://portaligrejaback.siaeserver.com/api/setores/${servicoSelecionado}`)
      .then((res) => {
        setSetores(res.data || []);
        console.log("Setores recebidos:", res.data);
      })
      .catch((err) => console.error("Erro ao buscar setores:", err));
  }, [servicoSelecionado]);

  const fetchSenhas = useCallback(async () => {
    try {
      if (servicoSelecionado) {
        const [currentResponse, next, inProgress] = await Promise.all([
          axios.get(`https://portaligrejaback.siaeserver.com/api/atendimentos/next-available/${setorSelecionado}`),
          axios.get(`https://portaligrejaback.siaeserver.com/api/atendimentos/called/${setorSelecionado}`),
          axios.get(`https://portaligrejaback.siaeserver.com/api/atendimentos/in-progress/${setorSelecionado}`),
        ]);

        setProximaSenha(currentResponse.data);
        setSenhaAtual(next.data || null);
        setAtendimento(inProgress.data || null);
        console.log(inProgress.data);
      }
    } catch (error) {
      if (error.response?.data?.mensagem === "Nenhum atendimento disponível encontrado para o serviço especificado.") {
        console.log("Nenhum atendimento disponível para o serviço selecionado.");
        setProximaSenha(null);
      }
      console.error("Erro ao buscar senhas:", error);
    }
  }, [setorSelecionado]);

  useEffect(() => {
    // Limpa senhas e atendimento enquanto busca novos
    setProximaSenha(null);
    setSenhaAtual(null);
    setAtendimento(null);

    if (!setorSelecionado) return;

    // Buscar senhas relacionadas ao setor
    fetchSenhas();
  }, [setorSelecionado, fetchSenhas]);

  useEffect(() => {
    fetchSenhas();
    // Atualiza a cada 30 segundos
    const interval = setInterval(fetchSenhas, 5000);
    return () => clearInterval(interval);
  }, [servicoSelecionado, fetchSenhas]);

  const chamarProximaSenha = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`https://portaligrejaback.siaeserver.com/api/atendimentos/call-next/${setorSelecionado}`);
      const next = await axios.get(`https://portaligrejaback.siaeserver.com/api/atendimentos/called/${setorSelecionado}`);
      console.log("Próxima senha chamada:", next.data);
      setSenhaAtual(next.data);
      setProximaSenha(null);

      socket.on("fila-exibicao-atualizada", (fila) => {
        setFilaExibicao(fila);
      });
    } catch (error) {
      console.error("Erro ao chamar próxima senha:", error);
      setError("Não foi possível chamar a próxima senha");
    } finally {
      setLoading(false);
    }
  };

  const iniciarAtendimento = async () => {
    try {
      const response = await axios.put(`https://portaligrejaback.siaeserver.com/api/atendimentos/start/${senhaAtual.id}`);
      console.log(response.data);
      setAtendimento(response.data);
    } catch (err) {
      console.error("Erro ao iniciar atendimento:", err);
    }
  };

  const finalizarAtendimento = async () => {
    if (!atendimento) return;

    try {
      await axios.put(`https://portaligrejaback.siaeserver.com/api/atendimentos/finish-appointment/${atendimento.id}`);
      setAtendimento(null); // limpa tela

      fetchSenhas();
    } catch (error) {
      console.error("Erro ao finalizar atendimento:", error);
      alert("Erro ao finalizar atendimento");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Atendimento</h1>
          <p className="text-lg text-gray-600">Tela de atendimento — gerencie chamadas e inicie o atendimento</p>
        </div>

        {/* Filtro de tipo de serviço */}
        <div className="flex justify-center mb-8">
          <select value={servicoSelecionado || ""} onChange={(e) => setServicoSelecionado(Number(e.target.value) || "")} className="w-64 px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            {servicos.map((servico, index) => (
              <option key={`${servico.id}-${index}`} value={servico.id}>
                {servico.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mb-8">
          <select
            value={setorSelecionado}
            onChange={(e) => setSetorSelecionado(Number(e.target.value))}
            className="
      block
      w-64
      px-4
      py-2
      text-gray-700
      bg-white
      border
      border-gray-300
      rounded-lg
      shadow-sm
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      focus:border-blue-500
      transition
      duration-200
      ease-in-out
    "
          >
            <option key="todos" value="">
              Todos os setores
            </option>
            {setores.map((setor, index) => (
              <option key={`${setor.setor.id}-${index}`} value={setor.setor.id}>
                {setor.setor.nome}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-center">{error}</div>}

        {/* Próxima Senha */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 w-full max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Próxima Senha</h2>
          {proximaSenha ? (
            <div className="text-center">
              <span className="text-5xl font-bold text-gray-800 font-mono">{proximaSenha.cod}</span>
              <div className="mt-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${servicos.find((s) => s.id === servicoSelecionado)?.cor}-100 text-${servicos.find((s) => s.id === servicoSelecionado)?.cor}-800`}>{servicos.find((s) => s.id === servicoSelecionado)?.nome}</span>
              </div>
              <div className="mt-6">
                <button
                  onClick={chamarProximaSenha}
                  disabled={loading || filaExibicao.length >= 4}
                  className={`
    inline-flex items-center px-6 py-3 rounded-lg text-white text-base font-semibold
    transition-all duration-200 transform
    ${loading || filaExibicao.length >= 4 ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-md"}
  `}
                  title={filaExibicao.length >= 4 ? "Fila cheia — inicie um atendimento para continuar" : undefined}
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
                    "Chamar Próxima Senha"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xl text-gray-500 text-center">Não há senhas na fila</p>
          )}
        </div>

        {/* Senha Chamada */}
        {!atendimento && (
          <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Senha Chamada</h2>
            {senhaAtual ? (
              <div className="text-center flex flex-col items-center gap-6">
                <span className="text-7xl md:text-8xl font-bold text-gray-800 font-mono">{senhaAtual.cod}</span>
                <div className="text-left">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${servicos.find((s) => s.id === servicoSelecionado)?.cor}-100 text-${servicos.find((s) => s.id === servicoSelecionado)?.cor}-800`}>
                    {servicos.find((s) => s.id === servicoSelecionado)?.nome}
                  </span>
                  {senhaAtual?.observacao && <p className="mt-2 text-sm text-gray-500 max-w-xs">{senhaAtual.observacao}</p>}
                </div>

                <div className="w-full max-w-md bg-gray-50 rounded-lg p-4 shadow-sm text-left">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Paciente</p>
                  <p className="text-lg md:text-xl font-semibold text-gray-800 truncate">{senhaAtual?.paciente?.nome || "Nome não informado"}</p>
                  {senhaAtual?.paciente?.idade && <p className="text-sm text-gray-500 mt-1">Idade: {senhaAtual.paciente.idade}</p>}
                  {senhaAtual?.paciente?.contato && <p className="text-sm text-gray-500 mt-1">Contato: {senhaAtual.paciente.contato}</p>}
                </div>

                <button onClick={iniciarAtendimento} className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md">
                  Iniciar Atendimento
                </button>
              </div>
            ) : (
              <p className="text-2xl text-gray-500 text-center">Nenhuma senha chamada</p>
            )}
          </div>
        )}

        {/* Atendimento em andamento */}
        {atendimento && (
          <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Atendimento em Andamento</h2>

            <p className="text-lg text-gray-800">Paciente: {atendimento.paciente?.nome || "Nome não informado"}</p>

            <p className="text-gray-500 mt-1">Serviço: {servicos.find((s) => s.id === atendimento.id_servico)?.nome}</p>

            {/* Botão Finalizar */}
            <button onClick={finalizarAtendimento} className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all">
              Finalizar Atendimento
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Veterinaria;
