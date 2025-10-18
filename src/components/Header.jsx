import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from "../assets/Logo.png";
import IconArrowLeft from "../assets/arrow-narrow-left.svg";

export default function Header() {
  // Adiciona o estado para controlar o menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    
    <header className="w-full bg-[#0A1B4B] h-[80px] flex justify-center items-center px-4 relative">
      <div className="w-full max-w-[1440px] flex justify-between items-center text-white">
        
    
        <div className="flex-shrink-0 z-20"> 
          <img src={Logo} className="w-[50px] h-[50px] md:w-[60px] md:h-[60px]" alt="Logo" />
        </div>

        
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-x-8 text-md font-medium">
            <li><a href="#" className="hover:text-gray-300 transition-colors">Sobre</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Nossa missão</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Nosso impacto</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Ação Social</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Contato</a></li>
          </ul>
        </nav>

        {/* Lado Direito: Botão Voltar */}

        <Link 
          to="/" 
          className="hidden md:flex items-center gap-2 bg-[#0F276D] px-3 py-2 rounded-xl cursor-pointer hover:bg-opacity-80 transition-colors"
        >
          <img src={IconArrowLeft} className="w-5 h-5" alt="Ícone de Voltar" />
          <span>Voltar</span>
        </Link>

        {/* Botão hamburguer para tela pequenas */}

        <div className="md:hidden z-20">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              // Ícone "X" (fechar)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Ícone "hamburguer" (abrir)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      <div className={`absolute top-0 left-0 w-full bg-[#0A1B4B] pt-[80px] transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
        <nav>
          <ul className="flex flex-col items-center gap-y-6 py-8 text-lg font-medium">
            <li><a href="#" className="hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Sobre</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Nossa missão</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Nosso impacto</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Ação Social</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Contato</a></li>
          </ul>
        
           <div className="flex justify-center pb-8">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 bg-[#0F276D] px-4 py-3 rounded-xl cursor-pointer hover:bg-opacity-80 transition-colors"
            >
              <img src={IconArrowLeft} className="w-5 h-5" alt="Ícone de Voltar" />
              <span>Voltar</span>
            </Link>
           </div>
        </nav>
      </div>
    </header>
  );
}