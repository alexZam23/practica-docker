const express = require('express');
const router = express.Router();
const { pool } = require('../db');

router.get('/', async (req, res) => {
  try {
    const [[totales]] = await pool.query(
      'SELECT COUNT(*) AS total_productos, ROUND(AVG(precio),2) AS precio_promedio, SUM(stock) AS stock_total FROM productos'
    );
    const [[masEconomico]] = await pool.query(
      'SELECT nombre, precio FROM productos ORDER BY precio ASC LIMIT 1'
    );
    const [[masCostoso]] = await pool.query(
      'SELECT nombre, precio FROM productos ORDER BY precio DESC LIMIT 1'
    );
    const [top3Economicos] = await pool.query(
      'SELECT nombre, precio FROM productos ORDER BY precio ASC LIMIT 3'
    );
    const [top5MasVendidos] = await pool.query(
      'SELECT nombre, unidades_vendidas FROM productos ORDER BY unidades_vendidas DESC LIMIT 5'
    );

    res.json({
      total_productos: totales.total_productos,
      precio_promedio: totales.precio_promedio,
      stock_total: totales.stock_total,
      producto_mas_economico: masEconomico,
      producto_mas_costoso: masCostoso,
      top3_economicos: top3Economicos,
      top5_mas_vendidos: top5MasVendidos
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al calcular el dashboard' });
  }
});

module.exports = router;
