import React, { useState, useEffect } from 'react';
import Casillas from '../components/Casillas';
import Navbar from '../components/navbar';
import '../styles/Producto.css';
import { Get } from '../hooks/Get';                    ///Importacion de la función para obtener los datos del producto
import { darDatos } from '../hooks/Post';              ///Importacion de la función para enviar los datos a la API
import { traerCookie } from '../hooks/Cookies';        ///Importacion de la función para obtener el ID del producto de las cookies
import ReactStars from 'react-stars';                  ///Importacion del componente de Stars


const Producto = () => {
    const id = traerCookie('IdInfoProducto');  // Obtiene el ID del producto de las cookies
    const [cantidad, setCantidad] = useState(1);  // Estado para la cantidad de productos seleccionada
    const [precioBase, setPrecioBase] = useState(0);  // Estado para el precio base del producto
    const [precioTotal, setPrecioTotal] = useState(precioBase);  // Estado para el precio total basado en la cantidad
    const [nombre, setNombre] = useState("");  // Estado para el nombre del producto
    const [descripcion, setDescripcion] = useState("");  // Estado para la descripción del producto
    const [imagen, setImagen] = useState("");  // Estado para la imagen del producto
    const [rating, setRating] = useState(0);  // Estado para el rating del producto
    const [comentarios, setComentarios] = useState([]);  // Estado para la lista de comentarios
    const [comentarioTexto, setComentarioTexto] = useState("");  // Estado para el texto de un nuevo comentario
    const [comentarioRating, setComentarioRating] = useState(0);  // Estado para el rating de un nuevo comentario
    const [respuestaComentario, setRespuestaComentario] = useState('');  // Estado para la respuesta de un comentario
    const [comentarioRespondiendo, setComentarioRespondiendo] = useState(null);  // Estado para el comentario que se está respondiendo
    const usuarioID = traerCookie('idUsuario');  // Obtiene el ID del usuario de las cookies
    const [listaRespuestas, setListaRespuestas] = useState([]);  // Estado para la lista de respuestas a comentarios
    const [mensajeError, setMensajeError] = useState('');  // Estado para mostrar errores en las respuestas

    const [respuestasVisibles, setRespuestasVisibles] = useState({});  // Estado para controlar la visibilidad de las respuestas

    const apiUrlAgregarComentario = "http://127.0.0.1:8000/api/v5/agregar/comentario/";  // URL para agregar comentarios
    const apiUrl = `http://127.0.0.1:8000/api/v3/producto/productos/${id}`;  // URL para obtener los detalles del producto

    // Función para obtener los datos del producto y los comentarios asociados
    const Obtener = async () => {
        try {
            const data = await Get(apiUrl);
            setNombre(data.nombre);
            setDescripcion(data.descripcion);
            setPrecioBase(data.precio);
            setImagen(data.imagen);

            const comentariosData = await Get(apiUrlAgregarComentario);
            const comentariosFiltrados = comentariosData.filter(comentario => comentario.producto_comentario === parseInt(id));
            //Comentarios filtrados sea igual al id del producto

            const respuestasData = await Get('http://127.0.0.1:8000/api/v5/agregar/respuesta/');
            const comentariosConRespuestas = comentariosFiltrados.map(comentario => ({
                ...comentario,
                respuestas: respuestasData.filter(respuesta => respuesta.respuesta_comentario === comentario.id)
            }));
            ///Filtro de respuestas para cada comentario que sea igual al id del comentario
            
            setListaRespuestas(comentariosConRespuestas);  // Guarda los comentarios con sus respuestas
        } catch (error) {
            console.error("Error al obtener los datos del producto o los comentarios:", error);
        }
    };

    useEffect(() => {
        Obtener();
    }, []);

    // Al cambiar la cantidad o el precio base, actualiza el precio total
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

    // Función para crear un nuevo comentario
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
            Obtener();  // Actualiza la lista de comentarios tras agregar uno nuevo
        }
    };

    // Función para enviar una respuesta a un comentario
    const enviarRespuesta = async (infoComentario) => {
        if (!respuestaComentario.trim()) {
            setMensajeError("La respuesta no puede estar vacía.");
            return;
        }
        const respuesta = {
            respuesta_comentario: infoComentario.id,
            usuario_respuesta_comentario: infoComentario.usuario_comentario,
            respuesta_texto: respuestaComentario,
            usuario_responde: usuarioID
        };
        await darDatos(respuesta, 'http://127.0.0.1:8000/api/v5/agregar/respuesta/');
        setRespuestaComentario('');
        setComentarioRespondiendo(null);
        setMensajeError('');
        Obtener();  // Actualiza la lista de respuestas tras agregar una nueva
    };

    // Alterna la visibilidad de las respuestas para un comentario dado
    const toggleRespuestas = (id) => {
        setRespuestasVisibles(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
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
                                {/* Mostrar la calificación del producto rating > 0 ? Mostrar el número de estrellas : Mostrar el texto "Califica este producto" */}
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
                            // Cambiar el número de estrellas
                            count={5}
                            // Cambiar el valor de la calificación
                            onChange={setComentarioRating}
                            ///Cambiar el tamaño de la estrella
                            size={30}
                            activeColor="#ffd700"
                            ///Cambiar el valor de la calificación
                            value={comentarioRating}
                        />
                        <button className="submit-comment" onClick={CrearComentario}>Publicar comentario</button>
                        {/* Botón para publicar un comentario */}
                    </div>

                    <div className="comments-list">
                        {listaRespuestas.map((comentario, index) => (
                            ///Renderizar cada comentario con el map
                            <div key={index} className="comment-item">
                                <img src="src/img/marzo.png" alt="Avatar" className="comment-avatar" />
                                <div className="comment-content">
                                    <div className="comment-header">
                                        <span className="comment-username">{comentario.usuario_email}</span>
                                        <span className="comment-date">{comentario.fecha_comentario}</span>
                                        <ReactStars className='comment-rating'
                                            count={comentario.cantidad_reacciones}
                                            size={24}
                                            color="#ffd700"
                                            activeColor="#ffd700"
                                            value={comentario.valoracion}
                                        />
                                    </div>
                                    <p className="comment-text">{comentario.texto_comentario}</p>
                                    <div className="comment-actions">
                                        <button>👍</button>
                                        <button>👎</button>
                                        <button onClick={() => setComentarioRespondiendo(comentario.id)}>Responder</button>
                                        <button onClick={() => toggleRespuestas(comentario.id)}>
                                            {respuestasVisibles[comentario.id] ? 'Ocultar respuestas' : 'Ver respuestas'}
                                        </button>
                                    </div>

                                    {comentarioRespondiendo === comentario.id && (
                                        <div className="reply-form">
                                            <textarea
                                                value={respuestaComentario}
                                                onChange={(e) => setRespuestaComentario(e.target.value)}
                                                placeholder="Escribe tu respuesta..."
                                                rows="2"
                                                className="comment-textarea"
                                            />
                                            <button onClick={() => setComentarioRespondiendo(null)} className="submit-reply">Cancelar</button>
                                            <button onClick={() => enviarRespuesta(comentario)} className="submit-reply">Responder</button>
                                            {mensajeError && <p className="error-message">{mensajeError}</p>}
                                        </div>
                                    )}

                                    {respuestasVisibles[comentario.id] && ( // Solo mostrar respuestas si son visibles
                                        <div className="replies-list" >
                                            {comentario.respuestas.map((respuesta, i) => (
                                                <div key={i} className="reply-item" style={{marginBottom: "40px"}}>
                                                    <span className="reply-user">{respuesta.usuario_email}</span>: {respuesta.respuesta_texto}
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
