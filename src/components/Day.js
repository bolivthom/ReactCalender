import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

var styles = {
    dayDiv: {
        border: '0.5px solid',
        borderColor: '#E5E6EB',
    },
    eventTitle: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100px',
        fontSize: '12px',
        textAlign: 'left',
        cursor: 'pointer',
        width: '90%',
        color: '#6DA19E'
    },
    eventDescription: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '90%',
        fontSize: '12px',
        textAlign: 'left',
        cursor: 'pointer',
        color: '#5CC3B9',
    },
    dayText: {
        fontSize: '24px',
        color: '#3F485A',
        textAlign: 'left',
        marginLeft: '8px',
        cursor: 'pointer',
    },
    todayText: {
        fontSize: '24px',
        color: '#3658F5',
        textAlign: 'left',
        marginLeft: '8px',
        cursor: 'pointer',
    },
    eventDiv: {
        paddingLeft: '8px',
    },
    WeekDayTitle: {
        fontSize: '12px',
        color: '#3F485A',
        textAlign: 'left',
        marginLeft: '8px',
        marginBottom: '-15px'
    },
    otherMonth: {
        color: '#FA6565',
        fontSize: '24px',
        textAlign: 'left',
        marginLeft: '8px',
        cursor: 'pointer'
    }
}

export default function Day({ day, rowIndex }) {
    const { setDaySelected,
        setShowEventModal,
        filteredEvents,
        setSelectedEvent,
        monthIndex,
    } = useContext(GlobalContext)

    const isCurrentMonth = monthIndex !== day.month();

    const today = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");

    const [dayEvents, setDayEvents] = useState([]);

    useEffect(() => {
        const events = filteredEvents.filter(
            (evt) =>
                dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events);
    }, [filteredEvents, day]);

    let dayClass = styles.dayDiv;
    let text = styles.dayText;
    const events = JSON.parse(localStorage.getItem("savedEvents")) || [];
    const event_days = events.map((event) => event.day);
    const dayHasEvent = event_days.includes(day.valueOf());

    function dayHasEvenChecker(evt) {
        if (dayHasEvent) {
            if (evt.length() === 1) {
                setShowEventModal(false);
                
            } else {
                setSelectedEvent(evt)
                setShowEventModal(true);
            }
        } else {
            setShowEventModal(true);
        }
    }

    if (isCurrentMonth)
        text = { ...styles.text, ...styles.otherMonth };

    if (dayHasEvent)
        dayClass = { ...styles.dayDiv, backgroundColor: '#D2F7EB' };

    if (today) {
        text = { ...styles.todayText};
    }

    return (
        <div style={dayClass}
            onClick={() => {
                setDaySelected(day);
                dayHasEvenChecker()
            }}>
            <header style={styles.header}>
                <div >
                    {rowIndex === 0 && (
                        <h1 style={styles.WeekDayTitle}>{day.format('ddd').toUpperCase()}</h1>
                    )}
                    <h1 style={text}>
                        {day.format('DD')}
                    </h1>
                </div>
            </header>
            <div style={styles.eventDiv} onClick={() => setShowEventModal(true) }>
                {dayEvents.map((evt, idx) => (
                    <div
                        style={styles.eventTitle}
                        key={idx}
                        onClick={() => setSelectedEvent(evt)}>
                        {evt.title}
                    </div>
                ))}
                {dayEvents.map((evt, idx) => (
                    <div
                        style={styles.eventDescription}
                        key={idx}
                        onClick={() => setSelectedEvent(evt)}>
                        {evt.description}
                    </div>
                ))}
            </div>
        </div>
    )
}

