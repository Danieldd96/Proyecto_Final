import React, { useState } from 'react'
import { Box, Button, Flex, Grid, Heading, Text, TextField } from '@radix-ui/themes'
import { darDatos } from '../hooks/Post'
import ScrollButton from '../components/ScrollButton'

const Publicar = () => {
  const categorias = ["Bicicletas", "Ropa", "Nutrición", "Accesorios", "Partes"]
  const productsUrl = "http://localhost:3001/products?userID=";
  const [imagenPreview, setImagenPreview] = useState("")
  const [productData, setProductData] = useState({
    nombre: "",
    precio: "",
    description: "",
    fecha: "",
    img: "",
    category: "",
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

  const nuevoProducto = async (category) => {
    const productos = {
      ...productData,
      category,
      userID: localStorage.getItem("idUsuario"),
    }
    await darDatos(productos, productsUrl)
  }

  return (
    <div>
      <Box p="8">
        <Heading>Publicar Productos</Heading>

        {categorias.map((category) => (
          <Box key={category} maxWidth="400px" mt="5" p="4" border="1px solid #eaeaea">
            <Heading size="4">Publicar {category}</Heading>
            <form>
              <Grid columns={3} gap="2">
                <label>Nombre del producto</label>
                <TextField.Root>
                  <label name="gameName" value={productData.gameName} onChange={inputCambio} required />
                </TextField.Root>

                <label>Precio</label>
                <TextField.Root>
                  <label name="precio" value={productData.precio} onChange={inputCambio} type="number" required />
                </TextField.Root>

                <label>Descripción</label>
                <TextField.Root>
                  <label name="description" value={productData.description} onChange={inputCambio} required />
                </TextField.Root>

                <label>Fecha de Publicación</label>
                <TextField.Root>
                  <label name="fecha" value={productData.fecha} onChange={inputCambio} type="date" required />
                </TextField.Root>

                <label>Adjuntar Imagen</label>
                <input type="file" onChange={convertidorImg} required />
                {imagenPreview && <img src={imagenPreview} alt="Vista previa" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}

                <Button type="button" onClick={() => nuevoProducto(category)}>
                  Publicar en {category}
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
