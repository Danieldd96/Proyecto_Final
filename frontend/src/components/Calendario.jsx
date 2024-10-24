import React from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import es from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/Calendario.css';

const locales = {
  'es': es,
};

const Ajustes = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendario = ({ eventos }) => {
  return (
    <div className="dark-mode-calendar">
      <header className="calendar-header">
        <h1>Calendario</h1>
      </header>
      <Calendar
        localizer={Ajustes}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 850 }}
        views={['month', 'week', 'day']}
        defaultView={Views.MONTH}
        messages={{
          today: "Hoy",
          previous: "Anterior",
          next: "Siguiente",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
      />
    </div>
  );
};

export default Calendario;
