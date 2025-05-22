// server.js
const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 8080;

// 1) JSON bodies
app.use(express.json());

// 2) Carga tu "base de datos" desde db.json en la raíz del proyecto
const dbFile = path.join(__dirname, 'ui-app/db.json');
let db = { users: [] };
try {
  db = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
} catch (err) {
  console.error('⚠️  No pude leer db.json:', err);
  process.exit(1);
}

// 3) API Endpoints (antes del static)
// 3.1 POST /auth/login
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(u => u.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  // mock token
  return res.json({ token: 'mock-token' });
});

// 3.2 GET /users
app.get('/users', (_req, res) => {
  // elimina contraseña antes de enviar
  const safe = db.users.map(({ password, ...u }) => u);
  res.json(safe);
});

// 3.3 GET /users/:id
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = db.users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  const { password, ...safe } = user;
  res.json(safe);
});

// 4) Define buildDir apuntando al output correcto de Angular
//    Ajusta si tu angular.json usa otro outputPath
const buildDir = path.join(__dirname, 'ui-app', 'dist', 'ui-app');
console.log(`📂 Sirviendo Angular desde: ${buildDir}`);

// 5) Static middleware
app.use(express.static(buildDir));

// 6) Fallback para SPA: cualquier otra ruta, devuelve index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

// 7) Levanta el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
