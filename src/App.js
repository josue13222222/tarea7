import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  // Nuevos productos
  const printers = [
    {
      id: 1,
      name: "Brother HL-L2350DW",
      description: "Impresora láser monocromo con conectividad WiFi.",
      price: 450,
      image: "/image/brother.jpg"
    },
    {
      id: 2,
      name: "Epson Expression Home XP-4100",
      description: "Compacta, inalámbrica y fácil de usar.",
      price: 599,
      image: "/image/epson-xp.jpg"
    },
    {
      id: 3,
      name: "Canon MAXIFY GX6020",
      description: "Ideal para oficinas pequeñas, imprime grandes volúmenes.",
      price: 1120,
      image: "/image/canon-maxify.jpg"
    },
    {
      id: 4,
      name: "Creality Ender 3 V2",
      description: "Impresora 3D económica y eficiente para principiantes.",
      price: 1200,
      image: "/image/creality.jpg"
    }
  ];

  // Cargar ventas
  useEffect(() => {
    axios.get('http://localhost:5000/ventas')
      .then(res => {
        setSalesData(res.data);
        const total = res.data.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalSales(total);
      })
      .catch(err => console.error("Error al cargar ventas:", err));
  }, []);

  const addToCart = (printer) => {
    setCart([...cart, printer]);
  };

  return (
    <div className="App">
      {/* Header */}
      <div className="header">
        <a href="/">
          <img src="/image/logot.jpg" alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
        </a>
        Catálogo de Impresoras 2025
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {printers.map((printer) => (
          <div className="card" key={printer.id}>
            <img src={printer.image} alt={printer.name} />
            <h3>{printer.name}</h3>
            <p>{printer.description}</p>
            <strong>S/ {printer.price}</strong>
            <button onClick={() => addToCart(printer)}>Añadir al carrito</button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="cart">
        <h2>🛍️ Carrito de Compras ({cart.length})</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - S/ {item.price}
              <button style={{ marginLeft: '10px' }}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sales Table Section */}
      <div className="sales">
        <h2>Últimas Ventas Registradas</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr key={index}>
                <td>{sale.name}</td>
                <td>S/ {sale.price}</td>
                <td>{sale.quantity}</td>
                <td>S/ {sale.price * sale.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total General de Ventas: S/ {totalSales}</h3>
      </div>
    </div>
  );
}

export default App;
