// server.js
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();
const PORT    = process.env.PORT || 8080;

// 1. Middlewares básicos
app.use(express.json());

// 2. Carga DB (asegúrate de que db.json está en la raíz y commiteado)
const dbPath = path.join(__dirname, 'ui-app/db.json');
let db = { users: [] };
try {
  db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
} catch (err) {
  console.error('No se pudo leer db.json:', err);
  process.exit(1);
}

// 3. Endpoints de API (antes de static y catch-all)
// 3.1 Login
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const u = db.users.find(x => x.username === username);
  if (!u || u.password !== password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  return res.json({ token: 'mock-token' });
});

// 3.2 Listar usuarios
app.get('/users', (_req, res) => {
  const safe = db.users.map(({ password, ...rest }) => rest);
  res.json(safe);
});

// 3.3 Detalle de usuario
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const u  = db.users.find(x => x.id === id);
  if (!u) return res.status(404).json({ message: 'Usuario no encontrado' });
  const { password, ...safe } = u;
  res.json(safe);
});

// 4. Define buildDir **antes** de usarlo
const buildDir = path.join(__dirname, 'ui-app', 'dist', 'ui-app', 'browser');
console.log('Sirviendo archivos desde:', buildDir);

// 5. Sirve la carpeta de Angular compilada
app.use(express.static(buildDir));

// 6. Fallback: cualquier otra ruta, devuelve index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

// 7. Arranca el server
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
