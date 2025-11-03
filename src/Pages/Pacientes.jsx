import { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import axios from "../services/axios.js";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]); // IDs dos cards expandidos

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/pacientes");
        setPacientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  // Toggle expand/collapse
  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <header>
        <div className="mx-auto w-full max-w-[1344px] px-6 py-6 flex flex-col sm:flex-row justify-center items-center gap-3 text-center sm:text-left">
          <img src={Logo} className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px]" alt="logo" />
          <h2 className="font-bold text-[#0F172A] text-2xl sm:text-3xl lg:text-[40px]">Pacientes Cadastrados</h2>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1344px] px-4 lg:px-6 py-8">
        <section className="mb-6">
          <h4 className="text-[20px] leading-tight font-bold text-[#0A1B4B] text-center md:text-left mb-3">
            {loading ? "Carregando pacientes..." : `Total de pacientes: ${pacientes.length}`}
          </h4>
          <p className="text-sm text-gray-500 text-center md:text-left">Lista de pacientes cadastrados com informações resumidas. Clique em "Ver" para mais detalhes.</p>
        </section>

        <section className="space-y-3">
          {/* Empty state */}
          {!loading && pacientes.length === 0 && (
            <div className="bg-white rounded-lg p-4 text-center text-gray-600">Nenhum paciente encontrado.</div>
          )}

          {/* Loading skeletons as compact rows */}
          {loading && (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg p-3 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="w-[420px] max-w-[50vw]">
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="w-24 h-3 bg-gray-200 rounded"></div>
              </div>
            ))
          )}

          {/* Compact card-rows (like table rows) */}
          {!loading && pacientes.map((paciente) => {
            const isExpanded = expandedIds.includes(paciente.id);
            return (
              <article key={paciente.id} className="bg-white rounded-lg p-3 shadow-sm flex items-center justify-between transition-shadow duration-150">
                <div className="flex items-center gap-4 w-full">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6ee7b7] to-[#3b82f6] flex items-center justify-center text-white font-semibold">{(paciente.nome || '?').slice(0,1).toUpperCase()}</div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <h5 className="text-sm md:text-base font-medium text-[#0F172A] truncate">{paciente.nome || '—'}</h5>
                          <p className="text-xs text-gray-400">CPF: {paciente.cpf || '—'}</p>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-1">Condição: {paciente.condicao_saude || 'N/A'}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${paciente.possui_responsavel ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {paciente.possui_responsavel ? 'Com responsável' : 'Sem responsável'}
                        </div>
                        <div className="text-xs text-gray-400">{paciente.data_nascimento ? new Date(paciente.data_nascimento).toLocaleDateString() : '—'}</div>
                        <button onClick={() => toggleExpand(paciente.id)} className="text-sm text-[#2563EB] font-medium">{isExpanded ? 'Ocultar' : 'Ver'}</button>
                      </div>
                    </div>

                    {/* Expanded details as compact row section */}
                    {isExpanded && (
                      <div className="mt-3 text-xs text-gray-700 border-t pt-2 space-y-1">
                        <div>Possui deficiência: {paciente.possui_deficiencia ? 'Sim' : 'Não'}</div>
                        {paciente.possui_deficiencia && <div>Deficiência: {paciente.deficiencia || '—'}</div>}
                        <div>Telefone: {paciente.telefone || '—'}</div>
                        <div>Observações: {paciente.observacoes || '—'}</div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Pacientes;
