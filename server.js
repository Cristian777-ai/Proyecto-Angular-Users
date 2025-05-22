// server.js (raíz)
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();
const PORT    = process.env.PORT || 8080;

app.use(express.json());

const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'ui-app/db.json'), 'utf8'));

// Auth
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const u = db.users.find(x => x.username === username);
  if (!u || u.password !== password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  res.json({ token: 'mock-token' });
});

// Users
app.get('/users', (_q, r) =>
  r.json(db.users.map(({ password, ...u }) => u))
);
app.get('/users/:id', (q, r) => {
  const u = db.users.find(x => x.id === +q.params.id);
  if (!u) return r.status(404).json({ message: 'No encontrado' });
  const { password, ...safe } = u;
  r.json(safe);
});

// SPA
const buildDir = path.resolve(__dirname, 'ui-app', 'dist', 'ui-app', 'browser');
app.use(express.static(buildDir));
app.get('*', (_q, r) => r.sendFile(path.join(buildDir, 'index.html')));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
