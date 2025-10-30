import axios from 'axios';

// Configurações globais
const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
