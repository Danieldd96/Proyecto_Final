import React, { useState } from 'react'
import { Box, Button, Grid, Heading } from '@radix-ui/themes'
import { darDatos } from '../hooks/Post'
import ScrollButton from '../components/ScrollButton'
import Navbar from '../components/Navbar'
import '../styles/Publicar.css'

const Publicar = () => {
  const categorias = ["Bicicletas", "Ropa", "Nutrición", "Accesorios", "Partes"]
  const productsUrl = "http://127.0.0.1:8000/api/v3/producto/productos/";
  const [imagenPreview, setImagenPreview] = useState("")
  const [productData, setProductData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    fecha: "",
    ubicacion_producto: "",
    cantidad: "",
    imagen: "",
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

  const nuevoProducto = async (categoria) => {
    console.log(productData);
    const nuevosProductos = {
      ...productData,
      categoria,
      userID: localStorage.getItem("idUsuario"),
    }
    await darDatos(nuevosProductos,productsUrl)
  }

  return (
    <div>
      <Navbar />
      <Box p="8">
        <h1>Productos</h1>
        <div className="form-container">
          {categorias.map((categoria) => (
            <Box key={categoria} className="crystal-box">
              <h1>{categoria}</h1>
              <form>
                <Grid columns={3} gap="2" mt="5">
                  <label>Nombre del producto</label>
                  <input name="nombre" value={productData.nombre} onChange={inputCambio} required />

                  <label>Precio</label>
                  <input name="precio" value={productData.precio} onChange={inputCambio} type="number" required />

                  <label>Descripción</label>
                  <input name="descripcion" value={productData.descripcion} onChange={inputCambio} required />

                  <label>Fecha de Publicación</label>
                  <input name="fecha" value={productData.fecha} onChange={inputCambio} type="date" required />

                  <label>Ubicación del producto</label>
                  <input name="ubicacion_producto" value={productData.ubicacion_producto} onChange={inputCambio} required />

                  <label>Cantidad</label>
                  <input name="cantidad" value={productData.cantidad} onChange={inputCambio} type="number" required />

                  <label>Adjuntar Imagen</label>
                  <input type="file" onChange={convertidorImg} required />
                  {imagenPreview && <img src={imagenPreview} alt="Vista previa" className="preview-img" />}

                  <Button type="button" onClick={() => nuevoProducto(categoria)}>
                    Publicar en {categoria}
                  </Button>
                </Grid>
              </form>
            </Box>
          ))}
        </div>
      </Box>
      <ScrollButton />
    </div>
  )
}

export default Publicar
