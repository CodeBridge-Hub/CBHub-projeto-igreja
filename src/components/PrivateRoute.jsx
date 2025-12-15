import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles = ['ADMIN'] }) => {
  // Verifica se existe um usuário logado e se tem permissão adequada
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const isAuthorized = usuario && allowedRoles.includes(usuario.role);

  if (!isAuthorized) {
    // Redireciona para o login se não estiver autorizado
    return <Navigate to="/login-igreja" replace />;
  }

  return children;
};

// Componente específico para rotas que aceitam USER e ADMIN
export const UserRoute = ({ children }) => {
  return <PrivateRoute allowedRoles={['ADMIN', 'USER']}>{children}</PrivateRoute>;
};

export default PrivateRoute;