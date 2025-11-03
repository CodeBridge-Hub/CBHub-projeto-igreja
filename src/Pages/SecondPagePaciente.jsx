import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCadastro } from "../CadastroContext";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FormCadastroLayout from "../components/FormCadastroLayout";
import axios from "../services/axios.js";

const FormField = ({ label, id, type = "text", placeholder, colSpan = "col-span-1", helperText, value, onChange, error, required = false, showHelper = true }) => {
  const showError = Boolean(error);
  return (
    <div className={colSpan}>
      <label htmlFor={id} className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
          showError ? 'border-red-500' : 'border-gray-300'
        }`}
        value={value}
        onChange={onChange}
      />
      {/* Espaço fixo para helper/erro */}
      <div className="min-h-[1.25rem] mt-1">
        {showError ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          showHelper && (
            <p className="text-[15px] text-[#0F276D] font-semibold">{helperText}</p>
          )
        )}
      </div>
    </div>
  );
};

export default function SecondPagePaciente() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCadastro();

  // Inicializa o estado local buscando dados do formData.endereco*
  const [localData, setLocalData] = useState({
    rua: formData.endereco.rua || "",
    bairro: formData.endereco.bairro || "",
    numero: formData.endereco.numero || "",
    cep: formData.endereco.cep || "",
    estado: formData.endereco.estado || "",
    cidade: formData.endereco.cidade || "",
    complemento: formData.endereco.complemento || "",
  });

  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [errors, setErrors] = useState({});

  // Função para verificar se há erros no formulário
  const hasFormErrors = () => {
    // Verifica se há algum erro nos campos já validados
    const hasValidationErrors = Object.values(errors).some(error => error !== "");

    // Verifica campos obrigatórios não preenchidos
    const requiredFields = {
      rua: localData.rua,
      bairro: localData.bairro,
      numero: localData.numero,
      cep: localData.cep,
      estado: localData.estado,
      cidade: localData.cidade
    };

    const hasMissingFields = Object.values(requiredFields).some(value => !value);

    return hasValidationErrors || hasMissingFields;
  };

  // 🔹 Buscar lista de estados do IBGE
  useEffect(() => {
    const getUF = async () => {
      try {
        const response = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        // Ordena por nome
        const estadosOrdenados = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
        setEstados(estadosOrdenados);
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
      }
    };
    getUF();
  }, []);

  const getMunicipios = async (sigla) => {
    try {
      const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`);
      const municipiosOrdenados = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
      setMunicipios(municipiosOrdenados);
    } catch (error) {
      console.error("Erro ao carregar municípios:", error);
    }
  };

  // Funções de validação dos campos de endereço
  const validateRua = (rua) => {
    if (!rua || rua.trim() === "") return "Endereço é obrigatório";
    if (rua.trim().length < 5) return "Digite um endereço válido";
    return "";
  };

  const validateBairro = (bairro) => {
    if (!bairro || bairro.trim() === "") return "Bairro é obrigatório";
    if (bairro.trim().length < 3) return "Digite um bairro válido";
    return "";
  };

  const validateNumero = (numero) => {
    if (!numero || numero.toString().trim() === "") return "Número é obrigatório";
    // permite números e caracteres comuns de complemento (ex: 50A, 50-B)
    if (!/^[\dA-Za-z\-\/]+$/.test(numero.toString().trim())) return "Número inválido";
    return "";
  };

  const validateCEP = (cep) => {
    if (!cep || cep.trim() === "") return "CEP é obrigatório";
    const cepClean = cep.trim();
    if (!/^\d{5}-?\d{3}$/.test(cepClean)) return "CEP inválido (formato 00000-000)";
    return "";
  };

  const validateEstado = (estado) => {
    if (!estado || estado.toString().trim() === "") return "Estado é obrigatório";
    return "";
  };

  const validateCidade = (cidade) => {
    if (!cidade || cidade.trim() === "") return "Cidade é obrigatória";
    return "";
  };

  // Função handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Atualiza localData normalmente
    setLocalData((prev) => ({ ...prev, [name]: value }));

    // Validações em tempo real para os campos de endereço
    if (name === "rua") {
      const err = validateRua(value);
      setErrors((prev) => ({ ...prev, rua: err }));
    } else if (name === "bairro") {
      const err = validateBairro(value);
      setErrors((prev) => ({ ...prev, bairro: err }));
    } else if (name === "numero") {
      const err = validateNumero(value);
      setErrors((prev) => ({ ...prev, numero: err }));
    } else if (name === "cep") {
      const err = validateCEP(value);
      setErrors((prev) => ({ ...prev, cep: err }));
    } else if (name === "cidade") {
      const err = validateCidade(value);
      setErrors((prev) => ({ ...prev, cidade: err }));
    }

    // Atualiza cidades quando o estado muda (tratamento especial)
    if (name === "estado") {
      const estadoSelecionado = estados.find((uf) => uf.id === parseInt(value));
      if (estadoSelecionado) {
        getMunicipios(estadoSelecionado.sigla);
        // atualiza o estado com o nome e reseta a cidade
        setLocalData((prev) => ({
          ...prev,
          estado: estadoSelecionado.id,
          cidade: "",
        }));
        // valida o estado selecionado
        const err = validateEstado(estadoSelecionado.nome);
        setErrors((prev) => ({ ...prev, estado: err, cidade: "" }));
      } else {
        // se nenhum estado correspondente, guarda o raw value e valida
        setErrors((prev) => ({ ...prev, estado: validateEstado(value) }));
      }
    }
  };

  // Função handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Executa todas as validações
    const ruaError = validateRua(localData.rua);
    const bairroError = validateBairro(localData.bairro);
    const numeroError = validateNumero(localData.numero);
    const cepError = validateCEP(localData.cep);
    const estadoError = validateEstado(localData.estado);
    const cidadeError = validateCidade(localData.cidade);

    const newErrors = {
      rua: ruaError,
      bairro: bairroError,
      numero: numeroError,
      cep: cepError,
      estado: estadoError,
      cidade: cidadeError,
    };

    setErrors((prev) => ({ ...prev, ...newErrors }));

    // Se existir qualquer erro, não avança
    const hasErrors = Object.values(newErrors).some((err) => err && err !== "");
    if (hasErrors) return;

    localData.estado = estados.find((uf) => uf.id === parseInt(localData.estado)).nome;
    console.log("Dados de endereço validados:", localData);
    updateFormData({ endereco: localData });
    navigate("/cadastro-pacientes3");
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center gap-8 py-10 px-4 sm:px-6 pb-20 lg:pb-40">
        <FormCadastroLayout 
          step={2} 
          title="Dados de endereço" 
          onSubmit={handleSubmit} 
          onCancel={() => navigate("/")}
          isSubmitDisabled={hasFormErrors()}
          submitText={hasFormErrors() ? "Preencha todos os campos obrigatórios" : "Salvar Cadastro e prosseguir"}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* atualiza o id e o name para logradouro */}
            <FormField
              label="Endereço completo (Rua, avenida e etc.):"
              id="rua"
              placeholder="Ex.: Avenida dos Holandeses, nº 4500"
              colSpan="md:col-span-3"
              value={localData.rua}
              onChange={handleChange}
              error={errors.rua}
              required={true}
              helperText="Informe o logradouro e número, se possível"
            />
            <FormField
              label="Bairro:"
              id="bairro"
              placeholder="Ex.: Centro Histórico"
              colSpan="md:col-span-1"
              value={localData.bairro}
              onChange={handleChange}
              error={errors.bairro}
              required={true}
              helperText="Informe o bairro"
            />
            <FormField
              label="Número da residência:"
              id="numero"
              placeholder="Ex.: 50"
              colSpan="md:col-span-1"
              value={localData.numero}
              onChange={handleChange}
              error={errors.numero}
              required={true}
              helperText="Número da casa/prédio"
            />
            <FormField
              label="Complemento:"
              id="complemento"
              placeholder="Ex.: Apto 101, Bloco B"
              colSpan="md:col-span-1"
              value={localData.complemento}
              onChange={handleChange}
            />
            <FormField
              label="CEP:"
              id="cep"
              placeholder="65000-000"
              colSpan="md:col-span-1"
              value={localData.cep}
              onChange={handleChange}
              error={errors.cep}
              required={true}
              helperText="Formato: 00000-000"
            />
            {/* Campo: Estado */}
            <div className="md:col-span-1">
              <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1">
                <h4>Estado</h4>
              </label>
              <select id="estado" name="estado" value={localData.estado} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 ${errors.estado ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="">Selecione o Estado</option>
                {estados.map((uf) => (
                  <option key={uf.id} value={uf.id}>
                    {uf.nome}
                  </option>
                ))}
              </select>
              <div className="min-h-[1.25rem] mt-1">
                {errors.estado ? (
                  <p className="text-sm text-red-600">{errors.estado}</p>
                ) : (
                  <p className="text-[15px] text-[#0F276D] font-semibold">Selecione o estado</p>
                )}
              </div>
            </div>

            {/* Campo: Cidade */}
            <div className="md:col-span-1">
              <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1">
                <h4>Cidade</h4>
              </label>
              <select id="cidade" name="cidade" value={localData.cidade} onChange={handleChange} disabled={!municipios.length} className={`w-full px-4 py-2 border rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 ${errors.cidade ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="">{municipios.length ? "Selecione a Cidade" : "Selecione um Estado"}</option>
                {municipios.map((mun) => (
                  <option key={mun.id} value={mun.nome}>
                    {mun.nome}
                  </option>
                ))}
              </select>
              <div className="min-h-[1.25rem] mt-1">
                {errors.cidade ? (
                  <p className="text-sm text-red-600">{errors.cidade}</p>
                ) : (
                  <p className="text-[15px] text-[#0F276D] font-semibold">Selecione sua cidade</p>
                )}
              </div>
            </div>
          </div>
        </FormCadastroLayout>
      </main>

      <Footer />
    </div>
  );
}
