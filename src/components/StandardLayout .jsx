import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./Header"; 
import Footer from "./Footer"; 

const StandardLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#f0f8ff]"> 
            <Header /> 
            
            {/* O Outlet injeta o conteúdo das rotas filhas (CadastroVoluntario, CadastroSenha, ConfirmarCadastro) */}
            <main className="flex-grow">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default StandardLayout;