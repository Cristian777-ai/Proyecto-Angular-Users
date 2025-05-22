// server.js
const express = require('express');
const path    = require('path');
const app     = express();

// Puerto
const PORT = process.env.PORT || 8080;

// Construye la ruta absoluta desde /app (Heroku)
const buildDir = path.resolve(__dirname, 'ui-app', 'dist', 'ui-app');
console.log('Sirviendo archivos desde:', buildDir);

// Sirve estáticos
app.use(express.static(buildDir));

// SPA fallback
app.get('*', (_, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
