import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import axios from "../services/axios.js";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); // <-- Novo estado para pesquisa

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get("https://portaligreja.siaeserver.com/api/pacientes");
        setPacientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow w-full flex justify-center py-8 px-4">
        <div className="w-full max-w-[1000px] p-4 md:p-8 bg-white shadow-xl rounded-lg">
          
          {/* Título e Barra de Pesquisa */}
          <div className="flex flex-col items-center mb-8">
            <h2 className="font-bold text-[#0A1B4B] text-2xl md:text-3xl lg:text-[32px] text-center">
              Pacientes Cadastrados
            </h2>

            {/* Barra de Pesquisa */}
            <div className="w-full mt-4 flex justify-center">
              <input
                type="text"
                placeholder="Pesquisar paciente pelo nome ou CPF..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Informações da Lista */}
          <section className="mb-6 border-b pb-4">
            <h4 className="text-[18px] leading-tight font-bold text-[#0A1B4B] text-left mb-2">
              {loading
                ? "Carregando pacientes..."
                : `Total de pacientes: ${pacientes.length}`}
            </h4>
            <p className="text-sm text-gray-600 text-left">
              Lista de pacientes cadastrados com informações resumidas. Clique em
              <strong> "Ver" </strong> para mais detalhes.
            </p>
          </section>

          {/* Lista de Pacientes */}
          <section className="space-y-3">
            {!loading && pacientes.length === 0 && (
              <div className="bg-gray-100 rounded-lg p-5 text-center text-gray-600 border border-gray-200">
                Nenhum paciente encontrado.
              </div>
            )}

            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 rounded-lg p-3 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    <div className="w-[300px] max-w-[50vw]">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="w-20 h-4 bg-gray-300 rounded"></div>
                </div>
              ))}

            {!loading &&
              pacientes
                .filter((paciente) =>
                  paciente.nome && paciente.cpf
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((paciente) => {
                  const isExpanded = expandedIds.includes(paciente.id);
                  return (
                    <article
                      key={paciente.id}
                      className={`bg-white rounded-lg p-4 shadow-md transition-all duration-300 ease-in-out border ${
                        isExpanded
                          ? "border-blue-500 shadow-lg"
                          : "border-gray-200 hover:shadow-lg"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 w-full">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          {/* Inicial do Nome */}
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white font-semibold text-lg">
                              {(paciente.nome || "?")
                                .slice(0, 1)
                                .toUpperCase()}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                              <h5 className="text-base font-semibold text-[#0F172A] truncate">
                                {paciente.nome || "—"}
                              </h5>
                              <p className="text-xs text-gray-500 hidden sm:block">
                                CPF: {paciente.cpf || "—"}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                              <span className="truncate">
                                Condição: <strong>{paciente.condicao_saude || "N/A"}</strong>
                              </span>
                              <span className="text-gray-400 hidden md:inline">
                                |
                              </span>
                              <span className="text-xs text-gray-400 hidden md:inline">
                                Nascimento:{" "}
                                {paciente.data_nascimento
                                  ? new Date(
                                      paciente.data_nascimento
                                    ).toLocaleDateString()
                                  : "—"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Botões e Status */}
                        <div className="flex-shrink-0 flex flex-col sm:flex-row items-end sm:items-center gap-3">
                          <div
                            className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                              paciente.possui_responsavel
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                            }`}
                          >
                            {paciente.possui_responsavel
                              ? "Com Responsável"
                              : "Sem Responsável"}
                          </div>
                          <button
                            onClick={() => toggleExpand(paciente.id)}
                            className={`text-sm font-semibold transition-colors duration-150 p-2 rounded ${
                              isExpanded
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-blue-50 text-[#2563EB] hover:bg-blue-100"
                            }`}
                          >
                            {isExpanded
                              ? "Ocultar Detalhes"
                              : "Ver Detalhes"}
                          </button>
                        </div>
                      </div>

                      {/* Detalhes Expandidos */}
                      {isExpanded && (
                        <div className="mt-4 pt-3 border-t border-gray-200 space-y-2 text-sm text-gray-700">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                            <div>
                              <strong className="text-[#0A1B4B]">
                                Telefone:
                              </strong>{" "}
                              {paciente.telefone || "—"}
                            </div>
                            <div>
                              <strong className="text-[#0A1B4B]">CPF:</strong>{" "}
                              {paciente.cpf || "—"}
                            </div>
                            <div>
                              <strong className="text-[#0A1B4B]">
                                Data Nasc.:
                              </strong>{" "}
                              {paciente.data_nascimento
                                ? new Date(
                                    paciente.data_nascimento
                                  ).toLocaleDateString()
                                : "—"}
                            </div>
                            <div>
                              <strong className="text-[#0A1B4B]">
                                Possui Deficiência:
                              </strong>{" "}
                              {paciente.possui_deficiencia ? "Sim" : "Não"}
                            </div>
                            {paciente.possui_deficiencia && (
                              <div className="md:col-span-2">
                                <strong className="text-[#0A1B4B]">
                                  Tipo de Deficiência:
                                </strong>{" "}
                                {paciente.deficiencia || "—"}
                              </div>
                            )}
                            <div className="md:col-span-2">
                              <strong className="text-[#0A1B4B]">
                                Observações:
                              </strong>{" "}
                              {paciente.observacoes || "—"}
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pacientes;
