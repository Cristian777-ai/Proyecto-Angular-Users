const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();
const PORT    = process.env.PORT || 8080;

// 1) Carga db.json al iniciar
//    Ajusta la ruta si db.json está en otro nivel
const DB_PATH = path.join(__dirname, 'ui-app/db.json');
let db;
try {
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  db = JSON.parse(raw);
} catch (err) {
  console.error('No pudo leerse db.json:', err);
  process.exit(1);
}

// 2) Middlewares
app.use(express.json()); // para parsear JSON en bodies

// 3) Rutas de API

// 3.1 Autenticación (mocked)
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  // Supongamos que en db.json tienes un array "users" con {username,password, ...}
  const user = (db.users || []).find(u => u.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  // No uses passwords en claro en producción; aquí es solo demo
  return res.json({ token: 'mock-jwt-token', user: { id: user.id, name: user.name, email: user.email } });
});

// 3.2 Listar usuarios
app.get('/users', (_req, res) => {
  // Opcionalmente filtrar campos sensibles (p.ej. no devolver password)
  const safeUsers = (db.users || []).map(({ password, ...rest }) => rest);
  res.json(safeUsers);
});

// 3.3 Detalle de usuario
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = (db.users || []).find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  const { password, ...safe } = user;
  res.json(safe);
});

// 4) Servir Angular (build)
const buildDir = path.resolve(__dirname, 'ui-app', 'dist', 'ui-app', 'browser');
app.use(express.static(buildDir));
app.get('*', (_req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

// 5) Arrancar
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
  console.log(`API endpoints: POST /auth/login, GET /users, GET /users/:id`);
});
