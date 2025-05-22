// server.js
const express = require('express');
const path    = require('path');
const app     = express();

const PORT = process.env.PORT || 8080;

// Ajusta aquí la ruta al directorio "browser"
const buildDir = path.resolve(__dirname, 'ui-app', 'dist', 'ui-app', 'browser');
console.log('Sirviendo archivos desde:', buildDir);

app.use(express.static(buildDir));

app.get('*', (_req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
