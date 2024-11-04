import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import ScrollButton from '../components/ScrollButton';
import { Get } from '../hooks/Get';
import '../styles/MisProductos.css';
import { traerCookie } from '../hooks/Cookies';

const FILTROS_CATEGORIAS = ['Ropa', 'Piezas', 'Accesorios', 'Nutrición', 'Bicicletas'];

const MisProductos = () => {
  const [filtroCategoria, setFiltroCategoria] = useState('');  // Estado para la categoría seleccionada en el filtro
  const [productos, setProductos] = useState([]);  // Estado para los productos obtenidos de la API
  const [cargando, setCargando] = useState(true);  // Estado de carga para mostrar un mensaje mientras se obtienen los productos

  const compraExitosa = JSON.parse(traerCookie('compraExitosa') || '{}');  // Obtiene la compra exitosa de las cookies, si existe

  // Función para obtener productos de la API
  const obtenerProductos = async () => {
    try {
      const productosAPI = await Get('http://127.0.0.1:8000/api/v3/producto/productos/');
      setProductos(productosAPI || []);  // Guarda los productos en el estado
    } finally {
      setCargando(false);  // Desactiva el estado de carga después de obtener los productos
    }
  };

  // Hook que se ejecuta al montar el componente para obtener los productos
  useEffect(() => {
    obtenerProductos();
  }, []);

  // Filtra los productos que el usuario ha comprado exitosamente
  const productosFiltradosPorCompra = productos.filter(producto => {
    return compraExitosa.productos && compraExitosa.productos.includes(producto.id);
  });

  // Aplica el filtro de categoría a los productos comprados
  const productosFiltrados = productosFiltradosPorCompra.filter(producto => {
    return filtroCategoria ? producto.categoria === filtroCategoria : true;
  });

  return (
    <div>
      <Navbar />
      <div style={{ padding: 40 }}>
        <h1>Mis Productos</h1>

        {/* Sección de filtros */}
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

        {/* Muestra un mensaje de carga o los productos filtrados */}
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
