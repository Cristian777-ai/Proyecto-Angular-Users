// server.js
const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 8080;

// 1) JSON bodies
app.use(express.json());

// 2) Lee db.json
const dbFile = path.join(__dirname, 'ui-app/db.json');
let db = { users: [] };
try {
  db = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
  console.log('✅ db.json cargado, usuarios:', db.users.length);
} catch (err) {
  console.error('❌ No pude leer db.json:', err);
  process.exit(1);
}

// 3) API Endpoints
app.post('/auth/login', (req, res) => {
  console.log('POST /auth/login', req.body);
  const { username, password } = req.body;
  const user = db.users.find(u => u.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  return res.json({ token: 'mock-token' });
});

app.get('/users', (_req, res) => {
  console.log('GET /users');
  const safe = db.users.map(({ password, ...u }) => u);
  res.json(safe);
});

app.get('/users/:id', (req, res) => {
  console.log(`GET /users/${req.params.id}`);
  const id = Number(req.params.id);
  const user = db.users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  const { password, ...safe } = user;
  res.json(safe);
});

// 4) Define buildDir (ajusta si tu outputPath es otro)
const buildDir = path.join(__dirname, 'ui-app', 'dist', 'ui-app', 'browser');
console.log('📂 buildDir:', buildDir);

// 5) Sirve estáticos
if (!fs.existsSync(buildDir)) {
  console.error('❌ El buildDir NO existe. Verifica tu ruta y que Heroku ejecutó el build.');
  process.exit(1);
}
app.use(express.static(buildDir));

// 6) SPA fallback: **usa app.use** para capturar TODO lo que no sea API ni estático
app.use('*', (_req, res) => {
  console.log('SPA fallback => index.html');
  res.sendFile(path.join(buildDir, 'index.html'));
});

// 7) Levanta el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
