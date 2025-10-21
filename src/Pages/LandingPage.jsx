import React from "react";
import { Link } from "react-router-dom"; 
// Importando o Footer da pasta Components (C maiúsculo)
import Footer from "../Components/Footer"; 

// Importando a Logo
import Logo from "../assets/Logo.png"; 

// Importando as imagens (Ajuste o caminho se seu arquivo .jsx estiver em outro local)
import ImgFundo1 from "../assets/Fundo1.png";
import ImgMissao from "../assets/fundo_missao.png";
import ImgImpacto from "../assets/fundo_impacto.png";
import ImgCard from "../assets/card_conferencia.png";
import ImgAcerto from "../assets/fundo_acerto.png";

// Array com todas as imagens para o loop de seções
const sections = [
    ImgFundo1,
    ImgMissao,
    ImgImpacto,
    ImgCard,
    ImgAcerto,
];

const LandingPage = () => {
    // Variável para destacar o link ativo
    const activeLink = "Sobre"; 

    return (
        <div className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden"> 

            {/* HEADER EMBUTIDO: Design original da Landing Page */}
            <header className="px-6 md:px-12 bg-[#253965] text-white shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between h-20 md:h-24">

                    {/* Logo à esquerda */}
                    <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                        />
                    </Link>

                    {/* Navegação centralizada */}
                    <nav className="flex space-x-4 text-base sm:text-lg md:text-xl font-medium mx-auto px-4 overflow-x-auto whitespace-nowrap">
                        {["Sobre", "Nossa missão", "Nosso Impacto", "Ação social", "Contato"].map((link) => (
                            <a
                                key={link}
                                href="#"
                                className={`hover:text-pink-300 transition duration-150 py-2 flex-shrink-0 
                                  ${activeLink === link ? "border-b-2 border-pink-300" : ""}`}
                            >
                                {link}
                            </a>
                        ))}
                    </nav>

                    {/* Botões Cadastro e Login */}
                    <div className="flex space-x-3">
                        <Link 
                            to="/cadastro" 
                            className="bg-pink-200 text-[#253965] font-semibold px-4 py-2 rounded-md hover:bg-pink-300 transition"
                        >
                            Cadastre-se
                        </Link>
                        
                        <Link to="/login-igreja" className="bg-white text-[#253965] font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition">
                            Login
                        </Link>
                    </div>

                </div>
            </header>

            {/* SEÇÕES DE FUNDO (Imagens estáticas) */}
            {sections.map((img, index) => (
                <section
                    key={index}
                    className="w-full h-[80vh] sm:h-[85vh] md:h-[90vh] bg-center bg-cover bg-no-repeat flex-shrink-0"
                    style={{ backgroundImage: `url(${img})` }}
                >
                </section>
            ))}
        
            {/* FOOTER: É chamado no final da LandingPage */}
            <Footer /> 
        </div>
    );
};

export default LandingPage;