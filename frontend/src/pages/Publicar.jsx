import React, { useState } from 'react'
import { Box, Button, Grid } from '@radix-ui/themes'
import { darDatos } from '../hooks/Post'
import ScrollButton from '../components/ScrollButton'
import Navbar from '../components/navbar'
import '../styles/Publicar.css'
import { traerCookie } from '../hooks/Cookies'

const Publicar = () => {
  const categorias = ["Bicicletas", "Ropa", "Nutrición", "Accesorios", "Partes"]
  const productsUrl = "http://127.0.0.1:8000/api/v3/producto/productos/";
  const [imagenPreview, setImagenPreview] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const [productData, setProductData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    fecha: "",
    ubicacion_producto: "",
    cantidad: "",
    imagen: "",
    tipo: "",
  });

  const inputCambio = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    })
  }

  const convertidorImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImagenPreview(e.target.result)
        setProductData({
          ...productData,
          imagen: e.target.result,
        })
      }
      reader.readAsDataURL(file)
    }
  };

  const nuevoProducto = async () => {
    if (selectedCategory) {
      const nuevosProductos = {
        ...productData,
        categoria: selectedCategory,
        userID: traerCookie("idUsuario"),
      };
      await darDatos(nuevosProductos, productsUrl);
    }
  };

  return (
    <div>
      <Navbar />
      <Box p="8">
        <h1 className='title'>Publicar Producto</h1>
        <div className="form-container">

          <div className="select-category">
            <label>Selecciona la categoría para publicar:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="item"
              required
            >
              <option value="">-- Selecciona una categoría --</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>

          {/* Mostrar el formulario solo si se selecciona una categoría */}
          {selectedCategory && (
            <Box className="crystal-box">
              <h2>{selectedCategory}</h2>
              <form>
                <Grid columns={3} gap="2" mt="5">
                  <label>Nombre del producto</label>
                  <input
                    className='item'
                    name="nombre"
                    value={productData.nombre}
                    placeholder='Ingrese el Nombre del producto'
                    onChange={inputCambio}
                    required
                  />

                  <label>Precio</label>
                  <input
                    className='item'
                    name="precio"
                    value={productData.precio}
                    placeholder='Ingrese el Precio del producto'
                    onChange={inputCambio}
                    type="number"
                    required
                  />

                  <label>Descripción</label>
                  <input
                    className='item'
                    name="descripcion"
                    value={productData.descripcion}
                    placeholder='Ingrese la Descripción del producto'
                    onChange={inputCambio}
                    required
                  />

                  <label>Fecha de Publicación</label>
                  <input
                    className='item'
                    name="fecha"
                    value={productData.fecha}
                    placeholder='Ingrese la Fecha de Publicación del producto'
                    onChange={inputCambio}
                    type="date"
                    required
                  />

                  <label>Ubicación del producto</label>
                  <input
                    className='item'
                    name="ubicacion_producto"
                    value={productData.ubicacion_producto}
                    placeholder='Ingrese la Ubicación del producto'
                    onChange={inputCambio}
                    required
                  />

                  <label>Tipo</label>
                  <input
                    className='item'
                    name="tipo"
                    value={productData.tipo}
                    placeholder='Ingrese el tipo del producto'
                    onChange={inputCambio}
                    required
                  />

                  <label>Cantidad</label>
                  <input
                    className='item'
                    name="cantidad"
                    value={productData.cantidad}
                    placeholder='Ingrese la Cantidad del producto'
                    onChange={inputCambio}
                    type="number"
                    required
                  />

                  <label>Adjuntar Imagen</label>
                  <input
                    className='item'
                    type="file"
                    onChange={convertidorImg}
                    required
                  />
                  {imagenPreview && (
                    <img src={imagenPreview} alt="Vista previa" className="preview-img" />
                  )}

                  <Button type="button" onClick={nuevoProducto}>
                    Publicar en {selectedCategory}
                  </Button>
                </Grid>
              </form>
            </Box>
          )}
        </div>
      </Box>
      <ScrollButton />
    </div>
  )
}

export default Publicar
