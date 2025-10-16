import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./Header"; 
import Footer from "./Footer"; 

// O MainLayout substitui a função de injetar Header/Footer nas páginas internas
const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#f0f8ff]"> 
            <Header /> 
            
            {/* O Outlet injeta o conteúdo das rotas filhas */}
            <main className="flex-grow">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default MainLayout;