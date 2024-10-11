import React from 'react'
import Navbar from '../components/Navbar'



const FILTROS_CATEGORIAS = ['Ropa', 'Piezas', 'Accesorios', 'Nutrición', 'Bicicletas'];

const Tutoriales = () => {
  return (
    <div>
        <Navbar />
      <div>
        <div>
            <h1>Tutoriales</h1>
        </div>
        <div>
        <div className="filtros">
        <div className="filtro-categoria">
          <label>Categoría:</label>
          <select>
            <option value="">Todas</option>
            {FILTROS_CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
      </div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/videoseries?list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItG" 
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/videoseries?list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItG" 
            title="YouTube video player"            
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Tutoriales
