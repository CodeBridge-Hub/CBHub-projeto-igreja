import React, { useState, useEffect } from "react";
import axios from "../services/axios.js";
import { io } from "socket.io-client";

const socket = io("https://portaligrejaback.siaeserver.com");

const getStatusColor = (status) => {
  switch (status) {
    case "chamada":
      return "bg-blue-500 text-white";
    case "aguardando":
      return "bg-amber-500 text-white";
    case "atendida":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const SenhasTriagem = () => {
  const [senhas, setSenhas] = useState([]); // fila de espera (opcional)
  const [filaExibicao, setFilaExibicao] = useState([]); // fila QUE O PAINEL EXIBE

  useEffect(() => {
    const audio = new Audio("announcement-sound-104411.mp3");

    const fetchAguardando = async () => {
      try {
        const response = await axios.get("https://portaligrejaback.siaeserver.com/api/atendimentos/waiting");
        console.log("Senhas na fila de espera:", response.data);
        setSenhas(response.data);
      } catch (error) {
        console.error("Erro ao buscar senhas:", error);
      }
    };

    fetchAguardando();

    socket.on("fila-exibicao-atualizada", (fila) => {
      setFilaExibicao(fila);
      console.log(fila);
    });

    socket.on("nova-senha", (senha) => {
      audio.currentTime = 0;
      audio.volume = 1.0;
      audio.play().catch(() => {});
    });

    socket.on("fila-atualizada", () => {
      fetchAguardando();
    });

    return () => {
      socket.off("fila-exibicao-atualizada");
      socket.off("nova-senha");
      socket.off("fila-atualizada");
    };
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar com todas as senhas */}
      <div className="w-1/4 bg-white shadow-lg p-6 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Painel de Senhas</h2>
          <p className="text-sm text-gray-600 pb-4 border-b-2 border-gray-100">
            Total: {senhas.length} {senhas.length > 1 ? "senhas" : "senha"}
          </p>
        </div>

        <ul className="space-y-3">
          {senhas.map((s) => (
            <li key={s.id} className="p-4 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{s.cod}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(s.status)} capitalize`}>{s.status}</span>
                </div>
                <div>
                  <p className="text-gray-500 font-bold">{s.servico?.nome } - {s.setor?.nome}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Área principal: senha chamada */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sistema de Triagem</h1>
          <p className="text-xl text-gray-600">Controle de Senhas</p>
        </div>

        <div className="flex flex-col -center items-center  w-full">
          {/* GRID DE 4 ITENS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full rounded-xl">
            {/* CARD PRINCIPAL (index 0) */}
            <div className="bg-white border-4 border-[#18225c] rounded-t-2xl shadow-xl p-10 w-full min-h-[350px] text-center col-span-1 md:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Chamando Agora</h2>

              {filaExibicao[0] ? (
                <div className="animate-fade-in">
                  <p className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-indigo-600">{filaExibicao[0].cod}</p>
                  <p className="mt-4 text-gray-600 text-lg">Serviço: {filaExibicao[0].atendimento?.servico?.nome}</p>
                  <div>
                    <p className="mt-4 text-gray-600 text-lg">PACIENTE: {filaExibicao[0].atendimento?.paciente?.nome}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xl text-gray-400">Aguardando chamada...</p>
              )}
            </div>

            {/* 3 CARDS MENORES */}
          </div>
          <div className="grid grid-cols-3 md:grid-cols-3 w-full">
            {filaExibicao?.slice(1, 4).map((item, i) => (
              <div
                key={i}
                className={`bg-white border-4 border-[#18225c] shadow-lg p-6 text-center min-h-[160px] flex flex-col justify-center
      ${i === 0 ? "rounded-bl-xl" : ""}   /* primeiro card */
      ${i === 2 ? "rounded-br-xl" : ""}   /* último card */
    `}
              >
                {item ? (
                  <>
                    <p className="text-3xl font-bold text-gray-800">{item.cod}</p>
                    <p className="text-gray-500 text-sm mt-2">{item.servico}</p>
                  </>
                ) : (
                  <p className="text-gray-400 text-lg">—</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenhasTriagem;
