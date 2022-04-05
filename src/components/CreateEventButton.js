import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

var styles = {
    button: {
        border: 'none',
        width: '100px',
        height: '50px',
        backgroundColor: '#7E8CC0'
    },
    title: {
        fontSize: '12px',
        color: 'white',
        textAlign: 'center',
        marginLeft: '8px',
    },
}

function handleSubmit(e) {
    e.preventDefault();
}

export default function CreateEventButton({handleSubmit}) {
const {setShowEventModal} = useContext(GlobalContext)
    return (
        <button type="submit" onClick={() => setShowEventModal(false)} style={styles.button}>
            <h1 style={styles.title}>Save</h1>
        </button>
    )
}

