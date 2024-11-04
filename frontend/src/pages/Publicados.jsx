import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import { Get } from '../hooks/Get'
import { actualizardatos } from '../hooks/Put'
import '../styles/publicados.css'

const Publicados = () => {
    const [productos, setProductos] = useState([])
    const [filtro, setFiltro] = useState('')
    const [productoEditado, setProductoEditado] = useState(null)
    const [modalActivo, setModalActivo] = useState(false)

    const obtenerProductos = async () => {
        try {
            const response = await Get('http://127.0.0.1:8000/api/v3/producto/productos/')
            setProductos(response)
        } catch (error) {
            console.error('Error al obtener los productos:', error)
        }
    }

    useEffect(() => {
        obtenerProductos()
    }, [])

    const categorias = productos.reduce((acc, producto) => {
        const { categoria } = producto
        if (!acc[categoria]) acc[categoria] = []
        acc[categoria].push(producto)
        return acc
    }, {})

    const categoriasFiltradas = Object.keys(categorias).filter((categoria) => {
        return categorias[categoria].some((producto) =>
            producto.nombre.toLowerCase().includes(filtro.toLowerCase())
        )
    })

    const abrirModal = (producto) => {
        setProductoEditado(producto)
        setModalActivo(true)
    }

    const cerrarModal = () => {
        setProductoEditado(null)
        setModalActivo(false)
    }

    const editarProducto = (e) => {
        const { name, value } = e.target
        setProductoEditado((prev) => ({
            ...prev,
            [name]: value, // Actualiza el campo correspondiente en productoEditado
        }))
    }

    const handleGuardarProducto = async () => {
        try {
            console.log('Producto a actualizar:', productoEditado.id); // Verifica qué se está enviando
            await actualizardatos(`http://127.0.0.1:8000/api/v3/actualizar/${productoEditado.id}/`, productoEditado)
            setProductos((prev) =>
                prev.map((prod) => (prod.id === productoEditado.id ? productoEditado : prod))
            );
            cerrarModal();
        } catch (error) {
            console.error('Error al guardar los cambios del producto:', error);
        }
    };
    

    return (
        <div>
            <Navbar />
            <h1>Publicados</h1>
            <input
                type="text"
                placeholder="Buscar producto"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="buscar"
            />
            <div className="productos">
                {categoriasFiltradas.map((categoria) => (
                    <div key={categoria} className="categoria">
                        <h2>{categoria}</h2>
                        <div className="producto-grid">
                            {categorias[categoria]
                                .filter(producto => producto.nombre.toLowerCase().includes(filtro.toLowerCase()))
                                .map((producto) => (
                                    <div key={producto.id} className="producto">
                                        <img src={producto.imagen} alt="Producto" />
                                        <h2>{producto.nombre}</h2>
                                        <p>{producto.descripcion}</p>
                                        <p className="precio">Precio: ${producto.precio}</p>
                                        <button onClick={() => abrirModal(producto)}>Editar Producto</button>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            {modalActivo && (
                <div className="modal active">
                    <div className="modal-content">
                        <h2>Editar Producto</h2>
                        <input
                            type="text"
                            name="nombre"
                            value={productoEditado.nombre}
                            onChange={editarProducto}
                            placeholder="Nombre del producto"
                        />
                        <textarea
                            name="descripcion"
                            value={productoEditado.descripcion}
                            onChange={editarProducto}
                            placeholder="Descripción del producto"
                        />
                        <input
                            type="number"
                            name="precio"
                            value={productoEditado.precio}
                            onChange={editarProducto}
                            placeholder="Precio del producto"
                        />
                        <input 
                            type="text"
                            name="ubicacion"
                            value={productoEditado.ubicacion_producto}
                            onChange={editarProducto}
                            placeholder="Ubicación del producto"
                        />
                        <button onClick={handleGuardarProducto}>Guardar Cambios</button>
                        <button onClick={cerrarModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Publicados
