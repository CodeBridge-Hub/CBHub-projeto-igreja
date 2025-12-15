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
  required = false, // novo: opcional
  showHelper = true, // novo: permite desligar helperText
}) => {
  const showError = Boolean(error);

  return (
    <div className={`${colSpan} flex flex-col`}>
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Campo */}
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


export default function CadastroPaciente() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCadastro();
  const [errors, setErrors] = useState({});

  // Função para verificar se há erros no formulário
  const hasFormErrors = () => {
    // Verifica se há algum erro nos campos já validados
    const hasValidationErrors = Object.values(errors).some(error => error !== "");

    // Verifica campos obrigatórios não preenchidos
    const requiredFields = {
      nome: localData.paciente.nome,
      data_nascimento: localData.paciente.data_nascimento,
      // cpf: localData.paciente.cpf,
      escolaridade: localData.paciente.escolaridade,
      estado_civil: localData.paciente.estado_civil,
      // condicao_saude: localData.paciente.condicao_saude
    };

    const hasMissingFields = Object.values(requiredFields).some(value => !value);

    // Verifica campo de deficiência quando necessário
    const deficiencyError = localData.paciente.possui_deficiencia === true && !localData.paciente.deficiencia;

    // Verifica campo de condição de saúde "Outro" quando necessário
    const healthConditionError = localData.paciente.condicao_saude === "Outro" && !localData.paciente.condicao_saude_outro;

    // Verifica campos do responsável quando necessário
    const responsavelError = localData.paciente.possui_responsavel && (
      !localData.responsavel.nome_responsavel ||
      !localData.responsavel.cpf_responsavel ||
      !localData.responsavel.parentesco ||
      errors.nome_responsavel ||
      errors.cpf_responsavel ||
      errors.parentesco
    );

    return hasValidationErrors || hasMissingFields || deficiencyError || healthConditionError || responsavelError;
  };

  // Função para validar o nome completo
  const validateNome = (nome) => {
    if (!nome) return "Nome é obrigatório";
    if (nome.length < 5) return "Nome deve ter pelo menos 5 caracteres";
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(nome)) return "Nome deve conter apenas letras e espaços";
    if (nome.trim().split(/\s+/).length < 1) return "Por favor, insira o nome completo (nome e sobrenomes)";
    return "";
  };

  const validateEmail = (email) => {
    // Se o campo estiver vazio, não retorna erro pois é opcional
    if (!email || email.trim() === "") return "";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Digite um e-mail válido";
    return "";
  };

  // const validateCPF = (cpf) => {  
  //   // Remove caracteres não numéricos
  //   const cleanCPF = cpf.replace(/[^\d]/g, '');
    
  //   if (cleanCPF.length !== 11) return "CPF deve ter 11 dígitos";
    
  //   // Verifica se todos os dígitos são iguais
  //   if (/^(\d)\1{10}$/.test(cleanCPF)) return "CPF inválido";
    
  //   // Validação dos dígitos verificadores
  //   let sum = 0;
  //   let remainder;
    
  //   // Primeiro dígito verificador
  //   for (let i = 1; i <= 9; i++) {
  //     sum = sum + parseInt(cleanCPF.substring(i-1, i)) * (11 - i);
  //   }
    
  //   remainder = (sum * 10) % 11;
  //   if (remainder === 10 || remainder === 11) remainder = 0;
  //   if (remainder !== parseInt(cleanCPF.substring(9, 10))) return "CPF inválido";
    
  //   // Segundo dígito verificador
  //   sum = 0;
  //   for (let i = 1; i <= 10; i++) {
  //     sum = sum + parseInt(cleanCPF.substring(i-1, i)) * (12 - i);
  //   }
    
  //   remainder = (sum * 10) % 11;
  //   if (remainder === 10 || remainder === 11) remainder = 0;
  //   if (remainder !== parseInt(cleanCPF.substring(10, 11))) return "CPF inválido";
    
  //   return "";
  // };

  const validateDataNascimento = (data) => {
    if (!data) return "Data de nascimento é obrigatória";
    
    const dataNascimento = new Date(data);
    const hoje = new Date();
    
    if (isNaN(dataNascimento.getTime())) return "Data de nascimento inválida";
    if (dataNascimento > hoje) return "Data de nascimento não pode ser no futuro";
    
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
      "Pós-graduação"
    ];
    
    if (!opcoesValidas.includes(escolaridade)) return "Selecione uma opção válida";
    
    return "";
  };

  const validateEstadoCivil = (estadoCivil) => {
    if (!estadoCivil) return "Estado civil é obrigatório";
    
    const opcoesValidas = [
      "Solteiro(a)",
      "Casado(a)",
      "Divorciado(a)",
      "Viúvo(a)",
      "União Estável"
    ];
    
    if (!opcoesValidas.includes(estadoCivil)) return "Selecione uma opção válida";
    
    return "";
  };

  // const validateCondicaoSaude = (condicao, outroValor) => {
  //   if (!condicao) return "Por favor, selecione uma opção";
    
  //   const opcoesValidas = ["Diabetes", "Hipertensão", "Alergia", "Nenhuma", "Outro"];
  //   if (!opcoesValidas.includes(condicao)) return "Selecione uma opção válida";
    
  //   if (condicao === "Outro" && !outroValor?.trim()) {
  //     return "Por favor, especifique a condição de saúde";
  //   }
    
  //   return "";
  // };

  // const validateDeficiencia = (possuiDeficiencia, deficiencia) => {
  //   // Se não possui deficiência, não precisa validar
  //   if (!possuiDeficiencia) return "";
    
  //   // Se possui deficiência, o campo de descrição é obrigatório
  //   if (!deficiencia?.trim()) {
  //     return "Por favor, especifique qual é a deficiência";
  //   }
    
  //   // Verifica se a descrição tem pelo menos 3 caracteres
  //   if (deficiencia.trim().length < 3) {
  //     return "A descrição da deficiência deve ter pelo menos 3 caracteres";
  //   }
    
  //   return "";
  // };

  // Funções de validação para os campos do responsável
  const validateNomeResponsavel = (nome, possuiResponsavel) => {
    if (!possuiResponsavel) return ""; // Se não possui responsável, não valida
    if (!nome) return "Nome do responsável é obrigatório";
    if (nome.length < 5) return "Nome do responsável deve ter pelo menos 5 caracteres";
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(nome)) return "Nome do responsável deve conter apenas letras e espaços";
    if (nome.trim().split(/\s+/).length < 2) return "Por favor, insira nome e sobrenome do responsável";
    return "";
  };

  const validateCPFResponsavel = (cpf, possuiResponsavel) => {
    if (!possuiResponsavel) return ""; // Se não possui responsável, não valida
    if (!cpf) return "CPF do responsável é obrigatório";
    
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    
    if (cleanCPF.length !== 11) return "CPF do responsável deve ter 11 dígitos";
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return "CPF do responsável inválido";
    
    // Validação dos dígitos verificadores
    let sum = 0;
    let remainder;
    
    // Primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cleanCPF.substring(i-1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) return "CPF do responsável inválido";
    
    // Segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cleanCPF.substring(i-1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) return "CPF do responsável inválido";
    
    return "";
  };

  const validateParentesco = (parentesco, possuiResponsavel) => {
    if (!possuiResponsavel) return ""; // Se não possui responsável, não valida
    if (!parentesco) return "Selecione o parentesco do responsável";
    
    const opcoesValidas = ["mae", "pai", "avo", "tia", "tio", "irma", "irmao", "outro"];
    if (!opcoesValidas.includes(parentesco)) return "Selecione uma opção válida de parentesco";
    
    return "";
  };

  //  Inicializa o estado local buscando dados de 'formData.paciente.*'
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
      condicao_saude: formData.paciente.condicao_saude || "",
      condicao_saude_outro: formData.paciente.condicao_saude_outro || "",
      possui_deficiencia: formData.paciente.possui_deficiencia || false,
      deficiencia: formData.paciente.deficiencia || "",
      observacoes: formData.paciente.observacoes || "",
    },
    responsavel: {
      nome_responsavel: formData.responsavel.nome_responsavel || "",
      cpf_responsavel: formData.responsavel.cpf_responsavel || "",
      telefone_responsavel: formData.responsavel.telefone_responsavel || "",
      parentesco: formData.responsavel.parentesco || "",
    },
  });

  // Função para atualizar os estados locais
  const handleChange = (e, defaultValue = null, scope = "paciente") => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox"
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
      const error = validateNome(value);
      setErrors(prev => ({
        ...prev,
        nome: error
      }));
    } else if (name === "email") {
      const error = validateEmail(value);
      setErrors(prev => ({
        ...prev,
        email: error
      }));
    // } else if (name === "cpf") {
    //   const error = validateCPF(value);
    //   setErrors(prev => ({
    //     ...prev,
    //     cpf: error
    //   }));
    } else if (name === "data_nascimento") {
      const error = validateDataNascimento(value);
      setErrors(prev => ({
        ...prev,
        data_nascimento: error
      }));
    } else if (name === "escolaridade") {
      const error = validateEscolaridade(value);
      setErrors(prev => ({
        ...prev,
        escolaridade: error
      }));
    } else if (name === "estado_civil") {
      const error = validateEstadoCivil(value);
      setErrors(prev => ({
        ...prev,
        estado_civil: error
      }));
    // } else if (name === "condicao_saude" || name === "condicao_saude_outro") {
    //   const error = validateCondicaoSaude(
    //     name === "condicao_saude" ? value : localData.paciente.condicao_saude,
    //     name === "condicao_saude_outro" ? value : localData.paciente.condicao_saude_outro
    //   );
    //   setErrors(prev => ({
    //     ...prev,
    //     condicao_saude: error
    //   }));
    // } else if (name === "possui_deficiencia" || name === "deficiencia") {
    //   const error = validateDeficiencia(
    //     name === "possui_deficiencia" ? value === "Sim" : localData.paciente.possui_deficiencia,
    //     name === "deficiencia" ? value : localData.paciente.deficiencia
    //   );
    //   setErrors(prev => ({
    //     ...prev,
    //     deficiencia: error
    //   }));
    } else if (name === "nome_responsavel") {
      const error = validateNomeResponsavel(value, localData.paciente.possui_responsavel);
      setErrors(prev => ({
        ...prev,
        nome_responsavel: error
      }));
    } else if (name === "cpf_responsavel") {
      const error = validateCPFResponsavel(value, localData.paciente.possui_responsavel);
      setErrors(prev => ({
        ...prev,
        cpf_responsavel: error
      }));
    } else if (name === "parentesco") {
      const error = validateParentesco(value, localData.paciente.possui_responsavel);
      setErrors(prev => ({
        ...prev,
        parentesco: error
      }));
    } else if (name === "possui_responsavel") {
      // Quando mudar possui_responsavel, validar todos os campos do responsável
      const nomeResponsavelError = validateNomeResponsavel(localData.responsavel.nome_responsavel, value === "Sim");
      const cpfResponsavelError = validateCPFResponsavel(localData.responsavel.cpf_responsavel, value === "Sim");
      const parentescoError = validateParentesco(localData.responsavel.parentesco, value === "Sim");
      
      setErrors(prev => ({
        ...prev,
        nome_responsavel: nomeResponsavelError,
        cpf_responsavel: cpfResponsavelError,
        parentesco: parentescoError
      }));
    }
  };

  // Função para salvar na mochila
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar todos os campos obrigatórios
    const nomeError = validateNome(localData.paciente.nome);
    const emailError = validateEmail(localData.paciente.email);
    // const cpfError = validateCPF(localData.paciente.cpf);
    const dataNascimentoError = validateDataNascimento(localData.paciente.data_nascimento);
    const escolaridadeError = validateEscolaridade(localData.paciente.escolaridade);
    const estadoCivilError = validateEstadoCivil(localData.paciente.estado_civil);
    // const condicaoSaudeError = validateCondicaoSaude(
    //   localData.paciente.condicao_saude,
    //   localData.paciente.condicao_saude_outro
    // );
    // const deficienciaError = validateDeficiencia(
    //   localData.paciente.possui_deficiencia,
    //   localData.paciente.deficiencia
    // );

    // Validações do responsável (apenas se possui_responsavel for true)
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

    setErrors(prev => ({
      ...prev,
      nome: nomeError,
      email: emailError,
      // cpf: cpfError,
      data_nascimento: dataNascimentoError,
      escolaridade: escolaridadeError,
      estado_civil: estadoCivilError,
      // condicao_saude: condicaoSaudeError,
      // deficiencia: deficienciaError,
      nome_responsavel: nomeResponsavelError,
      cpf_responsavel: cpfResponsavelError,
      parentesco: parentescoError
    }));

    // Se houver qualquer erro, não prossegue
    if (nomeError || emailError || dataNascimentoError || 
        escolaridadeError || estadoCivilError || 
        (localData.paciente.possui_responsavel && (nomeResponsavelError || cpfResponsavelError || parentescoError))) {
      return;
    }

    updateFormData(localData);
    console.log("Dados após atualização do contexto:", localData);
    // try {
    //   const response = axios.post("https://portaligrejaback.siaeserver.com/api/pacientes/create", localData)
    //   console.log("Resposta do servidor:", response.data);

    // } catch (error) {
    //   console.error("Erro ao enviar dados do paciente:", error);
    // }
    navigate("/second-page-paciente");
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center gap-8 py-10 px-4 sm:px-6">
        <div className="w-full max-w-[1344px] flex flex-col sm:flex-row justify-center items-center gap-4 text-center sm:text-left">
          <img src={Logo} alt="Logo da Instituição" className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px]" />
          <h2 className="font-bold text-[#060F2A] text-2xl sm:text-3xl lg:text-4xl">Sistema Integrado de Atendimento</h2>
        </div>

        {/* Card Principal do Formulário */}
        <div className="w-full max-w-[1344px] bg-white rounded-2xl shadow-[0_8px_16px_rgba(113,146,255,0.25)] p-6 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B]">Cadastro de Paciente/Responsável</h3>
            <h5 className="text-[#0A1B4B] font-normal text-[16px] mt-4">Atendimento social, jurídico e de saúde, rápido e integrado.</h5>
          </div>
          <div className="flex items-center justify-center mb-10">{/* ... Stepper ... */}</div>

          <form className="space-y-10" onSubmit={handleSubmit}>
            {/* Seção: Dados Pessoais */}
            <section>
              <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B] mb-6 text-center">Dados Pessoais</h3>
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
                <FormField 
                  label="CPF" 
                  id="cpf" 
                  placeholder="000.000.000-00" 
                  value={localData.paciente.cpf} 
                  onChange={(e) => handleChange(e, null, "paciente")}
                  error={errors.cpf}
                  helperText="Digite um CPF válido"
                />
                <FormField label="Telefone / Whatsapp" id="telefone" placeholder="(98) 9 1234-5678" value={localData.paciente.telefone} onChange={(e) => handleChange(e, null, "paciente")} />
                <div className="md:col-span-1">
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1">
                    <h4>Sexo</h4>
                  </label>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                    <label className="flex items-center">
                      <input type="radio" name="sexo" value="Masculino" checked={localData.paciente.sexo === "Masculino"} onChange={(e) => handleChange(e, null, "paciente")} className="mr-2 w-[24px] h-[24px]" /> Masculino
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="sexo" value="Feminino" checked={localData.paciente.sexo === "Feminino"} onChange={(e) => handleChange(e, null, "paciente")} className="mr-2 w-[24px] h-[24px]" /> Feminino
                    </label>
                  </div>
                </div>
                <div className="md:col-span-1">
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1 flex">
                    <h4>Escolaridade <span className="text-red-500">*</span></h4> 
                  </label>
                  <select 
                    name="escolaridade" 
                    value={localData.paciente.escolaridade} 
                    onChange={(e) => handleChange(e, null, "paciente")} 
                    className={`w-full mt-2 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.escolaridade ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecione</option>
                    <option value="Fundamental Incompleto">Fundamental Incompleto</option>
                    <option value="Fundamental Completo">Fundamental Completo</option>
                    <option value="Médio Incompleto">Médio Incompleto</option>
                    <option value="Médio Completo">Médio Completo</option>
                    <option value="Superior Incompleto">Superior Incompleto</option>
                    <option value="Superior Completo">Superior Completo</option>
                    <option value="Pós-graduação">Pós-graduação</option>
                  </select>
                  <div className="min-h-[1.25rem] mt-1">
                    {errors.escolaridade ? (
                      <p className="text-sm text-red-600">{errors.escolaridade}</p>
                    ) : (
                      <p className="text-[15px] text-[#0F276D] font-semibold">Selecione seu nível de escolaridade</p>
                    )}
                  </div>
                </div>

                {/* Campo: Estado Civil */}
                <div className="md:col-span-1">
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1 flex">
                    <h4>Estado Civil <span className="text-red-500">*</span> </h4> 
                  </label>
                  <select 
                    name="estado_civil" 
                    value={localData.paciente.estado_civil} 
                    onChange={(e) => handleChange(e, null, "paciente")} 
                    className={`w-full mt-2 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      errors.estado_civil ? 'border-red-500' : 'border-gray-300'
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
                      <p className="text-sm text-red-600">{errors.estado_civil}</p>
                    ) : (
                      <p className="text-[15px] text-[#0F276D] font-semibold">Selecione seu estado civil</p>
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
                <div>
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-2">
                    <h4>Possui Responsável?</h4>
                  </label>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="possui_responsavel" value="Sim" checked={localData.paciente.possui_responsavel === true} onChange={(e) => handleChange(e, "Sim", "paciente")} className="mr-2 w-[24px] h-[24px]" /> Sim
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="possui_responsavel" value="Não" checked={localData.paciente.possui_responsavel === false} onChange={(e) => handleChange(e, "Não", "paciente")} className="mr-2 w-[24px] h-[24px]" /> Não
                    </label>
                  </div>
                </div>
              </div>
            </section>
            {localData.paciente.possui_responsavel && (
              <section className="mt-8 p-6 bg-gray-100 rounded-xl border border-gray-300">
                <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B] mb-6 text-center">Dados do Responsável</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <FormField label="Nome completo do responsável" id="nome_responsavel" placeholder="Ex: Maria da Silva" value={localData.responsavel.nome_responsavel} onChange={(e) => handleChange(e, null, "responsavel")} error={errors.nome_responsavel} helperText="Digite o nome completo (nome e sobrenome)"/>

                  {/* CPF */}
                  <FormField label="CPF do responsável" id="cpf_responsavel" placeholder="000.000.000-00" value={localData.responsavel.cpf_responsavel} onChange={(e) => handleChange(e, null, "responsavel")} error={errors.cpf_responsavel} helperText="Digite um CPF válido"/>

                  {/* Telefone */}
                  <FormField label="Telefone do responsável" id="telefone_responsavel" placeholder="(00) 00000-0000" value={localData.responsavel.telefone_responsavel} onChange={(e) => handleChange(e, null, "responsavel")}/>

                  {/* Parentesco - agora como SELECT */}
                  <div className="md:col-span-1">
                    <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-1">
                      <h4>Parentesco</h4>
                    </label>
                    <select name="parentesco" value={localData.responsavel.parentesco} onChange={(e) => handleChange(e, null, "responsavel")} className="w-full  px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Selecione</option>
                      <option value="mae">Mãe</option>
                      <option value="pai">Pai</option>
                      <option value="avo">Avó</option>
                      <option value="avo">Avô</option>
                      <option value="tia">Tia</option>
                      <option value="tio">Tio</option>
                      <option value="irma">Irmã</option>
                      <option value="irmao">Irmão</option>
                      <option value="outro">Outro</option>
                    </select>
                    <div className="min-h-[1.25rem] mt-1">
                    {errors.estado_civil ? (
                      <p className="text-sm text-red-600">{errors.estado_civil}</p>
                    ) : (
                      <p className="text-[15px] text-[#0F276D] font-semibold">Selecione o tipo de parentesco</p>
                    )}
                  </div>
                  </div>
                </div>
              </section>
            )}

            {/* Seção: Informações de Saúde */}
            {/* <section>
              <h3 className="text-2xl md:text-[28px] font-bold text-[#0A1B4B] mb-6 text-center">Informações Básicas de Saúde</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-2 flex">
                    <h4>Você possui alguma condição de saúde importante? <span className="text-red-500">*</span></h4>
              
                  </label>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="condicao_saude" value="Diabetes" checked={localData.paciente.condicao_saude === "Diabetes"} onChange={(e) => handleChange(e, null, "paciente")} className="mr-2 w-[24px] h-[24px]" /> Diabetes
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="condicao_saude" value="Hipertensão" checked={localData.paciente.condicao_saude === "Hipertensão"} onChange={(e) => handleChange(e, null, "paciente")} className="mr-2 w-[24px] h-[24px]" /> Hipertensão
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="condicao_saude" value="Alergia" checked={localData.paciente.condicao_saude === "Alergia"} onChange={(e) => handleChange(e, null, "paciente")} className="mr-2 w-[24px] h-[24px]" /> Alergia
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="condicao_saude" value="Nenhuma" checked={localData.paciente.condicao_saude === "Nenhuma"} onChange={(e) => handleChange(e, null, "paciente")} className="mr-2 w-[24px] h-[24px]" /> Nenhuma
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="condicao_saude" value="Outro" checked={localData.paciente.condicao_saude === "Outro"} onChange={(e) => handleChange(e, null, "paciente")} className="mr-2 w-[24px] h-[24px]" /> Outro
                    </label>
                  </div>
                  {localData.paciente.condicao_saude === "Outro" && (
                    <input 
                      type="text" 
                      name="condicao_saude_outro" 
                      placeholder="Especifique sua condição de saúde" 
                      className={`w-full mt-2 px-4 py-2 border rounded-lg ${
                        errors.condicao_saude ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={localData.paciente.condicao_saude_outro} 
                      onChange={(e) => handleChange(e, null, "paciente")} 
                    />
                  )}
                  <div className="min-h-[1.25rem] mt-1">
                    {errors.condicao_saude ? (
                      <p className="text-sm text-red-600">{errors.condicao_saude}</p>
                    ) : (
                      <p className="text-[15px] text-[#0F276D] font-semibold">Selecione sua condição de saúde</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-lg md:text-[20px] font-bold text-[#0F276D] mb-2 flex">
                    <h4>Possui alguma deficiência? <span className="text-red-500">*</span></h4>
                    
                  </label>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="possui_deficiencia" 
                        value="Sim" 
                        checked={localData.paciente.possui_deficiencia === true} 
                        onChange={(e) => handleChange(e, "Sim", "paciente")} 
                        className="mr-2 w-[24px] h-[24px]" 
                      /> Sim
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="possui_deficiencia" 
                        value="Não" 
                        checked={localData.paciente.possui_deficiencia === false} 
                        onChange={(e) => handleChange(e, "Não", "paciente")} 
                        className="mr-2 w-[24px] h-[24px]" 
                      /> Não
                    </label>
                  </div>
                  {localData.paciente.possui_deficiencia && (
                    <input 
                      type="text" 
                      name="deficiencia" 
                      placeholder="Especifique qual é a deficiência" 
                      className={`w-full mt-2 px-4 py-2 border rounded-lg ${
                        errors.deficiencia ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={localData.paciente.deficiencia} 
                      onChange={(e) => handleChange(e, null, "paciente")} 
                    />
                  )}
                  <div className="min-h-[1.25rem] mt-1">
                    {errors.deficiencia ? (
                      <p className="text-sm text-red-600">{errors.deficiencia}</p>
                    ) : (
                      localData.paciente.possui_deficiencia && (
                        <p className="text-[15px] text-[#0F276D]">Descreva a deficiência de forma clara e objetiva</p>
                      )
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="observacoes" className="block text-sm font-semibold text-gray-700 mb-1">
                    OBSERVAÇÕES (Se desejar):
                  </label>
                  <textarea id="observacoes" name="observacoes" rows="4" placeholder="Por exemplo: Cadastro individual." className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg" value={localData.paciente.observacoes} onChange={(e) => handleChange(e, null, "paciente")}></textarea>
                </div>
              </div>
            </section> */}

            {/* Botões de Ação */}
            <div className="flex justify-center items-center pt-6 border-t">
              <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4 lg:gap-[24px]">
                <button 
                  type="submit" 
                  disabled={hasFormErrors()}
                  className={`w-full lg:w-[612px] h-[56px] flex justify-center items-center font-bold text-lg rounded-[5px] transition-all duration-300 ${
                    hasFormErrors()
                      ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                      : 'bg-white text-[#193FB0] border border-[#193FB0] shadow-[0_8px_16px_rgba(113,146,255,0.25)] hover:bg-[#193FB0] hover:text-white'
                  }`}
                >
                  {hasFormErrors() ? 'Preencha todos os campos obrigatórios' : 'Salvar Cadastro e prosseguir'}
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

            <h6 className="text-center font-bold text-[16px] text-[#0A1B4B]">Suas informações são confidenciais e protegidas.</h6>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
