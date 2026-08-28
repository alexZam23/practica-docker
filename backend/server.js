const express = require('express');
const cors = require('cors');
const { waitForDb } = require('./db');
const productsRouter = require('./routes/products');
const dashboardRouter = require('./routes/dashboard');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/products', productsRouter);
app.use('/api/dashboard', dashboardRouter);

const PORT = process.env.PORT || 3000;

waitForDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Backend escuchando en el puerto ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
