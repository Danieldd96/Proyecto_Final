import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar'
import '../styles/Tutoriales.css'

const FILTROS_CATEGORIAS = ['Montaña', 'Ruta', 'BMX', 'Bicicleta Eléctrica'];
const Linksvideos = [
  "https://www.youtube.com/embed/JED5llnlVVI",
  "https://www.youtube.com/embed/JED5llnlVVI",
  "https://www.youtube.com/embed/JED5llnlVVI",
]

const Tutoriales = () => {
  const [consulta, setConsulta] = useState('');
  const [placeholder, setPlaceholder] = useState(0);
  
  const placeholders = [
    "Buscar por tipo de bicicleta",
    "Buscar por titulo",
    "Buscar por problema"
  ];

  const inputEnter = (event) => {
    if (event.key === 'Enter') {
      buscador();
    }
  };

  const buscador = () => {
    if (consulta.trim()) {
      console.log(`Buscando: ${consulta}`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="tutoriales-content">
        <h1 className="title">Tutoriales</h1>
        <div className='containerheader'>
        <div className="filtrosTutoriales">
          <label htmlFor="categorias" className="label-categoria">Categoría:</label>
          <select id="categorias" className="select-categoria">
            <option value="">Todas</option>
            {FILTROS_CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="search-container-videos">
          <input
            type="text"
            className="search-input-videos"
            value={consulta}
            placeholder={placeholders[placeholder]}
            onChange={(e) => setConsulta(e.target.value)}
            onKeyDown={inputEnter}
            aria-label="Campo de búsqueda de tutoriales"
          />
          <button className="search-button-videos" onClick={buscador} aria-label="Buscar">
            <i className='bx bx-search search-icon'></i>
          </button>
        </div>


        </div>
        <div className="videos-section">
        <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/JED5llnlVVI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/JED5llnlVVI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/JED5llnlVVI"
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
