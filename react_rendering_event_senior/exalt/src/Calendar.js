import React, { useEffect, useState } from 'react'

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import jsonEvent from './input.json'

const Calendar = () => {

    const [events, setEvents] = useState(null)
    const [testEvent,] = useState([
        {
            "title": "Event 1",
            "start": 1567674000000,
            "end": 1567706400000
        },
        {
            "title": "Event 2",
            "start": 1567900800000,
            "end": 1568073600000
        }
    ])

    useEffect(() => {

        const toMilliseconds = (hrs = 0, min = 0, sec = 0) => (hrs * 60 * 60 + min * 60 + sec) * 1000;

        jsonEvent.map((elem) => {
            const { duration, start } = elem;

            const hrs = start.split(':').splice(0, 1)
            const min = start.split(':').splice(1, 1)

            const startInMilliseconds = toMilliseconds(hrs, min, 0);
            const durationInMillisecond = toMilliseconds(0, duration, 0)

            const newObj = { end: startInMilliseconds + durationInMillisecond, start: startInMilliseconds, title: `event ${elem.id}`, id: elem.id };
            setEvents(events)
            console.log(newObj);
            return newObj;

        });

    }, [events])


    return (
        <div className="App">
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGrid"
                headerToolbar={{
                    start: 'title',
                    center: '',
                    end: ''
                }}
                slotMinTime="9:00:00"
                slotMaxTime="21:00:00"
                allDaySlot={false}
                slotEventOverlap={false}
                dayHeaders={false}
                events={{ testEvent }}
            />
        </div>
    )
}

export default Calendar