<<<<<<< HEAD
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';
import './ReactCalendar.css'


export default function Sample() {
  const [value, onChange, setMsg] = useState(new Date());
  const date = DateTime.local()
  const result = date.setZone('America/Los_Angeles')

  console.log(date.toString())

  console.log(result.toString())

  return (
    <div className="Sample">
      <header>
        <h1 className="calendar-title"></h1>

      </header>
      <div className="Sample__container">
        <main className="Sample__container__content">
          <Calendar
            onChange={onChange}
            value={value}
          />
        </main>
      </div>
    </div>
  );
}
=======
>>>>>>> 9579eca9306bde2854b99511e9feb084cd65dcad
