const express = require('express');
const path    = require('path');
const app     = express();

app.use(express.static(path.join(__dirname, 'ui-app')));

app.get('/*', (_, res) =>
  res.sendFile(path.join(__dirname, 'ui-app/src/index.html'))
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

ui-app/src/index.html
