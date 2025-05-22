// server.js
const express = require('express');
const path    = require('path');
const app     = express();

const PORT = process.env.PORT || 8080;

// Aquí la ruta exacta: ui-app/dist/ui-app
const buildDir = path.join(__dirname, 'ui-app', 'dist', 'ui-app');

console.log('Sirviendo archivos desde:', buildDir);

// Sirve los estáticos generados por Angular
app.use(express.static(buildDir));

// Todas las rutas vuelven a index.html para la SPA
app.get('/*', (_req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

// Arranca el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
