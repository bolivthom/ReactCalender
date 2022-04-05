import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

var styles = {
    div: {
        width: '500px',
        position: 'fixed',
        backgroundColor: '#F5F6FA',
        border: '1px solid',
        borderColor: '#EEF0F5',
        zIndex: '2',
    },
    text: {
        fontSize: '12px',
        color: '#97989D',
        marginBottom: '30px',
    },
    title: {
        fontSize: '14px',
        color: '#3658F5',
        marginLeft: '30px'
    },
    subTitle: {
        fontSize: '12px',
        color: '#97989D',
        textAlign: 'left',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    submitButton: {
        border: 'none',
        width: '100px',
        height: '45px',
        backgroundColor: '#4D70ED',
        marginBottom: '20px'
    },
    buttonTitle: {
        fontSize: '12px',
        color: 'white',
        textAlign: 'center',
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10px',
        marginLeft: '30px',
        marginRight: '40px',
    },
    inputField: {
        width: '100%',
        borderBottom: '1px solid',
        marginBottom: '10px',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        outline: 'none',
        borderColor: '#E5E6EB',
        backgroundColor: '#F5F6FA'
    },
    close: {
        border: 'none',
        outline: 'none',
        backgroundColor: '#F5F6FA',
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    error: {
        color: '#FA6565',
        fontSize: '12px',
        marginTop: '-5px',
        textAlign: 'left'
    }
}

export default function EventModal() {
    const [title, setTitle] = useState('')
    //const [dayEvents, setDayEvents] = useState([]);
    const [error, setError] = useState('');
    const [description, setDescription] = useState('');
    const { setShowEventModal, daySelected,
        dispatchCalEvent, selectedEvent } = useContext(GlobalContext)

    useEffect(() => {
        if (selectedEvent) {
            setTitle(selectedEvent.title);
            setDescription(selectedEvent.description);
        };
    }, [daySelected]);

    function handleSubmit(e) {
        if (title === "") {
            setError('Oops! Your event is missing a Title')
            e.preventDefault();
        } else {
            e.preventDefault();
            const calendarEvent = {
                title,
                description,
                day: daySelected.valueOf(),
                id: selectedEvent ? selectedEvent.id : Date.now(),
            };
            if (selectedEvent) {
                dispatchCalEvent({ type: "update", payload: calendarEvent });
            } else {
                dispatchCalEvent({ type: "push", payload: calendarEvent });
            }
            setShowEventModal(false);
        }
    }

    return (
        <div style={styles.div}>
            <form>
                <header style={styles.header}>
                    <h1 style={styles.title}>Add Event</h1>
                    <button style={styles.close} onClick={() => setShowEventModal(false)}>
                        <span className="material-icons-outlined">
                            close
                        </span>
                    </button>
                </header>
                <div style={styles.inputs}>
                    <h1 style={styles.subTitle}>Event Title</h1>
                    <input
                        style={styles.inputField}
                        type="text"
                        name="title"
                        //placeholder="Add Title"
                        //required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    <p style={styles.error}>{error}</p>
                    <h1 style={styles.subTitle}>Description</h1>
                    <input
                        style={styles.inputField}
                        type="text"
                        name="description"
                        //placeholder="Add a description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    <div style={styles.info}>
                        <p style={styles.text}>Schedule: {daySelected.format("dddd, MMMM DD")}</p>
                    </div>
                </div>
                <button type="submit" onClick={handleSubmit} style={styles.submitButton}>
                    <h1 style={styles.buttonTitle}>SAVE</h1>
                </button>
            </form>
        </div>
    )
}

