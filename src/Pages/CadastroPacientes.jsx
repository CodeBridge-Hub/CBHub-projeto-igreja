import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCadastro } from "../CadastroContext";
import Header from "../components/Header";
import Logo from "../assets/Logo.png";
import Footer from "../components/Footer";
import axios from "../services/axios.js";

const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  colSpan = "col-span-1",
  helperText,
  value,
  onChange,
  error,
  required = false,
  showHelper = true,
}) => {
  const showError = Boolean(error);

  return (
    <div className={`${colSpan} flex flex-col`}>
      <label
        htmlFor={id}
        className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500
          ${showError ? "border-red-500" : "border-gray-300"}
        `}
        value={value}
        onChange={onChange}
      />

      <div className="min-h-[1.25rem] mt-1">
        {showError ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          showHelper && (
            <p className="text-[15px] text-[#0F276D] font-semibold">
              {helperText}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default function CadastroPaciente() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCadastro();
  const [errors, setErrors] = useState({});

  // Inicializa o estado local buscando dados de 'formData.paciente.*'
  const [localData, setLocalData] = useState({
    paciente: {
      nome: formData.paciente.nome || "",
      data_nascimento: formData.paciente.data_nascimento || "",
      cpf: formData.paciente.cpf || "",
      telefone: formData.paciente.telefone || "",
      escolaridade: formData.paciente.escolaridade || "",
      estado_civil: formData.paciente.estado_civil || "",
      email: formData.paciente.email || "",
      possui_responsavel: formData.paciente.possui_responsavel || false,
      sexo: formData.paciente.sexo || "",
      observacoes: formData.paciente.observacoes || "",
    },
    responsavel: {
      nome_responsavel: formData.responsavel.nome_responsavel || "",
      cpf_responsavel: formData.responsavel.cpf_responsavel || "",
      telefone_responsavel: formData.responsavel.telefone_responsavel || "",
      parentesco: formData.responsavel.parentesco || "",
    },
  });

  // função para verificar se há erros no formulário
  const hasFormErrors = () => {
    // verifica se há algum erro nos campos já validados
    const hasValidationErrors = Object.values(errors).some(
      (error) => error !== ""
    );

    // Verifica campos obrigatórios não preenchidos
    const requiredFields = {
      nome: localData.paciente.nome,
      data_nascimento: localData.paciente.data_nascimento,
      escolaridade: localData.paciente.escolaridade,
      estado_civil: localData.paciente.estado_civil,
    };

    const hasMissingFields = Object.values(requiredFields).some(
      (value) => !value
    );

    // Verifica campos do responsável quando necessário
    const responsavelError =
      localData.paciente.possui_responsavel &&
      (!localData.responsavel.nome_responsavel ||
        !localData.responsavel.cpf_responsavel ||
        !localData.responsavel.parentesco ||
        errors.nome_responsavel ||
        errors.cpf_responsavel ||
        errors.parentesco);

    return (
      hasValidationErrors ||
      hasMissingFields ||
      responsavelError
    );
  };

  // Função para validar o nome completo
  const validateNome = (nome) => {
    if (!nome) return "Nome é obrigatório";
    if (nome.length < 5) return "Nome deve ter pelo menos 5 caracteres";
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(nome))
      return "Nome deve conter apenas letras e espaços";
    if (nome.trim().split(/\s+/).length < 1)
      return "Por favor, insira o nome completo (nome e sobrenomes)";
    return "";
  };

  const validateEmail = (email) => {
    if (!email || email.trim() === "") return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Digite um e-mail válido";
    return "";
  };

  // --- validação de cpf modificada ---
  const validateCPF = (cpf) => {
    // caso esteja vazia, retorna válido mas não é obrigatório
    if (!cpf) return "";

    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/[^\d]/g, "");

    if (cleanCPF.length !== 11) return "CPF deve ter 11 dígitos";

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return "CPF inválido";

    let sum = 0;
    let remainder;

    // Primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10)))
      return "CPF inválido";

    // Segundo dígito
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11)))
      return "CPF inválido";

    return "";
  };

  const validateDataNascimento = (data) => {
    if (!data) return "Data de nascimento é obrigatória";

    const dataNascimento = new Date(data);
    const hoje = new Date();

    if (isNaN(dataNascimento.getTime())) return "Data de nascimento inválida";
    if (dataNascimento > hoje)
      return "Data de nascimento não pode ser no futuro";

    return "";
  };

  const validateEscolaridade = (escolaridade) => {
    if (!escolaridade) return "Escolaridade é obrigatória";
    const opcoesValidas = [
      "Fundamental Incompleto",
      "Fundamental Completo",
      "Médio Incompleto",
      "Médio Completo",
      "Superior Incompleto",
      "Superior Completo",
      "Pós-graduação",
    ];
    if (!opcoesValidas.includes(escolaridade))
      return "Selecione uma opção válida";
    return "";
  };

  const validateEstadoCivil = (estadoCivil) => {
    if (!estadoCivil) return "Estado civil é obrigatório";
    const opcoesValidas = [
      "Solteiro(a)",
      "Casado(a)",
      "Divorciado(a)",
      "Viúvo(a)",
      "União Estável",
    ];
    if (!opcoesValidas.includes(estadoCivil))
      return "Selecione uma opção válida";
    return "";
  };

  // Funções de validação para os campos do responsável
  const validateNomeResponsavel = (nome, possuiResponsavel) => {
    if (!possuiResponsavel) return "";
    if (!nome) return "Nome do responsável é obrigatório";
    if (nome.length < 5)
      return "Nome do responsável deve ter pelo menos 5 caracteres";
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(nome))
      return "Nome do responsável deve conter apenas letras e espaços";
    if (nome.trim().split(/\s+/).length < 2)
      return "Por favor, insira nome e sobrenome do responsável";
    return "";
  };

  const validateCPFResponsavel = (cpf, possuiResponsavel) => {
    if (!possuiResponsavel) return "";
    if (!cpf) return "CPF do responsável é obrigatório";

    const cleanCPF = cpf.replace(/[^\d]/g, "");
    if (cleanCPF.length !== 11) return "CPF do responsável deve ter 11 dígitos";
    if (/^(\d)\1{10}$/.test(cleanCPF)) return "CPF do responsável inválido";

    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10)))
      return "CPF do responsável inválido";

    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11)))
      return "CPF do responsável inválido";

    return "";
  };

  const validateParentesco = (parentesco, possuiResponsavel) => {
    if (!possuiResponsavel) return "";
    if (!parentesco) return "Selecione o parentesco do responsável";
    const opcoesValidas = [
      "mae",
      "pai",
      "avo",
      "tia",
      "tio",
      "irma",
      "irmao",
      "outro",
    ];
    if (!opcoesValidas.includes(parentesco))
      return "Selecione uma opção válida de parentesco";
    return "";
  };

  // Função para atualizar os estados locais
  const handleChange = (e, defaultValue = null, scope = "paciente") => {
    const { name, value, type, checked } = e.target;

    const newValue =
      type === "checkbox"
        ? checked
        : type === "radio" && defaultValue !== null
        ? defaultValue === "Sim"
        : defaultValue ?? value;

    setLocalData((prev) => ({
      ...prev,
      [scope]: {
        ...prev[scope],
        [name]: newValue,
      },
    }));

    // Validações específicas para cada campo
    if (name === "nome") {
      setErrors((prev) => ({ ...prev, nome: validateNome(value) }));
    } else if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === "cpf") {
      // --- REATIVADO: Validação do CPF do paciente ---
      setErrors((prev) => ({ ...prev, cpf: validateCPF(value) }));
    } else if (name === "data_nascimento") {
      setErrors((prev) => ({
        ...prev,
        data_nascimento: validateDataNascimento(value),
      }));
    } else if (name === "escolaridade") {
      setErrors((prev) => ({
        ...prev,
        escolaridade: validateEscolaridade(value),
      }));
    } else if (name === "estado_civil") {
      setErrors((prev) => ({
        ...prev,
        estado_civil: validateEstadoCivil(value),
      }));
    } else if (name === "nome_responsavel") {
      setErrors((prev) => ({
        ...prev,
        nome_responsavel: validateNomeResponsavel(
          value,
          localData.paciente.possui_responsavel
        ),
      }));
    } else if (name === "cpf_responsavel") {
      setErrors((prev) => ({
        ...prev,
        cpf_responsavel: validateCPFResponsavel(
          value,
          localData.paciente.possui_responsavel
        ),
      }));
    } else if (name === "parentesco") {
      setErrors((prev) => ({
        ...prev,
        parentesco: validateParentesco(
          value,
          localData.paciente.possui_responsavel
        ),
      }));
    } else if (name === "possui_responsavel") {
      const nomeResponsavelError = validateNomeResponsavel(
        localData.responsavel.nome_responsavel,
        value === "Sim"
      );
      const cpfResponsavelError = validateCPFResponsavel(
        localData.responsavel.cpf_responsavel,
        value === "Sim"
      );
      const parentescoError = validateParentesco(
        localData.responsavel.parentesco,
        value === "Sim"
      );

      setErrors((prev) => ({
        ...prev,
        nome_responsavel: nomeResponsavelError,
        cpf_responsavel: cpfResponsavelError,
        parentesco: parentescoError,
      }));
    }
  };

  // Função para salvar na mochila
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos os campos obrigatórios
    const nomeError = validateNome(localData.paciente.nome);
    const emailError = validateEmail(localData.paciente.email);
    const cpfError = validateCPF(localData.paciente.cpf); // <-- VALIDAÇÃO DO CPF
    const dataNascimentoError = validateDataNascimento(
      localData.paciente.data_nascimento
    );
    const escolaridadeError = validateEscolaridade(
      localData.paciente.escolaridade
    );
    const estadoCivilError = validateEstadoCivil(
      localData.paciente.estado_civil
    );

    // Validações do responsável
    const nomeResponsavelError = validateNomeResponsavel(
      localData.responsavel.nome_responsavel,
      localData.paciente.possui_responsavel
    );
    const cpfResponsavelError = validateCPFResponsavel(
      localData.responsavel.cpf_responsavel,
      localData.paciente.possui_responsavel
    );
    const parentescoError = validateParentesco(
      localData.responsavel.parentesco,
      localData.paciente.possui_responsavel
    );

    setErrors((prev) => ({
      ...prev,
      nome: nomeError,
      email: emailError,
      cpf: cpfError,
      data_nascimento: dataNascimentoError,
      escolaridade: escolaridadeError,
      estado_civil: estadoCivilError,
      nome_responsavel: nomeResponsavelError,
      cpf_responsavel: cpfResponsavelError,
      parentesco: parentescoError,
    }));

    // Se houver qualquer erro, não prossegue
    // (O CPF só dará erro aqui se validateCPF retornar string não vazia)
    if (
      nomeError ||
      emailError ||
      cpfError ||
      dataNascimentoError ||
      escolaridadeError ||
      estadoCivilError ||
      (localData.paciente.possui_responsavel &&
        (nomeResponsavelError || cpfResponsavelError || parentescoError))
    ) {
      return;
    }

    updateFormData(localData);
    console.log("Dados após atualização do contexto:", localData);

    navigate("/second-page-paciente");
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center gap-8 py-10 px-4 sm:px-6">
        <div className="w-full max-w-[1344px] flex flex-col sm:flex-row justify-center items-center gap-4 text-center sm:text-left">
          <img
            src={Logo}
            alt="Logo da Instituição"
            className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px]"
          />
          <h2 className="font-bold text-[#060F2A] text-2xl sm:text-3xl lg:text-4xl">
            Sistema Integrado de Atendimento
          </h2>
        </div>

        <div className="w-full max-w-[1344px] bg-white rounded-2xl shadow-[0_8px_16px_rgba(113,146,255,0.25)] p-6 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B]">
              Cadastro de Paciente/Responsável
            </h3>
            <h5 className="text-[#0A1B4B] font-normal text-[16px] mt-4">
              Atendimento social, jurídico e de saúde, rápido e integrado.
            </h5>
          </div>
          <div className="flex items-center justify-center mb-10">
            {/* ... Stepper ... */}
          </div>

          <form className="space-y-10" onSubmit={handleSubmit}>
            <section>
              <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B] mb-6 text-center">
                Dados Pessoais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label="Nome completo"
                  id="nome"
                  placeholder="Abimael Barros Castro Denifrer"
                  colSpan="md:col-span-3"
                  value={localData.paciente.nome}
                  onChange={(e) => handleChange(e, null, "paciente")}
                  error={errors.nome}
                  required={true}
                  helperText="Digite seu nome completo (nome e sobrenomes)"
                />
                <FormField
                  label="Data de nascimento"
                  id="data_nascimento"
                  placeholder="DD/MM/AAAA"
                  type="date"
                  value={localData.paciente.data_nascimento}
                  onChange={(e) => handleChange(e, null, "paciente")}
                  error={errors.data_nascimento}
                  required={true}
                  helperText="Informe sua data de nascimento"
                />

               {/* campo alterado */}
                <FormField
                  label="CPF"
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={localData.paciente.cpf}
                  onChange={(e) => handleChange(e, null, "paciente")}
                  error={errors.cpf}
                  helperText="Opcional. Se preencher, digite um CPF válido"
                />

          
                <FormField
                  label="Telefone / Whatsapp"
                  id="telefone"
                  placeholder="(98) 9 1234-5678"
                  value={localData.paciente.telefone}
                  onChange={(e) => handleChange(e, null, "paciente")}
                />

              
                <div className="md:col-span-1">
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1">
                    <h4>Sexo</h4>
                  </label>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sexo"
                        value="Masculino"
                        checked={localData.paciente.sexo === "Masculino"}
                        onChange={(e) => handleChange(e, null, "paciente")}
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Masculino
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sexo"
                        value="Feminino"
                        checked={localData.paciente.sexo === "Feminino"}
                        onChange={(e) => handleChange(e, null, "paciente")}
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Feminino
                    </label>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1">
                    <h4>
                      Escolaridade <span className="text-red-500">*</span>
                    </h4>
                  </label>
                  <select
                    name="escolaridade"
                    value={localData.paciente.escolaridade}
                    onChange={(e) => handleChange(e, null, "paciente")}
                    className={`w-full mt-2 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.escolaridade ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Selecione</option>
                    <option value="Fundamental Incompleto">
                      Fundamental Incompleto
                    </option>
                    <option value="Fundamental Completo">
                      Fundamental Completo
                    </option>
                    <option value="Médio Incompleto">Médio Incompleto</option>
                    <option value="Médio Completo">Médio Completo</option>
                    <option value="Superior Incompleto">
                      Superior Incompleto
                    </option>
                    <option value="Superior Completo">Superior Completo</option>
                    <option value="Pós-graduação">Pós-graduação</option>
                  </select>
                  <div className="min-h-[1.25rem] mt-1">
                    {errors.escolaridade ? (
                      <p className="text-sm text-red-600">
                        {errors.escolaridade}
                      </p>
                    ) : (
                      <p className="text-[15px] text-[#0F276D] font-semibold">
                        Selecione seu nível de escolaridade
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1">
                    <h4>
                      Estado Civil <span className="text-red-500">*</span>{" "}
                    </h4>
                  </label>
                  <select
                    name="estado_civil"
                    value={localData.paciente.estado_civil}
                    onChange={(e) => handleChange(e, null, "paciente")}
                    className={`w-full mt-2 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.estado_civil ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Selecione</option>
                    <option value="Solteiro(a)">Solteiro(a)</option>
                    <option value="Casado(a)">Casado(a)</option>
                    <option value="Divorciado(a)">Divorciado(a)</option>
                    <option value="Viúvo(a)">Viúvo(a)</option>
                    <option value="União Estável">União Estável</option>
                  </select>
                  <div className="min-h-[1.25rem] mt-1">
                    {errors.estado_civil ? (
                      <p className="text-sm text-red-600">
                        {errors.estado_civil}
                      </p>
                    ) : (
                      <p className="text-[15px] text-[#0F276D] font-semibold">
                        Selecione seu estado civil
                      </p>
                    )}
                  </div>
                </div>

                <FormField
                  label="E-mail"
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  colSpan="md:col-span-2"
                  value={localData.paciente.email}
                  onChange={(e) => handleChange(e, null, "paciente")}
                  error={errors.email}
                  helperText="Digite um e-mail válido"
                />

                {/* Bloco Responsável */}
                <div>
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-2">
                    <h4>Possui Responsável?</h4>
                  </label>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="possui_responsavel"
                        value="Sim"
                        checked={localData.paciente.possui_responsavel === true}
                        onChange={(e) => handleChange(e, "Sim", "paciente")}
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Sim
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="possui_responsavel"
                        value="Não"
                        checked={
                          localData.paciente.possui_responsavel === false
                        }
                        onChange={(e) => handleChange(e, "Não", "paciente")}
                        className="mr-2 w-[24px] h-[24px]"
                      />{" "}
                      Não
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {localData.paciente.possui_responsavel && (
              <section className="mt-8 p-6 bg-gray-100 rounded-xl border border-gray-300">
                <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B] mb-6 text-center">
                  Dados do Responsável
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Nome completo do responsável"
                    id="nome_responsavel"
                    placeholder="Ex: Maria da Silva"
                    value={localData.responsavel.nome_responsavel}
                    onChange={(e) => handleChange(e, null, "responsavel")}
                    error={errors.nome_responsavel}
                    helperText="Digite o nome completo (nome e sobrenome)"
                  />
                  <FormField
                    label="CPF do responsável"
                    id="cpf_responsavel"
                    placeholder="000.000.000-00"
                    value={localData.responsavel.cpf_responsavel}
                    onChange={(e) => handleChange(e, null, "responsavel")}
                    error={errors.cpf_responsavel}
                    helperText="Digite um CPF válido"
                  />
                  <FormField
                    label="Telefone do responsável"
                    id="telefone_responsavel"
                    placeholder="(00) 00000-0000"
                    value={localData.responsavel.telefone_responsavel}
                    onChange={(e) => handleChange(e, null, "responsavel")}
                  />

                  <div className="md:col-span-1">
                    <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1">
                      <h4>Parentesco</h4>
                    </label>
                    <select
                      name="parentesco"
                      value={localData.responsavel.parentesco}
                      onChange={(e) => handleChange(e, null, "responsavel")}
                      className="w-full  px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Selecione</option>
                      <option value="mae">Mãe</option>
                      <option value="pai">Pai</option>
                      <option value="avo">Avó/Avô</option>
                      <option value="tia">Tia/Tio</option>
                      <option value="irma">Irmã/Irmão</option>
                      <option value="outro">Outro</option>
                    </select>
                    <div className="min-h-[1.25rem] mt-1">
                      {errors.parentesco ? (
                        <p className="text-sm text-red-600">
                          {errors.parentesco}
                        </p>
                      ) : (
                        <p className="text-[15px] text-[#0F276D] font-semibold">
                          Selecione o tipo de parentesco
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            <div className="flex justify-center items-center pt-6 border-t">
              <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4 lg:gap-[24px]">
                <button
                  type="submit"
                  disabled={hasFormErrors()}
                  className={`w-full lg:w-[612px] h-[56px] flex justify-center items-center font-bold text-lg rounded-[5px] transition-all duration-300 ${
                    hasFormErrors()
                      ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                      : "bg-white text-[#193FB0] border border-[#193FB0] shadow-[0_8px_16px_rgba(113,146,255,0.25)] hover:bg-[#193FB0] hover:text-white"
                  }`}
                >
                  {hasFormErrors()
                    ? "Preencha todos os campos obrigatórios"
                    : "Salvar Cadastro e prosseguir"}
                </button>
                <button
                  type="button"
                  className="w-full lg:w-[612px] h-[56px] flex justify-center items-center bg-white text-[#BE3E1A] font-bold text-lg border border-[#BE3E1A] rounded-[5px] hover:bg-[#BE3E1A] hover:text-white transition-all duration-300"
                  onClick={() => navigate("/")}
                >
                  Cancelar
                </button>
              </div>
            </div>

            <h6 className="text-center font-bold text-[16px] text-[#0A1B4B]">
              Suas informações são confidenciais e protegidas.
            </h6>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
