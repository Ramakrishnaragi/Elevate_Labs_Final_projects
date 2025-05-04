const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('👋 Hello from App Version 1');
});

app.listen(PORT, () => {
  console.log(`App v1 running on port ${PORT}`);
});

