// src/Components/Footer.jsx

import React from 'react';
import Logo from "../assets/Logo.png";
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

// --- Constantes de Estilo ---
const DARK_BLUE_HEX = "bg-[#253965]";

const Footer = () => {
    return (
        <footer className={`${DARK_BLUE_HEX} text-white py-8 px-6 md:px-12`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                {/* Coluna 1: Logo e Slogan */}
                <div className="flex flex-col items-center md:items-start space-y-2">
                    <img
                        src={Logo}
                        alt="Logo Footer"
                        className="w-12 h-12 object-contain drop-shadow-[0_0_0px_rgba(59,130,246,0.5)]"
                    />                    <p className="text-xs text-gray-300 mt-2 text-center md:text-left">
                        Comunidade das Nações São Luís — servindo com fé e amor.
                    </p>
                </div>

                {/* Coluna 2: Informações de Contato */}
                <div className="text-sm text-center md:text-left space-y-2">
                    <p className="font-bold">Endereço</p>
                    <p className="text-gray-300">Endereço físico da igreja.</p>
                    <p className="font-bold pt-2">Telefone</p>
                    <p className="text-gray-300">Número de contato.</p>
                    <p className="font-bold pt-2">E-mail</p>
                    <p className="text-gray-300">exemplo@email.com</p>
                </div>

                {/* Coluna 3: Redes Sociais */}
                <div className="text-center md:text-right">
                    <h4 className="font-semibold mb-3">Siga-nos</h4>
                    <div className="flex flex-col md:items-end items-center space-y-1 text-2xl">
                        <a href="https://www.instagram.com/cn.saoluis/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors duration-200 flex items-center space-x-2">
                            <FaInstagram /> <span className="text-base">cn.são Luis</span>
                        </a>
                        <a href="#" className="hover:text-green-400 transition-colors duration-200 flex items-center space-x-2">
                            <FaWhatsapp /> <span className="text-base">+55 98 9 1234-5678</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Direitos autorais */}
            <div className="mt-8 pt-4 border-t border-white/20 text-center text-xs text-gray-400">
                <p>© 2025 | Igreja Comunidade das Nações São Luís.</p>
                <p>Todos os direitos reservados. || Desenvolvido por CodeHub</p>
            </div>
        </footer>
    );
};

export default Footer;