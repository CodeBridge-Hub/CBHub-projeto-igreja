import React from "react";
import { Link } from "react-router-dom"; 
// Ajuste o caminho do Logo para "../assets/"
import Logo from "../assets/Logo.png"; 

const Header = () => {
    return (
        <header className="px-6 md:px-12 bg-[#253965] text-white shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-20 md:h-24">

                {/* Logo à esquerda e Título da Aplicação */}
                <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                    />
                    <h1 className="hidden sm:block text-xl md:text-2xl font-bold">
                        Sistema Integrado de Atendimento
                    </h1>
                </Link>

                {/* Botões Login/Home para páginas internas */}
                <div className="flex space-x-3">
                    <Link 
                        to="/" 
                        className="bg-pink-200 text-[#253965] font-semibold px-4 py-2 rounded-md hover:bg-pink-300 transition"
                    >
                        Voltar para Home
                    </Link>
                    <button className="bg-white text-[#253965] font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition">
                        Login
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Header;