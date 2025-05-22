const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();
const PORT    = process.env.PORT || 8080;

app.use(express.json());

// 1) Rutas de API
app.post('/auth/login', /* tu código de login */);
app.get('/users', (_req, res) => {
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'ui-app/db.json')));
  const safe = db.users.map(({ password, ...u }) => u);
  res.json(safe);
});
app.get('/auth/login', (_req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

// Ahora montas estáticos y tu catch-all:
app.use(express.static(buildDir));
app.get('*', (_req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
