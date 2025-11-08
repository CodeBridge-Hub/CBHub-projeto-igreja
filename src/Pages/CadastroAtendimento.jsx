import { useState, useEffect } from "react";
import axios from "../services/axios.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useCadastro } from "../CadastroContext";

const CadastroAtendimento = () => {
  const [paciente, setPaciente] = useState();
  const [servicos, setServicos] = useState([]);
  const [servicoId, setServicoId] = useState("");
  const [observacao, setObservacao] = useState("");
  const [listaItens, setListaItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { resetFormData } = useCadastro();
  const location = useLocation();
  const pacienteId = location.state?.pacienteId;

  console.log("ID recebido:", pacienteId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pacientesRes, servicosRes] = await Promise.all([axios.get(`https://portaligrejaback.siaeserver.com/api/pacientes/${pacienteId}`), axios.get("https://portaligrejaback.siaeserver.com/api/servicos")]);

        const pacientesData = await pacientesRes.data;
        const servicosData = await servicosRes.data;

        setPaciente(pacientesData);
        setServicos(servicosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdicionar = () => {
    if (!servicoId) {
      alert("Selecione um paciente e um serviço");
      return;
    }

    // Verifica se o serviço já foi adicionado
    if (listaItens.some((item) => item.id_servico === servicoId)) {
      alert("Este serviço já foi adicionado para o paciente.");
      return;
    }

    // Encontra o serviço selecionado
    const servicoSelecionado = servicos.find((s) => s.id === servicoId);
    if (!servicoSelecionado) {
      alert("Serviço inválido");
      return;
    }

    // Construção do objeto de atendimento
    const novoItem = {
      id_servico: servicoSelecionado.id,
      id_paciente: paciente.id,
      cod: `${servicoSelecionado.cod} ${paciente.cod.toUpperCase()}`, // cod do serviço + cod do paciente
    };

    // Adiciona à lista
    setListaItens([...listaItens, novoItem]);

    // Limpa o select e observação
    setServicoId("");
    setObservacao("");
  };

  // Remoção
  const handleRemover = (cod) => {
    setListaItens(listaItens.filter((item) => item.cod !== cod));
  };

  // Salvamento (exemplo de envio para API)
  const handleSalvar = async () => {
    try {
      const response = await axios.post(
  "https://portaligrejaback.siaeserver.com/api/atendimentos/create",
  { items: listaItens } // <- agora sim, req.body.items vai existir
)
      console.log("Atendimentos salvos:", response.data);
      alert("Atendimentos salvos com sucesso!");
      setListaItens([]); // Limpa a lista
      resetFormData()
      navigate("/cadastro-pacientes")
    } catch (error) {
      console.error("Erro ao salvar atendimentos:", error);
      alert("Erro ao salvar os atendimentos");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Card de Cadastro */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Cadastro de Atendimento</h1>
          {/* Campos do Paciente (somente leitura) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              <input type="text" value={paciente?.nome || ""} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
              <input type="text" value={paciente?.cpf || ""} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <input type="text" value={paciente?.telefone || ""} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
              <input type="date" value={paciente?.data_nascimento || ""} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 outline-none" />
            </div>
          </div>

          {/* Select Serviço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Serviço</label>
            <select value={servicoId} onChange={(e) => setServicoId(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-200">
              <option value="">Selecione um serviço</option>
              {servicos.map((servico) => (
                <option key={servico.id} value={servico.id}>
                  {servico.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition resize-none"
              placeholder="Digite observações sobre o atendimento..."
            />
          </div>

          {/* Botão Adicionar */}
          <button onClick={handleAdicionar} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200 shadow-md">
            Adicionar
          </button>
        </div>
      </div>

      {/* Lista de Serviços Adicionados */}
      {listaItens.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Serviços Adicionados</h2>

          <div className="space-y-4">
            {listaItens.map((item) => (
              <div key={item.cod} className="border border-gray-200 p-4 rounded-xl shadow-sm flex justify-between items-start hover:bg-gray-50 transition duration-200">
                <div className="flex-1 space-y-1">
                  <div className="font-semibold text-gray-800 text-lg">{item.nomeServico}</div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Código:</span> {item.cod}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Paciente:</span> {item.nomePaciente}
                  </div>
                  {item.observacao && <div className="text-sm text-gray-500 italic">{item.observacao}</div>}
                </div>
                <button onClick={() => handleRemover(item.cod)} className="ml-4 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition duration-200 font-medium text-sm">
                  Remover
                </button>
              </div>
            ))}
          </div>

          {/* Botão Salvar */}
          <button onClick={handleSalvar} className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition duration-200 shadow-md">
            Salvar
          </button>
        </div>
      )}
    </div>
  );
};
export default CadastroAtendimento;
