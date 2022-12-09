import React, { useEffect, useState } from 'react'

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import jsonEvent from './input.json'

const Calendar = () => {

    const [events, setEvents] = useState(null)

    useEffect(() => {

        const toMilliseconds = (hrs = 0, min = 0, sec = 0) => (hrs * 60 * 60 + min * 60 + sec) * 1000;

        jsonEvent.map((elem) => {
            const { duration, start } = elem;

            const hrs = start.split(':').splice(0, 1)
            const min = start.split(':').splice(1, 1)

            const startInMilliseconds = toMilliseconds(hrs, min);
            const durationInMillisecond = toMilliseconds(duration)

            const newObj = { end: durationInMillisecond, start: startInMilliseconds, id: elem.id };
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
                events={events}
            />
        </div>
    )
}

export default Calendar