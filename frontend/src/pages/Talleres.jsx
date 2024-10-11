import React from 'react'
// import '../styles/Talleres.css'
import Navbar from '../components/Navbar'
import Carrusel from '../components/carrusel';

const Talleres = () => {
    const FILTROS_CATEGORIAS = ['Montaña', 'Ruta', 'BMX', 'Bicicleta Eléctrica'];

  return (
    <div>
        <Navbar />
      <div>
        <div>
            <div>
                <Carrusel />
            </div>
        <h1>Talleres</h1>
        <div className="filtrosTalleres">
          <label htmlFor="categorias" className="label-categoria-talleres">Categoría:</label>
          <select id="categorias" className="select-categoria-talleres">
            <option value="">Todas</option>
            {FILTROS_CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
            <div>

            </div>
        </div>
      </div>
    </div>
  )
}

export default Talleres
