import React, { useState, useEffect } from "react";
import axios from "../services/axios.js";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

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
  const [senhas, setSenhas] = useState([]);
  const [senhaChamada, setSenhaChamada] = useState(null);

  // Atualiza automaticamente a senha chamada
  useEffect(() => {
    const audio = new Audio("announcement-sound-104411.mp3");

    const fetchAtendimentos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/atendimentos/waiting`);
        // const senhaChamada = await axios.get(`http://localhost:3000/api/atendimentos/next-available/${2}`);
        setSenhas(response.data);
        // setSenhaChamada(senhaChamada.data || null);
      } catch (error) {
        console.error("Erro ao buscar senhas:", error);
      }
    };
    fetchAtendimentos();

    socket.on("nova-senha", (senha) => {
      console.log("🔥 Nova senha chamada:", senha);
      setSenhaChamada(senha);

      audio.currentTime = 0;
      audio.volume = 1.0;
      audio.play().catch(() => {});
    });

    socket.on("fila-atualizada", () => {
      console.log("♻️ Fila atualizada — Recargando...");
      fetchAtendimentos();
    });

    // 4️⃣ Cleanup na saída do componente
    return () => {
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
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{s.cod}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(s.status)} capitalize`}>{s.status}</span>
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

        <div className="bg-white rounded-2xl shadow-2xl p-12 mb-8 w-96 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Senha Atual</h2>
          {senhaChamada ? (
            <div className="animate-fade-in">
              <p className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{senhaChamada.cod}</p>
            </div>
          ) : (
            <p className="text-2xl text-gray-500">Nenhuma senha chamada</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SenhasTriagem;
