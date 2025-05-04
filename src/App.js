import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  {
      id: 1,
      name: "Impresora 3D de resina",
      description: "Alta precisión para impresiones detalladas con resina UV.",
      price: 3500,
      image: "/image/imagen1.png"
    },
    {
      id: 2,
      name: "Impresora 3D profesional",
      description: "Modelo de alta gama para impresión 3D en gran escala.",
      price: 4800,
      image: "/image/imagen2.png"
    },
    {
      id: 3,
      name: "Resina UV gris",
      description: "Resina fotosensible para impresoras 3D de resina.",
      price: 180,
      image: "/image/imagen3.png"
    },
    {
      id: 4,
      name: "Filamento PLA verde",
      description: "Carrete de filamento PLA de alta calidad para impresoras FDM.",
      price: 140,
      image: "/image/imagen4.png"
    },
    {
      id: 5,
      name: "Mini dron con control",
      description: "Dron compacto con cámara y mando a distancia.",
      price: 620,
      image: "/image/imagen5.png"
    },
    {
      id: 6,
      name: "Dron con cámara FPV",
      description: "Dron con sistema FPV y control profesional.",
      price: 980,
      image: "/image/imagen6.png"
    },
    {
      id: 7,
      name: "Grabadora láser CNC",
      description: "Máquina láser para grabado y corte de materiales.",
      price: 2100,
      image: "/image/imagen7.png"
    },
    {
      id: 8,
      name: "Auriculares inalámbricos",
      description: "Audífonos compactos con estuche de carga.",
      price: 250,
      image: "/image/imagen8.png"
    },
    {
      id: 9,
      name: "Gafas de realidad virtual",
      description: "Compatible con PC y juegos de VR.",
      price: 1100,
      image: "/image/imagen9.png"
    },
    {
      id: 10,
      name: "Filamento flexible azul",
      description: "Ideal para impresiones elásticas y resistentes.",
      price: 160,
      image: "/image/imagen10.png"
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
