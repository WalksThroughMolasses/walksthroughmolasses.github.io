const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});
