import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import '../styles/Preguntas.css'
import Navbar from '../components/Navbar'
import ScrollButton from '../components/ScrollButton';

const Data = [
  {
    Pregunta: '¿Cómo elegir la bicicleta adecuada?',
    Respuesta: 'Debes considerar el tipo de ciclismo que harás. Si es para la ciudad, una bicicleta urbana es ideal. Si es para montañas, opta por una bicicleta de montaña.',
  },
  {
    Pregunta: '¿Cuánto debería invertir en una bicicleta?',
    Respuesta: 'Depende de tu nivel de uso y tipo de bicicleta. Las bicicletas básicas pueden costar desde 200 dólares, mientras que las de alta gama pueden superar los 2,000 dólares.',
  },
  {
    Pregunta: '¿Qué es una bicicleta eléctrica?',
    Respuesta: 'Es una bicicleta que tiene un motor eléctrico integrado para ayudar al ciclista a avanzar con menos esfuerzo.',
  },
  {
    Pregunta: '¿Cuáles son los mejores accesorios para bicicletas?',
    Respuesta: 'Algunos de los accesorios más útiles incluyen luces, cascos, porta botellas y candados para bicicletas.',
  },
];

const Preguntas = () => {
  return (
    <div>
        <Navbar />
    <div className="header">
      <h1 style={{color: 'white', textAlign: 'center'}}>Preguntas Frecuentes</h1>
      <Accordion.Root type="single"  collapsible style={{border: '3px solid #444',padding: '15px 100px',fontSize: '16px',color: 'white',transition: 'max-height 0.3s ease-in-out'}}>
        {Data.map((faq, index) => (
          <Accordion.Item key={index} value={`faq-${index}`} className="accordion-item">
            <Accordion.Header>
              <Accordion.Trigger className="accordion-trigger" 
              style={{
                backgroundColor:"transparent", 
                width: '100%', 
                textAlign: 'center',
                padding: '10px 0',
                fontSize: '20px',
                border:'none'
                }}>
                {faq.Pregunta}
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content style={{
                padding: '15px 20px',
                fontSize: '20px',
                color: '#ddd',
                transition: 'max-height 0.3s ease-in-out',
             }} 
            >
              {faq.Respuesta}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
    <ScrollButton />
    </div>
  );
};

export default Preguntas;
