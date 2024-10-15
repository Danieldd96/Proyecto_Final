import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ScrollButton from '../components/ScrollButton';
import { Get } from '../hooks/Get';
import '../styles/MisProductos.css';
import { traerCookie } from '../hooks/Cookies';

const FILTROS_CATEGORIAS = ['Ropa', 'Piezas', 'Accesorios', 'Nutrición', 'Bicicletas'];

const MisProductos = () => {
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const compraExitosa = JSON.parse(traerCookie('compraExitosa') || '{}');

  const obtenerProductos = async () => {
    try {
      const productosAPI = await Get('http://127.0.0.1:8000/api/v3/producto/productos/');
      setProductos(productosAPI || []);
    } finally {
      setCargando(false); 
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const productosFiltradosPorCompra = productos.filter(producto => {
    return compraExitosa.productos && compraExitosa.productos.includes(producto.id);
  });

  const productosFiltrados = productosFiltradosPorCompra.filter(producto => {
    return filtroCategoria ? producto.categoria === filtroCategoria : true;
  });

  return (
    <div>
      <Navbar />
      <div style={{padding:40}}>
      <h1>Mis Productos</h1>

      <div className="filtros">
        <div className="filtro-categoria">
          <label>Categoría:</label>
          <select onChange={(e) => setFiltroCategoria(e.target.value)} value={filtroCategoria}>
            <option value="">Todas</option>
            {FILTROS_CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
      </div>

      {cargando ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="productos">
          {productosFiltrados.length ? (
            productosFiltrados.map((producto) => (
              <div className="producto-card" key={producto.id}>
                <img src={producto.imagen} alt={producto.nombre} />
                <h2>{producto.nombre}</h2>
                <p>Categoría: {producto.categoria}</p>
              </div>
            ))
          ) : (
            <p>No hay productos que coincidan con los filtros seleccionados o no has comprado productos aún.</p>
          )}
        </div>
      )}

      <ScrollButton />
      </div>
    </div>
  );
};

export default MisProductos;
