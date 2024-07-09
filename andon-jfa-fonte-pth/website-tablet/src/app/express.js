const express = require('express');
const path = require('path');
const app = express();

// Caminho para os arquivos estáticos do Angular
const angularPath = 'C:\\andon-jfa-fonte-pth\\website-tablet\\dist\\website-tablet';

// Servir arquivos estáticos do Angular
app.use(express.static(angularPath));

// Rota para servir o arquivo index.html do Angular para todas as rotas
app.get('*', (req, res) => {
    res.sendFile(path.join(angularPath, 'index.html'));
});

// Iniciar o servidor na porta 4000
app.listen(4000, () => {
    console.log('Servidor Express rodando na porta 4000!');
});
