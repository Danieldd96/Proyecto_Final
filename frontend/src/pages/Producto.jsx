import React, { useState, useEffect } from 'react';
import Casillas from '../components/Casillas';
import Navbar from '../components/navbar';
import '../styles/Producto.css';
import { Get } from '../hooks/Get';
import { darDatos } from '../hooks/Post';
import { traerCookie } from '../hooks/Cookies';
import ReactStars from 'react-stars';

const Producto = () => {
    const id = traerCookie('IdInfoProducto');
    const [cantidad, setCantidad] = useState(1);
    const [precioBase, setPrecioBase] = useState(0);
    const [precioTotal, setPrecioTotal] = useState(precioBase);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");
    const [rating, setRating] = useState(0); 
    const [comentarios, setComentarios] = useState([]);
    const [comentarioTexto, setComentarioTexto] = useState("");
    const [comentarioRating, setComentarioRating] = useState(0);
    const usuario = traerCookie('email')
    const usuarioID = traerCookie('idUsuario')
    const [listaRespuestas, setListaRespuestas] = useState([]);

    const apiUrlAgregarComentario = "http://127.0.0.1:8000/api/v5/agregar/comentario/";
    const apiUrl = `http://127.0.0.1:8000/api/v3/producto/productos/${id}`;

    const Obtener = async () => {
        try {
            const data = await Get(apiUrl);
            setNombre(data.nombre);
            setDescripcion(data.descripcion);
            setPrecioBase(data.precio);
            setImagen(data.imagen);

            const comentariosData = await Get(apiUrlAgregarComentario);
            const comentariosFiltrados = comentariosData.filter(comentario => comentario.producto_comentario === parseInt(id));
            setListaRespuestas(comentariosFiltrados);
        } catch (error) {
            console.error("Error al obtener los datos del producto o los comentarios:", error);
        }
    };

    useEffect(() => {
        Obtener();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setPrecioTotal(precioBase * cantidad);
    }, [cantidad, precioBase]);

    const incrementarCantidad = () => {
        setCantidad(prevCantidad => prevCantidad + 1);
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(prevCantidad => prevCantidad - 1);
        }
    };

    const CrearComentario = async () => {
        if (comentarioTexto && comentarioRating) {
            const nuevoComentario = {
                texto_comentario: comentarioTexto,
                valoracion: parseInt(comentarioRating),
                usuario_comentario: usuarioID,
                producto_comentario: id
            };
            await darDatos(nuevoComentario, apiUrlAgregarComentario);
            setComentarioTexto(""); 
            setComentarioRating(0);
            Obtener();
        }
    };

    return (
        <div>
            <Navbar />
            <div className="product-container">
                <div className="product-header">
                    <h1>{nombre}</h1>
                    <div className="product-details">
                        <div className="more-info">
                            <h2>MÁS INFORMACIÓN</h2>
                            <p>{descripcion}</p>
                        </div>
                        <img src={imagen} alt="Vista previa" className="product-image" />

                        <div className="quantity-controls" style={{justifyContent:"space-between",margin:"10px"}}>
                            <p className="product-price">₡{precioTotal.toFixed(2)}</p>
                            <button onClick={disminuirCantidad}>-</button>
                            <span>{cantidad}</span>
                            <button onClick={incrementarCantidad}>+</button><br />
                            <button className="add-to-cart">Añadir al carrito</button>
                        </div>

                        <div className="rating-container">
                            <h2>Calificación</h2>
                            <ReactStars
                                count={5}
                                onChange={setRating}
                                size={50}
                                activeColor="#ffd700"
                                value={rating}
                            />
                            <p className="rating-display">
                                {rating === 0 ? "Califica este producto" : `Calificación: ${rating} estrella${rating > 1 ? 's' : ''}`}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="comments-section">
                    <h2>Comentarios</h2>
                    <div className="comment-form">
                        <textarea
                            value={comentarioTexto}
                            onChange={(e) => setComentarioTexto(e.target.value)}
                            placeholder="Escribe tu comentario..."
                            rows="4"
                            className="comment-textarea"
                        />
                        <ReactStars
                            count={5}
                            onChange={setComentarioRating}
                            size={30}
                            activeColor="#ffd700"
                            value={comentarioRating}
                        />
                        <button className="submit-comment" onClick={CrearComentario}>Publicar comentario</button>
                    </div>

                    <div className="comments-list">
                        {listaRespuestas.map((comentario, index) => (
                            <div key={index} className="comment-item">
                                <div style={{backgroundColor: "#0033", color: "white", height: "100%", width: "100%", padding: "10px", borderRadius: "20px", border: "2px solid #555"}}>
                                    <ReactStars
                                        count={5}
                                        value={comentario.valoracion}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <span>{comentario.usuario}</span>
                                    <span>{comentario.fecha_comentario}</span>
                                    <p style={{marginLeft: "10px", borderLeft: "2px solid #555", paddingLeft: "10px"}}>{comentario.texto_comentario}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="related-products-container">
                    <div className="related-products-header">Productos Relacionados</div>
                    <div className="related-products-grid">
                        <Casillas producto={{nombre: "Producto 1", precio: 100, imagen: "https://i.imgur.com/9o9r5kG.jpg"}} />
                        <Casillas producto={{nombre: "Producto 2", precio: 200, imagen: "https://i.imgur.com/9o9r5kG.jpg"}} />
                        <Casillas producto={{nombre: "Producto 3", precio: 300, imagen: "https://i.imgur.com/9o9r5kG.jpg"}} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Producto;
