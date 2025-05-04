const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tienda-danny'
});

app.get('/ventas', (req, res) => {
  const query = `
    SELECT p.nombre AS producto, SUM(v.cantidad) * p.precio AS total
    FROM ventas v
    JOIN productos p ON v.producto_id = p.id
    GROUP BY p.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
