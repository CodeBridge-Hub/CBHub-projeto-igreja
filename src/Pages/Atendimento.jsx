import React, { useState, useEffect } from "react";
import axios from "../services/axios.js";

const SenhasTriagem = () => {
  const [senhas, setSenhas] = useState([]);
  const [senhaChamada, setSenhaChamada] = useState(null);

  // Atualiza automaticamente a senha chamada
  useEffect(() => {
    const fetchAtendimentos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/atendimentos/waiting");
        setSenhas(response.data);
      } catch (error) {
        console.error("Erro ao buscar senhas:", error);
      }
    };
    const senhaChamada = senhas.find((s) => s.status === "chamada");
    setSenhaChamada(senhaChamada || null);

    fetchAtendimentos();
  }, []);

  // Simula atualização automática (ex: quando status muda)
  // Em produção, você poderia substituir isso por um setInterval com requisição axios
  const chamarProxima = () => {
    const proxima = senhas.find((s) => s.status === "aguardando");
    if (!proxima) return;

    setSenhas((prev) => prev.map((s) => (s.id === proxima.id ? { ...s, status: "chamada" } : { ...s, status: "atendida" })));
  };

  return (
    <div style={styles.container}>
      {/* Sidebar com todas as senhas */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Painel de Senhas</h2>
        <h6 style={styles.total}>Total: {senhas.length} {senhas.length > 1 ? 'senhas' : 'senha'} </h6>
        <ul style={styles.lista}>
          {senhas.map((s) => (
            <li
              key={s.id}
              style={{
                ...styles.item,
              }}
            >
              <p style={styles.cod}>{s.cod}</p>
              <span style={styles.status}>{s.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Área principal: senha chamada */}
      <div style={styles.main}>
        <h1>Sistema de Triagem</h1>
        <h1 style={styles.title}>Senha Chamada</h1>

          {senhaChamada ? (
            <div>
              <p>{senhaChamada.cod}</p>
            </div>
          ) : (
            <p>Nenhuma senha</p>
          )}

        <button onClick={chamarProxima} style={styles.botao}>
          Chamar Próxima
        </button>
      </div>
    </div>
  );
};

// 🎨 Estilos inline simples (pode migrar pra CSS Module ou Tailwind)
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: " ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  sidebar: {
    width: "25%",
    backgroundColor: "#fafafa",
    borderRight: "1px solid #ddd",
    padding: "20px",
    overflowY: "auto",
  },
  sidebarTitle: {
    fontSize: "1.5rem",
    paddingBottom: "10px",
  },
  total: {
    fontSize: "0.9rem",
    color: "#777",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "2px solid #ddd",
  },
  lista: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 12px",
    borderRadius: "12px",
    border: "1px solid #1d127cff",
    backgroundColor: "rgba(29, 18, 124, 0.05)",
    marginBottom: "8px",
    cursor: "default",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
  },
  cod: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#4763e2ff",
  },
  status: {
    borderRadius: "12px",
    border: "1px solid #f0ac1bff",
    padding: "4px 12px",
    color: "#f0ac1bff",
    fontSize: "0.8rem",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffde7",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  senhaAtual: {
    fontSize: "6rem",
    fontWeight: "bold",
    color: "#f57c00",
    marginBottom: "40px",
  },
  botao: {
    padding: "12px 24px",
    fontSize: "1rem",
    backgroundColor: "#f57c00",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default SenhasTriagem;
