import React, { useState } from 'react'
import { Box, Button, Flex, Grid, Heading, Text, TextField } from '@radix-ui/themes'
import { darDatos } from '../hooks/Post'
import ScrollButton from '../components/ScrollButton'

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
    img: "",
    categoria: "",
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
          img: e.target.result,
        })
      }
      reader.readAsDataURL(file)
    }
  };

  const nuevoProducto = async (categoria) => {
    console.log(productData)
    const nuevosProductos = {
      ...productData,
      categoria,
      userID: localStorage.getItem("idUsuario"),
    }
    await darDatos(nuevosProductos,productsUrl)
  }

  return (
    <div>
      <Box p="8">
        <Heading>Publicar Productos</Heading>

        {categorias.map((categoria) => (
          <Box key={categoria} maxWidth="400px" mt="5" p="4" border="1px solid #eaeaea">
            <Heading size="4">Publicar {categoria}</Heading>
            <form>
              <Grid columns={3} gap="2">
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
                {imagenPreview && <img src={imagenPreview} alt="Vista previa" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}

                <Button type="button" onClick={() => nuevoProducto(categoria)}>
                  Publicar en {categoria}
                </Button>
              </Grid>
            </form>
          </Box>
        ))}
      </Box>
      <ScrollButton />
    </div>
  )
}

export default Publicar
