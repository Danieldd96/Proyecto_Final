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
        <h1 className='title'>Publicar Producto</h1>
        <div className="form-container">
          {categorias.map((categoria) => (
            <Box key={categoria} className="crystal-box">
              <h1>{categoria}</h1>
              <form>
                <Grid columns={3} gap="2" mt="5">
                  <label>Nombre del producto</label>
                  <input className='item' name="nombre" value={productData.nombre} placeholder='Ingrese el Nombre del producto' onChange={inputCambio} required />

                  <label>Precio</label>
                  <input className='item' name="precio" value={productData.precio} placeholder='Ingrese el Precio del producto' onChange={inputCambio} type="number" required />

                  <label>Descripción</label>
                  <input className='item' name="descripcion" value={productData.descripcion} placeholder='Ingrese la Descripción del producto' onChange={inputCambio} required />

                  <label>Fecha de Publicación</label>
                  <input className='item' name="fecha" value={productData.fecha} placeholder='Ingrese la Fecha de Publicación del producto' onChange={inputCambio} type="date" required />

                  <label>Ubicación del producto</label>
                  <input className='item' name="ubicacion_producto" value={productData.ubicacion_producto} placeholder='Ingrese la Ubicación del producto' onChange={inputCambio} required />

                  <label>Tipo</label>
                  <input className='item' name="tipo" value={productData.tipo} placeholder='Ingrese el tipo del producto' onChange={inputCambio} required />

                  <label>Cantidad</label>
                  <input className='item' name="cantidad" value={productData.cantidad} placeholder='Ingrese la Cantidad del producto' onChange={inputCambio} type="number" required />

                  <label>Adjuntar Imagen</label>
                  <input className='item' type="file" onChange={convertidorImg} required />
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
