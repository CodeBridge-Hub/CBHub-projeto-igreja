import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ModuleCard from "../components/ModuleCard";

// import dos icones
import { 
  FaUserNurse,       
  FaUserDoctor,       
  FaBaby,               
  FaAppleWhole,         
  FaScaleBalanced,      
  FaTooth,              
  FaEye                 
} from "react-icons/fa6";

export default function SelecaoModulos() {
  const navigate = useNavigate();

  // lista de módulos
  const modulos = [
    { 
      id: 1, 
      titulo: "Enfermagem", 
      icon: FaUserNurse, 
      rota: "" 
    },
    { 
      id: 2, 
      titulo: "Clínico Geral", 
      icon: FaUserDoctor, 
      rota: "" 
    },
    { 
      id: 3, 
      titulo: "Pediatria", 
      icon: FaBaby, 
      rota: "" 
    },
    { 
      id: 4, 
      titulo: "Nutrição", 
      icon: FaAppleWhole, 
      rota: "" 
    },
    { 
      id: 5, 
      titulo: "Jurídico", 
      icon: FaScaleBalanced, 
      rota: "" 
    },
    { 
      id: 6, 
      titulo: "Odontologia", 
      icon: FaTooth, 
      rota: "" 
    },
    { 
      id: 7, 
      titulo: "Oftalmologia", 
      icon: FaEye, 
      rota: "" 
    },
  ];

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-[1344px]">
          
         
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-azul-titulo mb-2">
              Módulos de Atendimento
            </h2>
            <p className="text-azul-titulo text-lg opacity-80">
              Selecione a especialidade desejada para iniciar o atendimento.
            </p>
          </div>

          {/* cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {modulos.map((modulo) => (
              <ModuleCard
                key={modulo.id}
                title={modulo.titulo}
                icon={modulo.icon}
                onClick={() => {
                  console.log(`Navegando para: ${modulo.titulo}`);
                  // navigate(modulo.rota); descomentar quando ja tiver rotas certas pra cada modulo  //
                }}
              />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}